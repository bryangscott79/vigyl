import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ── Types ───────────────────────────────────────────────────────────────────
interface Company {
  id: string;
  name: string;
  slug: string;
  industry_slug: string;
  industry_name: string;
  sector: string;
  website_url: string;
  description: string;
  headquarters_city: string;
  headquarters_state: string;
  headquarters_country: string;
  revenue_tier: string;
  annual_revenue_estimate: string;
  employee_count_estimate: number;
  market_position: string;
  competitive_advantage: string;
  scope: string;
  ai_readiness_score: number;
  tags: string[];
}

interface Signal {
  id: string;
  title: string;
  summary: string;
  source_url: string;
  source_name: string;
  published_at: string;
  signal_type: string;
  sentiment: string;
  severity: number;
  sales_implication: string;
  related_industries: string[];
  related_company_names: string[];
}

interface ScoredCompany {
  company: Company;
  compositeScore: number;
  matchedSignals: Signal[];
  breakdown: {
    industry: number;
    revenue: number;
    geo: number;
    services: number;
    signalRecency: number;
  };
}

// ── Neighboring States Map ──────────────────────────────────────────────────
const NEIGHBORING_STATES: Record<string, string[]> = {
  GA: ["FL", "AL", "TN", "NC", "SC"],
  FL: ["GA", "AL"],
  AL: ["GA", "FL", "TN", "MS"],
  TN: ["GA", "AL", "NC", "VA", "KY", "MO", "AR", "MS"],
  NC: ["GA", "TN", "VA", "SC"],
  SC: ["GA", "NC"],
  TX: ["LA", "AR", "OK", "NM"],
  CA: ["OR", "NV", "AZ"],
  NY: ["NJ", "CT", "PA", "MA", "VT"],
  PA: ["NY", "NJ", "DE", "MD", "OH", "WV"],
  IL: ["IN", "WI", "IA", "MO", "KY"],
  OH: ["PA", "WV", "KY", "IN", "MI"],
  MA: ["NH", "RI", "CT", "NY", "VT"],
  NJ: ["NY", "PA", "DE"],
  VA: ["NC", "TN", "KY", "WV", "MD", "DC"],
  WA: ["OR", "ID"],
  CO: ["UT", "WY", "NE", "KS", "OK", "NM", "AZ"],
  MI: ["OH", "IN", "WI"],
  AZ: ["CA", "NV", "UT", "CO", "NM"],
  MN: ["WI", "IA", "SD", "ND"],
};

// ── Revenue Tier Ranges ─────────────────────────────────────────────────────
const REVENUE_TIERS: Record<string, { min: number; max: number; order: number }> = {
  growth: { min: 5_000_000, max: 50_000_000, order: 0 },
  mid_market: { min: 50_000_000, max: 500_000_000, order: 1 },
  upper_mid: { min: 500_000_000, max: 5_000_000_000, order: 2 },
  enterprise: { min: 5_000_000_000, max: Infinity, order: 3 },
};

// ── Helpers ─────────────────────────────────────────────────────────────────
function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function parseRevenue(rev: string | null | undefined): number | null {
  if (!rev) return null;
  const cleaned = rev.replace(/[$,\s]/g, "").toLowerCase();
  const match = cleaned.match(/([\d.]+)(k|m|b|t)?/);
  if (!match) return null;
  const num = parseFloat(match[1]);
  const multiplier = { k: 1_000, m: 1_000_000, b: 1_000_000_000, t: 1_000_000_000_000 }[match[2] || ""] || 1;
  return num * multiplier;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateScoreHistory(slug: string, healthScore: number): { date: string; score: number }[] {
  const history: { date: string; score: number }[] = [];
  let seed = 0;
  for (const c of slug) seed += c.charCodeAt(0);
  const baseScore = healthScore - 10 + seededRandom(seed) * 20;
  for (let i = 90; i >= 0; i -= 3) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const noise = (seededRandom(seed + i) - 0.5) * 8;
    const trend = ((90 - i) / 90) * (healthScore - baseScore);
    history.push({
      date: d.toISOString().split("T")[0],
      score: Math.max(10, Math.min(98, Math.round(baseScore + trend + noise))),
    });
  }
  return history;
}

// ── Scoring Algorithm ───────────────────────────────────────────────────────
function scoreCompany(
  company: Company,
  profile: any,
  signals: Signal[],
  feedback: any[]
): ScoredCompany {
  const weights = { industry: 30, revenue: 20, geo: 20, services: 15, signalRecency: 15 };
  let industryScore = 0;
  let revenueScore = 0;
  let geoScore = 0;
  let servicesScore = 0;
  let signalRecencyScore = 0;

  // ── Industry Match (0-30) ─────────────────────────────────────────────
  const targetIndustries = (profile.target_industries || []).map((t: string) => t.toLowerCase());
  const targetSlugs = targetIndustries.map(slugify);
  const caseStudySlugs = (profile.case_study_industries || []).map((t: string) => slugify(t.toLowerCase()));
  const companySlug = company.industry_slug.toLowerCase();
  const companyName = company.industry_name.toLowerCase();

  if (targetSlugs.includes(companySlug) || targetIndustries.includes(companyName)) {
    industryScore = weights.industry; // 30
  } else if (caseStudySlugs.includes(companySlug)) {
    industryScore = weights.industry * 0.83; // 25
  } else {
    // Check sector-level match
    const companySector = (company.sector || "").toLowerCase();
    const sectorMatch = targetIndustries.some(
      (t: string) => companySector.includes(t.split(" ")[0]) || t.includes(companySector.split(" ")[0])
    );
    industryScore = sectorMatch ? weights.industry * 0.5 : weights.industry * 0.17; // 15 or 5
  }

  // ── Revenue Match (0-20) ──────────────────────────────────────────────
  const userRevMin = parseRevenue(profile.ideal_client_revenue_min);
  const userRevMax = parseRevenue(profile.ideal_client_revenue_max);
  const companyTier = REVENUE_TIERS[company.revenue_tier];

  if (!userRevMin && !userRevMax) {
    revenueScore = weights.revenue * 0.75; // 15 — neutral when no preference
  } else if (companyTier) {
    // Check if company tier overlaps user's ideal range
    const idealMin = userRevMin || 0;
    const idealMax = userRevMax || Infinity;
    if (companyTier.min <= idealMax && companyTier.max >= idealMin) {
      revenueScore = weights.revenue; // 20 — in range
    } else {
      // Check tier distance
      const userMinTier = Object.entries(REVENUE_TIERS).find(
        ([, v]) => idealMin >= v.min && idealMin <= v.max
      );
      const userMaxTier = Object.entries(REVENUE_TIERS).find(
        ([, v]) => idealMax >= v.min && idealMax <= v.max
      );
      const userMinOrder = userMinTier ? REVENUE_TIERS[userMinTier[0]].order : 0;
      const userMaxOrder = userMaxTier ? REVENUE_TIERS[userMaxTier[0]].order : 3;
      const distance = Math.min(
        Math.abs(companyTier.order - userMinOrder),
        Math.abs(companyTier.order - userMaxOrder)
      );
      revenueScore = distance === 1 ? weights.revenue * 0.6 : weights.revenue * 0.25; // 12 or 5
    }
  } else {
    revenueScore = weights.revenue * 0.25; // 5 — unknown tier
  }

  // ── Geographic Match (0-20) ───────────────────────────────────────────
  const userCity = (profile.location_city || "").toLowerCase().trim();
  const userState = (profile.location_state || "").toUpperCase().trim();
  const userCountry = (profile.location_country || "US").toUpperCase().trim();
  const companyCity = (company.headquarters_city || "").toLowerCase().trim();
  const companyState = (company.headquarters_state || "").toUpperCase().trim();
  const companyCountry = (company.headquarters_country || "US").toUpperCase().trim();
  const geoFocus = (profile.geographic_focus || []).map((g: string) => g.toLowerCase());

  if (userCity && companyCity && userCity === companyCity && userState === companyState) {
    geoScore = weights.geo; // 20 — same city
  } else if (userState && companyState && userState === companyState) {
    geoScore = weights.geo * 0.8; // 16 — same state
  } else if (
    userState &&
    companyState &&
    NEIGHBORING_STATES[userState]?.includes(companyState)
  ) {
    geoScore = weights.geo * 0.6; // 12 — neighboring state
  } else if (companyCountry === userCountry) {
    geoScore = weights.geo * 0.4; // 8 — same country, different region
  } else if (
    geoFocus.length > 0 &&
    geoFocus.some(
      (g: string) =>
        companyCountry.toLowerCase().includes(g) ||
        g.includes(companyCountry.toLowerCase()) ||
        (company.headquarters_city || "").toLowerCase().includes(g)
    )
  ) {
    geoScore = weights.geo * 0.5; // 10 — in user's geo focus
  } else {
    geoScore = weights.geo * 0.2; // 4 — international, no match
  }

  // ── Services Alignment (0-15) ─────────────────────────────────────────
  const userServices = (profile.services || []).map((s: string) => s.toLowerCase());
  const userTags = (profile.tags || []).map((t: string) => t.toLowerCase());
  const userDescriptors = (profile.company_descriptors || []).map((d: string) => d.toLowerCase());
  const userValues = (profile.value_propositions || []).map((v: string) => v.toLowerCase());
  const allUserKeywords = [...userServices, ...userTags, ...userDescriptors, ...userValues];

  const companyTags = (company.tags || []).map((t: string) => t.toLowerCase());
  const companyDesc = (company.description || "").toLowerCase();

  let serviceMatches = 0;
  for (const keyword of allUserKeywords) {
    if (keyword.length < 3) continue;
    const words = keyword.split(/\s+/);
    for (const word of words) {
      if (word.length < 3) continue;
      if (companyTags.some((t) => t.includes(word) || word.includes(t))) {
        serviceMatches += 3;
        break;
      }
      if (companyDesc.includes(word)) {
        serviceMatches += 2;
        break;
      }
    }
  }
  servicesScore = Math.min(weights.services, serviceMatches); // cap at 15

  // ── Signal Recency (0-15) ─────────────────────────────────────────────
  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  const matchedSignals: Signal[] = [];

  const companyNameLower = company.name.toLowerCase();
  for (const signal of signals) {
    const nameMatch = (signal.related_company_names || []).some(
      (n) => n.toLowerCase().includes(companyNameLower) || companyNameLower.includes(n.toLowerCase())
    );
    const industryMatch = (signal.related_industries || []).some(
      (ind) => ind === company.industry_slug || slugify(ind) === company.industry_slug
    );
    if (nameMatch || industryMatch) {
      matchedSignals.push(signal);
    }
  }

  let recentPoints = 0;
  let olderPoints = 0;
  for (const sig of matchedSignals) {
    const age = now - new Date(sig.published_at).getTime();
    if (age < sevenDays) {
      recentPoints += 3;
    } else if (age < thirtyDays) {
      olderPoints += 2;
    }
  }
  signalRecencyScore = Math.min(9, recentPoints) + Math.min(6, olderPoints);

  // ── Feedback Adjustment ───────────────────────────────────────────────
  let feedbackBonus = 0;
  for (const fb of feedback) {
    const fbIndustry = (fb.prospect_industry || "").toLowerCase();
    const fbCompany = (fb.prospect_company_name || "").toLowerCase();
    if (fb.feedback_type === "more") {
      if (fbCompany === companyNameLower) feedbackBonus += 8;
      else if (fbIndustry === company.industry_name.toLowerCase()) feedbackBonus += 5;
    } else if (fb.feedback_type === "less") {
      if (fbCompany === companyNameLower) feedbackBonus -= 15;
      else if (fbIndustry === company.industry_name.toLowerCase()) feedbackBonus -= 10;
    }
  }

  const rawScore =
    industryScore + revenueScore + geoScore + servicesScore + signalRecencyScore + feedbackBonus;
  const compositeScore = Math.max(5, Math.min(100, Math.round(rawScore)));

  return {
    company,
    compositeScore,
    matchedSignals,
    breakdown: {
      industry: Math.round(industryScore),
      revenue: Math.round(revenueScore),
      geo: Math.round(geoScore),
      services: Math.round(servicesScore),
      signalRecency: Math.round(signalRecencyScore),
    },
  };
}

// ── Select Top Companies with Scope Distribution ────────────────────────────
function selectTopCompanies(scored: ScoredCompany[], targetCount = 50): ScoredCompany[] {
  const sorted = scored.sort((a, b) => b.compositeScore - a.compositeScore);

  const local = sorted.filter((s) => s.company.scope === "local");
  const national = sorted.filter((s) => s.company.scope === "national");
  const international = sorted.filter((s) => s.company.scope === "international");

  // Target: ~35% local, ~40% national, ~25% international
  const localTarget = Math.floor(targetCount * 0.35);
  const nationalTarget = Math.floor(targetCount * 0.40);
  const internationalTarget = Math.floor(targetCount * 0.25);

  const selected = new Set<string>();
  const result: ScoredCompany[] = [];

  const addFromPool = (pool: ScoredCompany[], count: number) => {
    for (const sc of pool) {
      if (result.length >= targetCount) break;
      if (selected.has(sc.company.id)) continue;
      if (result.filter((r) => r.company.scope === sc.company.scope).length >= count) break;
      selected.add(sc.company.id);
      result.push(sc);
    }
  };

  addFromPool(local, localTarget);
  addFromPool(national, nationalTarget);
  addFromPool(international, internationalTarget);

  // Fill remaining slots from highest scores regardless of scope
  for (const sc of sorted) {
    if (result.length >= targetCount) break;
    if (!selected.has(sc.company.id)) {
      selected.add(sc.company.id);
      result.push(sc);
    }
  }

  return result;
}

// ── Build Industries from Selected Companies ────────────────────────────────
function buildIndustries(
  selected: ScoredCompany[],
  signals: Signal[]
): any[] {
  const industryMap = new Map<string, { name: string; slug: string; companies: number; signalSentiment: number[] }>();

  for (const sc of selected) {
    const slug = sc.company.industry_slug;
    if (!industryMap.has(slug)) {
      industryMap.set(slug, {
        name: sc.company.industry_name,
        slug,
        companies: 0,
        signalSentiment: [],
      });
    }
    const entry = industryMap.get(slug)!;
    entry.companies++;
    for (const sig of sc.matchedSignals) {
      entry.signalSentiment.push(
        sig.sentiment === "positive" ? 1 : sig.sentiment === "negative" ? -1 : 0
      );
    }
  }

  return Array.from(industryMap.values()).map((ind) => {
    const avgSentiment =
      ind.signalSentiment.length > 0
        ? ind.signalSentiment.reduce((a, b) => a + b, 0) / ind.signalSentiment.length
        : 0;
    const healthScore = Math.max(25, Math.min(95, Math.round(60 + avgSentiment * 20 + ind.companies * 3)));
    const trendDirection =
      avgSentiment > 0.2 ? "improving" : avgSentiment < -0.2 ? "declining" : "stable";

    return {
      id: ind.slug,
      name: ind.name,
      slug: ind.slug,
      healthScore,
      trendDirection,
      topSignals: [],
      scoreHistory: generateScoreHistory(ind.slug, healthScore),
    };
  });
}

// ── Build Signals Array ─────────────────────────────────────────────────────
function buildSignals(selected: ScoredCompany[]): any[] {
  const seenIds = new Set<string>();
  const output: any[] = [];

  for (const sc of selected) {
    for (const sig of sc.matchedSignals) {
      if (seenIds.has(sig.id)) continue;
      seenIds.add(sig.id);

      output.push({
        id: sig.id,
        title: sig.title,
        summary: sig.summary || sig.title,
        industryTags: sig.related_industries || [],
        signalType: sig.signal_type || "economic",
        sentiment: sig.sentiment || "neutral",
        severity: sig.severity || 3,
        salesImplication: sig.sales_implication || "",
        sourceUrl: sig.source_url || "",
        publishedAt: sig.published_at || new Date().toISOString(),
        sources: [
          {
            name: sig.source_name || "News",
            url: sig.source_url || "",
            publishedAt: sig.published_at || new Date().toISOString(),
          },
        ],
        impactedEntities: sig.related_company_names?.slice(0, 3).map((name: string) => ({
          name,
          type: "company",
          impact: sig.sentiment === "positive" ? "positive" : "negative",
          action: "monitor",
          reason: sig.sales_implication || "",
        })) || [],
      });
    }
  }

  return output.slice(0, 50);
}

// ── LLM Narrative Synthesis ─────────────────────────────────────────────────
async function generateNarratives(
  companies: ScoredCompany[],
  signals: Signal[],
  profile: any,
  apiKey: string
): Promise<Map<string, any>> {
  const narratives = new Map<string, any>();
  const BATCH_SIZE = 12;
  const today = new Date().toISOString().split("T")[0];

  const userServices = profile.services || [];
  const userServicesStr = userServices.length > 0 ? userServices.join(", ") : "consulting and technology services";

  for (let i = 0; i < companies.length; i += BATCH_SIZE) {
    const batch = companies.slice(i, i + BATCH_SIZE);

    const companiesJSON = batch
      .map((sc) => {
        const recentSignals = sc.matchedSignals
          .slice(0, 3)
          .map((s) => `"${s.title}" (${s.source_name}, ${s.sentiment})`)
          .join("; ");
        return `{
  "id": "${sc.company.id}",
  "name": "${sc.company.name}",
  "industry": "${sc.company.industry_name}",
  "revenue": "${sc.company.annual_revenue_estimate || "Unknown"}",
  "employees": ${sc.company.employee_count_estimate || 0},
  "location": "${sc.company.headquarters_city || ""}, ${sc.company.headquarters_state || ""} ${sc.company.headquarters_country || ""}",
  "marketPosition": "${sc.company.market_position || "Unknown"}",
  "competitiveAdvantage": "${sc.company.competitive_advantage || ""}",
  "aiReadinessScore": ${sc.company.ai_readiness_score || 40},
  "vigylScore": ${sc.compositeScore},
  "recentSignals": "${recentSignals || "No recent signals"}"
}`;
      })
      .join(",\n");

    const prompt = `You are an elite B2B sales intelligence analyst. You are given REAL company data and REAL market signals. Generate NARRATIVE FIELDS ONLY for each company. Do NOT invent factual data — company names, revenue, locations, and employee counts are already provided as ground truth.

Today is ${today}.

USER PROFILE:
Company: ${profile.company_name || "Unknown"}
Services: ${userServicesStr}
Location: ${profile.location_city || ""}, ${profile.location_state || ""}
Value Propositions: ${(profile.value_propositions || []).join(" | ") || "N/A"}
Known Competitors: ${(profile.known_competitors || []).join(", ") || "N/A"}
Differentiators: ${profile.differentiators || "N/A"}

REAL COMPANIES TO PROCESS:
[${companiesJSON}]

For each company (identified by "id"), generate EXACTLY these fields as a JSON array:
1. "id" — the company id (pass through)
2. "pressureResponse" — one of: "contracting", "strategic_investment", "growth_mode"
3. "whyNow" — 1-2 compelling sentences on why the user should reach out RIGHT NOW
4. "recommendedServices" — array of 2-3 objects { "service": string, "rationale": string } using ONLY these services: ${userServicesStr}
5. "companySignals" — array of 3-4 objects { "id": uuid-like-string, "type": one of opportunity/risk/trend/milestone/competitive/regulatory, "title": string, "summary": string, "sentiment": positive/negative/neutral, "severity": 1-5, "actionRequired": string, "source": string, "sourceUrl": string, "publishedDate": ISO date near today, "relevanceToUser": string }
6. "outreachPlaybook" — { "primaryAngle": string, "talkingPoints": [3-5 strings], "objections": [{"objection": string, "rebuttal": string}], "competitorWeaknesses": [2-3 strings], "idealTiming": string }
7. "clientIntelligence" — { "industryOutlook": string, "keyTrends": [3-5 strings], "regulatoryWatch": [2-3 strings], "aiTransformationMap": string, "recommendedActions": [3-5 strings] }
8. "aiReadiness" — { "score": 0-100, "currentAiUsage": [2-3 strings], "aiOpportunities": [2-3 strings], "aiThreats": [1-2 strings], "humanEdge": [2-3 strings] }

Return ONLY a valid JSON array of objects. No markdown, no explanation.`;

    try {
      const resp = await fetch("https://api.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-5-mini",
          messages: [
            {
              role: "system",
              content:
                "You are a B2B sales intelligence analyst. Return only valid JSON arrays. No markdown fences, no explanations. Each element must have the exact fields requested.",
            },
            { role: "user", content: prompt },
          ],
          max_completion_tokens: 16384,
          temperature: 0.7,
        }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        console.warn(`LLM returned ${resp.status} for batch ${i / BATCH_SIZE + 1}:`, errText);
        continue;
      }

      const data = await resp.json();
      let content = data.choices?.[0]?.message?.content || "";
      content = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

      try {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          for (const item of parsed) {
            if (item.id) {
              narratives.set(item.id, item);
            }
          }
        }
      } catch (parseErr) {
        console.warn(`Failed to parse LLM response for batch ${i / BATCH_SIZE + 1}:`, parseErr);
        // Try to extract from tool_calls if present
        try {
          const toolArgs = data.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
          if (toolArgs) {
            const toolParsed = JSON.parse(toolArgs);
            if (Array.isArray(toolParsed)) {
              for (const item of toolParsed) {
                if (item.id) narratives.set(item.id, item);
              }
            }
          }
        } catch (_) {
          // ignore
        }
      }
    } catch (err) {
      console.warn(`LLM call failed for batch ${i / BATCH_SIZE + 1}:`, err);
    }

    // Delay between batches
    if (i + BATCH_SIZE < companies.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  return narratives;
}

// ── Assemble Final Prospects ────────────────────────────────────────────────
function assembleProspects(
  selected: ScoredCompany[],
  narratives: Map<string, any>,
  contacts: Map<string, any[]>,
  profile: any
): any[] {
  const userServices = profile.services || [];

  return selected.map((sc) => {
    const narrative = narratives.get(sc.company.id) || {};
    const companyContacts = contacts.get(sc.company.id) || [];

    // Build decision makers from contacts or LLM-generated placeholder
    const decisionMakers = companyContacts.length > 0
      ? companyContacts.map((c: any) => ({
          name: c.name,
          title: c.title || "Executive",
          linkedinUrl: `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(c.name + " " + sc.company.name)}`,
          verified: c.verified || false,
          source: c.source || "company_directory",
          relevance: c.relevance || "Key decision maker",
        }))
      : [
          {
            name: "Leadership Team",
            title: "Executive",
            linkedinUrl: `https://www.linkedin.com/company/${sc.company.slug}/people/`,
            verified: false,
            source: "directory_search",
            relevance: "Contact enrichment recommended",
          },
        ];

    // Default narrative fields if LLM didn't generate them
    const defaultServices = userServices.slice(0, 2).map((s: string) => ({
      service: s,
      rationale: `${sc.company.name} is in ${sc.company.industry_name}, which benefits from ${s}`,
    }));

    return {
      id: sc.company.id,
      companyName: sc.company.name,
      industryId: sc.company.industry_slug,
      vigylScore: sc.compositeScore,
      pressureResponse: narrative.pressureResponse || "strategic_investment",
      whyNow: narrative.whyNow || `${sc.company.name} is a ${sc.company.market_position || "key player"} in ${sc.company.industry_name} with ${sc.company.annual_revenue_estimate || "significant"} revenue and signals indicating openness to new partnerships.`,
      decisionMakers,
      relatedSignals: sc.matchedSignals.map((s) => s.id),
      recommendedServices: narrative.recommendedServices || defaultServices,
      pipelineStage: "researching",
      lastContacted: null,
      notes: "",
      location: {
        city: sc.company.headquarters_city || "",
        state: sc.company.headquarters_state || "",
        country: sc.company.headquarters_country || "US",
      },
      annualRevenue: sc.company.annual_revenue_estimate || "Unknown",
      employeeCount: sc.company.employee_count_estimate || 0,
      scope: sc.company.scope || "national",
      websiteUrl: sc.company.website_url || "",
      relatedLinks: sc.company.website_url
        ? [{ title: "Company Website", url: sc.company.website_url }]
        : [],
      competitors: [],
      companyOverview: sc.company.description || `${sc.company.name} is a ${sc.company.market_position || "player"} in the ${sc.company.industry_name} sector.`,
      marketPosition: sc.company.market_position || "Emerging Player",
      competitiveAdvantage: sc.company.competitive_advantage || "",
      aiReadiness: narrative.aiReadiness || {
        score: sc.company.ai_readiness_score || 40,
        currentAiUsage: ["Basic automation"],
        aiOpportunities: ["Process automation", "Data analytics"],
        aiThreats: ["Competitor AI adoption"],
        humanEdge: ["Domain expertise", "Client relationships"],
      },
      companySignals: narrative.companySignals || sc.matchedSignals.slice(0, 4).map((sig) => ({
        id: sig.id,
        type: sig.signal_type === "tech" ? "trend" : sig.signal_type === "hiring" ? "milestone" : "opportunity",
        title: sig.title,
        summary: sig.summary || sig.title,
        sentiment: sig.sentiment || "neutral",
        severity: sig.severity || 3,
        actionRequired: sig.sales_implication || "Monitor and evaluate outreach timing",
        source: sig.source_name || "News",
        sourceUrl: sig.source_url || "",
        publishedDate: sig.published_at || new Date().toISOString(),
        relevanceToUser: sig.sales_implication || "Industry signal relevant to your services",
      })),
      outreachPlaybook: narrative.outreachPlaybook || {
        primaryAngle: `${sc.company.name}'s position as a ${sc.company.market_position || "key player"} in ${sc.company.industry_name} creates alignment with your ${userServices[0] || "services"} capabilities.`,
        talkingPoints: [
          `Reference their ${sc.company.competitive_advantage || "market position"}`,
          `Connect your services to their industry challenges`,
          `Highlight relevant case studies in ${sc.company.industry_name}`,
        ],
        objections: [
          { objection: "We already have a provider", rebuttal: "Many of our best clients started as second opinions — we often find gaps in existing solutions." },
        ],
        competitorWeaknesses: ["Generic solutions lacking industry depth"],
        idealTiming: "Early quarter for budget allocation discussions",
      },
      clientIntelligence: narrative.clientIntelligence || {
        industryOutlook: `${sc.company.industry_name} is experiencing transformation driven by technology and market shifts.`,
        keyTrends: ["Digital transformation acceleration", "AI and automation adoption", "Sustainability focus"],
        regulatoryWatch: ["Industry-specific compliance requirements"],
        aiTransformationMap: `AI readiness score of ${sc.company.ai_readiness_score || 40}/100 suggests room for strategic AI advisory.`,
        recommendedActions: [
          "Research recent company announcements",
          "Identify mutual connections for warm introduction",
          "Prepare industry-specific case study",
        ],
      },
    };
  });
}

// ── Main Handler ────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const authHeader = req.headers.get("authorization");
    const { profile } = await req.json();
    if (!profile) throw new Error("Profile required");

    console.log(`[score-real-companies] Starting for user ${profile.user_id}`);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // ── Step 1: Query real data ──────────────────────────────────────────
    const { data: companies, error: compErr } = await supabase
      .from("companies")
      .select("*")
      .eq("is_active", true);

    if (compErr || !companies || companies.length === 0) {
      console.warn("[score-real-companies] No companies found:", compErr?.message);
      return new Response(
        JSON.stringify({ success: false, error: "No real companies available" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`[score-real-companies] Found ${companies.length} active companies`);

    // Get recent signals (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { data: signals } = await supabase
      .from("real_signals")
      .select("*")
      .gte("published_at", thirtyDaysAgo)
      .eq("ai_enriched", true)
      .order("published_at", { ascending: false })
      .limit(200);

    console.log(`[score-real-companies] Found ${signals?.length || 0} recent enriched signals`);

    // Get user feedback
    let feedback: any[] = [];
    try {
      const { data: fb } = await supabase
        .from("prospect_feedback")
        .select("*")
        .eq("user_id", profile.user_id)
        .order("created_at", { ascending: false })
        .limit(50);
      feedback = fb || [];
    } catch (e) {
      console.warn("Could not fetch feedback:", e);
    }

    // Get company contacts
    const { data: allContacts } = await supabase
      .from("company_contacts")
      .select("*")
      .in(
        "company_id",
        companies.map((c: any) => c.id)
      );

    const contactsByCompany = new Map<string, any[]>();
    for (const c of allContacts || []) {
      if (!contactsByCompany.has(c.company_id)) {
        contactsByCompany.set(c.company_id, []);
      }
      contactsByCompany.get(c.company_id)!.push(c);
    }

    // ── Step 2: Score all companies ──────────────────────────────────────
    const scored = companies.map((company: any) =>
      scoreCompany(company, profile, signals || [], feedback)
    );

    console.log(
      `[score-real-companies] Scored ${scored.length} companies. Top 5:`,
      scored
        .sort((a, b) => b.compositeScore - a.compositeScore)
        .slice(0, 5)
        .map((s) => `${s.company.name}: ${s.compositeScore}`)
    );

    // ── Step 3: Select top companies with scope distribution ─────────────
    const selected = selectTopCompanies(scored, 50);
    console.log(
      `[score-real-companies] Selected ${selected.length} companies. Scope: ` +
        `local=${selected.filter((s) => s.company.scope === "local").length}, ` +
        `national=${selected.filter((s) => s.company.scope === "national").length}, ` +
        `international=${selected.filter((s) => s.company.scope === "international").length}`
    );

    // ── Step 4: LLM narrative synthesis ──────────────────────────────────
    console.log("[score-real-companies] Generating narratives via LLM...");
    const narratives = await generateNarratives(selected, signals || [], profile, LOVABLE_API_KEY);
    console.log(`[score-real-companies] Generated narratives for ${narratives.size} companies`);

    // ── Step 5: Build final output ───────────────────────────────────────
    const industries = buildIndustries(selected, signals || []);
    const outputSignals = buildSignals(selected);
    const prospects = assembleProspects(selected, narratives, contactsByCompany, profile);

    const finalData = {
      industries,
      signals: outputSignals,
      prospects,
    };

    // ── Step 6: Cache results ────────────────────────────────────────────
    try {
      if (authHeader) {
        // Extract user from auth token to get effective user
        const userId = profile.user_id;
        if (userId) {
          await supabase.from("cached_intelligence").upsert(
            {
              user_id: userId,
              intelligence_data: {
                ...finalData,
                _source: "real_data",
                _scoredAt: new Date().toISOString(),
                _companiesScored: companies.length,
                _signalsMatched: signals?.length || 0,
              },
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id" }
          );
          console.log(`[score-real-companies] Cached results for user ${userId}`);
        }
      }
    } catch (cacheErr) {
      console.warn("[score-real-companies] Cache write failed:", cacheErr);
    }

    // ── Step 7: Cache individual company scores ─────────────────────────
    try {
      const scoresToUpsert = selected.map((sc) => ({
        user_id: profile.user_id,
        company_id: sc.company.id,
        composite_score: sc.compositeScore,
        industry_match_score: sc.breakdown.industry,
        revenue_match_score: sc.breakdown.revenue,
        geo_match_score: sc.breakdown.geo,
        services_match_score: sc.breakdown.services,
        signal_recency_score: sc.breakdown.signalRecency,
        matched_signal_ids: sc.matchedSignals.map((s) => s.id),
        scored_at: new Date().toISOString(),
      }));

      await supabase
        .from("company_scores")
        .upsert(scoresToUpsert, { onConflict: "user_id,company_id" });
    } catch (scoreErr) {
      console.warn("[score-real-companies] Score cache write failed:", scoreErr);
    }

    console.log(
      `[score-real-companies] Complete: ${prospects.length} prospects, ${industries.length} industries, ${outputSignals.length} signals`
    );

    return new Response(
      JSON.stringify({ success: true, data: finalData }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("[score-real-companies] Fatal error:", err);

    if (err.message?.includes("rate") || err.message?.includes("429")) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (err.message?.includes("credit") || err.message?.includes("402")) {
      return new Response(
        JSON.stringify({ error: "AI credits exhausted." }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
