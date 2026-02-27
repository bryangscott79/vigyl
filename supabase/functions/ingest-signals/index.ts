import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ── Query terms for news ingestion ──────────────────────────────────────────
const QUERY_TERMS = [
  "technology business AI enterprise",
  "digital transformation company",
  "mergers acquisitions technology",
  "regulatory compliance fintech healthcare",
  "cybersecurity data breach enterprise",
  "supply chain disruption logistics",
  "hiring layoffs technology startups",
  "ESG sustainability corporate",
  "healthcare innovation digital health",
  "financial services fintech banking",
  "manufacturing automation industry",
  "retail ecommerce DTC brands",
  "energy renewable clean tech",
  "real estate construction proptech",
  "SaaS cloud computing enterprise",
];

// ── Industry slug mapping for signal classification ─────────────────────────
const INDUSTRY_SLUGS = [
  "oil-gas-extraction", "crop-production", "residential-construction", "commercial-construction",
  "electric-power-generation", "renewable-energy-production", "natural-gas-distribution",
  "waste-management-services", "aerospace-defense-manufacturing", "automotive-manufacturing",
  "semiconductor-manufacturing", "medical-device-manufacturing", "pharmaceutical-manufacturing",
  "chemical-manufacturing", "food-processing", "beverage-manufacturing", "air-transportation",
  "trucking-freight", "third-party-logistics", "last-mile-delivery", "commercial-banking",
  "insurance-carriers", "fintech-services", "payment-processing", "hospitals",
  "physician-practices", "software-publishing", "saas-providers", "cybersecurity-services",
  "cloud-infrastructure", "ai-platforms", "digital-advertising", "wireless-telecom",
  "cable-streaming-media", "ecommerce-retail", "grocery-stores", "big-box-retailers",
  "specialty-retail", "it-consulting-services", "gaming-interactive-media",
];

interface RawArticle {
  title: string;
  url: string;
  publishedAt: string;
  sourceName: string;
  description?: string;
}

// ── Google News RSS Parser ──────────────────────────────────────────────────
function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<!\[CDATA\[(.*?)\]\]>/g, "$1");
}

function parseRSSItems(xml: string): RawArticle[] {
  const items: RawArticle[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const content = match[1];
    const title = content.match(/<title>(.*?)<\/title>/)?.[1] || "";
    const link = content.match(/<link>(.*?)<\/link>/)?.[1] || "";
    const pubDate = content.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";
    const source = content.match(/<source[^>]*>(.*?)<\/source>/)?.[1] || "";

    if (title && link) {
      const publishedAt = pubDate ? new Date(pubDate).toISOString() : new Date().toISOString();
      items.push({
        title: decodeHtmlEntities(title),
        url: link.trim(),
        publishedAt,
        sourceName: decodeHtmlEntities(source) || "Google News",
      });
    }
  }
  return items;
}

async function fetchGoogleNewsRSS(query: string): Promise<RawArticle[]> {
  try {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`;
    const resp = await fetch(url, {
      headers: { "User-Agent": "VIGYL-Signal-Ingestion/1.0" },
    });
    if (!resp.ok) {
      console.warn(`Google RSS returned ${resp.status} for query: ${query}`);
      return [];
    }
    const xml = await resp.text();
    return parseRSSItems(xml);
  } catch (err) {
    console.warn(`Failed to fetch RSS for "${query}":`, err);
    return [];
  }
}

// ── NewsAPI Fetcher ─────────────────────────────────────────────────────────
async function fetchNewsAPI(query: string, apiKey: string): Promise<RawArticle[]> {
  try {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=15&apiKey=${apiKey}`;
    const resp = await fetch(url);
    if (!resp.ok) {
      console.warn(`NewsAPI returned ${resp.status} for query: ${query}`);
      return [];
    }
    const data = await resp.json();
    if (data.status !== "ok") return [];
    return (data.articles || []).map((a: any) => ({
      title: a.title || "",
      url: a.url || "",
      publishedAt: a.publishedAt ? new Date(a.publishedAt).toISOString() : new Date().toISOString(),
      sourceName: a.source?.name || "Unknown",
      description: a.description || "",
    }));
  } catch (err) {
    console.warn(`Failed to fetch NewsAPI for "${query}":`, err);
    return [];
  }
}

// ── Deduplication Hash ──────────────────────────────────────────────────────
async function hashUrl(url: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(url.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ── AI Enrichment ───────────────────────────────────────────────────────────
async function enrichSignalsBatch(
  signals: { id: string; title: string; summary: string | null; sourceName: string | null }[],
  apiKey: string
): Promise<Map<string, any>> {
  const results = new Map();
  if (signals.length === 0) return results;

  const articlesText = signals
    .map(
      (s, i) =>
        `${i + 1}. "${s.title}" — ${s.sourceName || "Unknown"}${s.summary ? ` — ${s.summary.substring(0, 200)}` : ""}`
    )
    .join("\n");

  const enrichPrompt = `Classify each news article below for B2B sales intelligence. For each article, provide:
- signal_type: one of [political, regulatory, economic, hiring, tech, supply_chain, social, competitive, environmental]
- sentiment: positive, negative, or neutral
- severity: 1-5 (1=minor, 5=critical market impact)
- sales_implication: one sentence on how a B2B seller could leverage this signal
- related_industries: array of industry slugs from this list: ${INDUSTRY_SLUGS.slice(0, 20).join(", ")} (pick 1-3 most relevant)
- related_company_names: array of company names explicitly mentioned in the article (empty if none)

Articles:
${articlesText}

Return a JSON array with one object per article, in the same order.`;

  try {
    const resp = await fetch("https://api.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content:
              "You are a B2B market intelligence classifier. Return valid JSON only — an array of objects matching the requested schema. No markdown, no explanation.",
          },
          { role: "user", content: enrichPrompt },
        ],
        max_completion_tokens: 4096,
        temperature: 0.3,
      }),
    });

    if (!resp.ok) {
      console.warn(`LLM enrichment returned ${resp.status}`);
      return results;
    }

    const data = await resp.json();
    let content = data.choices?.[0]?.message?.content || "";
    // Strip markdown fences if present
    content = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();

    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      parsed.forEach((enrichment: any, i: number) => {
        if (i < signals.length) {
          results.set(signals[i].id, {
            signal_type: enrichment.signal_type || "economic",
            sentiment: enrichment.sentiment || "neutral",
            severity: Math.max(1, Math.min(5, enrichment.severity || 3)),
            sales_implication: enrichment.sales_implication || "",
            related_industries: Array.isArray(enrichment.related_industries)
              ? enrichment.related_industries.slice(0, 3)
              : [],
            related_company_names: Array.isArray(enrichment.related_company_names)
              ? enrichment.related_company_names
              : [],
          });
        }
      });
    }
  } catch (err) {
    console.warn("LLM enrichment failed:", err);
  }

  return results;
}

// ── Main Handler ────────────────────────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const startedAt = new Date().toISOString();
  const errors: string[] = [];
  let totalFetched = 0;
  let totalNew = 0;
  let totalEnriched = 0;

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const NEWSAPI_KEY = Deno.env.get("NEWSAPI_KEY");
    const useNewsAPI = !!NEWSAPI_KEY;
    const source = useNewsAPI ? "newsapi" : "google_rss";

    console.log(`[ingest-signals] Starting ingestion via ${source}`);

    // Optionally add top company names as query terms
    let companyQueries: string[] = [];
    try {
      const { data: topCompanies } = await supabase
        .from("companies")
        .select("name")
        .eq("is_active", true)
        .limit(10);
      if (topCompanies) {
        companyQueries = topCompanies.map((c: any) => `"${c.name}" news`);
      }
    } catch (e) {
      console.warn("Could not fetch company names for queries:", e);
    }

    const allQueries = [...QUERY_TERMS, ...companyQueries];
    const allArticles: RawArticle[] = [];

    // Fetch articles for each query term (rate-limited)
    for (const query of allQueries) {
      const articles = useNewsAPI
        ? await fetchNewsAPI(query, NEWSAPI_KEY!)
        : await fetchGoogleNewsRSS(query);
      allArticles.push(...articles);

      // Small delay to avoid rate limiting
      await new Promise((r) => setTimeout(r, 300));
    }

    console.log(`[ingest-signals] Fetched ${allArticles.length} total articles`);
    totalFetched = allArticles.length;

    // Filter out articles older than 90 days
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).getTime();
    const recentArticles = allArticles.filter((a) => {
      try {
        return new Date(a.publishedAt).getTime() > ninetyDaysAgo;
      } catch {
        return true; // keep if date parsing fails
      }
    });

    // Deduplicate by URL hash
    const uniqueArticles = new Map<string, RawArticle>();
    for (const article of recentArticles) {
      if (!article.url || !article.title) continue;
      const hash = await hashUrl(article.url);
      if (!uniqueArticles.has(hash)) {
        uniqueArticles.set(hash, article);
      }
    }

    console.log(`[ingest-signals] ${uniqueArticles.size} unique recent articles after dedup`);

    // Insert new signals (skip duplicates via content_hash)
    const newSignalIds: string[] = [];
    const newSignalsForEnrichment: { id: string; title: string; summary: string | null; sourceName: string | null }[] = [];

    for (const [hash, article] of uniqueArticles) {
      const { data: inserted, error: insertErr } = await supabase
        .from("real_signals")
        .upsert(
          {
            title: article.title.substring(0, 500),
            summary: article.description?.substring(0, 1000) || null,
            source_url: article.url,
            source_name: article.sourceName,
            published_at: article.publishedAt,
            content_hash: hash,
            ai_enriched: false,
          },
          { onConflict: "content_hash", ignoreDuplicates: true }
        )
        .select("id")
        .single();

      if (insertErr) {
        // Duplicate — expected behavior
        if (insertErr.code === "23505" || insertErr.message?.includes("duplicate")) continue;
        // Upsert with ignoreDuplicates may return null data
        continue;
      }

      if (inserted) {
        newSignalIds.push(inserted.id);
        newSignalsForEnrichment.push({
          id: inserted.id,
          title: article.title,
          summary: article.description || null,
          sourceName: article.sourceName || null,
        });
      }
    }

    // Also check for un-enriched signals from previous runs
    const { data: unenriched } = await supabase
      .from("real_signals")
      .select("id, title, summary, source_name")
      .eq("ai_enriched", false)
      .order("ingested_at", { ascending: false })
      .limit(50);

    if (unenriched) {
      for (const s of unenriched) {
        if (!newSignalsForEnrichment.find((n) => n.id === s.id)) {
          newSignalsForEnrichment.push({
            id: s.id,
            title: s.title,
            summary: s.summary,
            sourceName: s.source_name,
          });
        }
      }
    }

    totalNew = newSignalIds.length;
    console.log(`[ingest-signals] ${totalNew} new signals inserted, ${newSignalsForEnrichment.length} to enrich`);

    // AI-enrich signals in batches of 8
    const BATCH_SIZE = 8;
    for (let i = 0; i < newSignalsForEnrichment.length; i += BATCH_SIZE) {
      const batch = newSignalsForEnrichment.slice(i, i + BATCH_SIZE);
      const enrichments = await enrichSignalsBatch(batch, LOVABLE_API_KEY);

      for (const [signalId, enrichment] of enrichments) {
        const { error: updateErr } = await supabase
          .from("real_signals")
          .update({
            signal_type: enrichment.signal_type,
            sentiment: enrichment.sentiment,
            severity: enrichment.severity,
            sales_implication: enrichment.sales_implication,
            related_industries: enrichment.related_industries,
            related_company_names: enrichment.related_company_names,
            ai_enriched: true,
          })
          .eq("id", signalId);

        if (updateErr) {
          errors.push(`Failed to update signal ${signalId}: ${updateErr.message}`);
        } else {
          totalEnriched++;
        }
      }

      // Small delay between batches
      if (i + BATCH_SIZE < newSignalsForEnrichment.length) {
        await new Promise((r) => setTimeout(r, 500));
      }
    }

    // Log the ingestion run
    await supabase.from("signal_ingestion_log").insert({
      source,
      query_term: allQueries.join("; ").substring(0, 500),
      signals_fetched: totalFetched,
      signals_new: totalNew,
      signals_enriched: totalEnriched,
      errors: errors.length > 0 ? errors.slice(0, 10) : [],
      started_at: startedAt,
      completed_at: new Date().toISOString(),
    });

    console.log(
      `[ingest-signals] Complete: ${totalFetched} fetched, ${totalNew} new, ${totalEnriched} enriched, ${errors.length} errors`
    );

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          source,
          fetched: totalFetched,
          new: totalNew,
          enriched: totalEnriched,
          errors: errors.length,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("[ingest-signals] Fatal error:", err);
    errors.push(err.message);

    // Attempt to log the failed run
    try {
      const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
      await supabase.from("signal_ingestion_log").insert({
        source: "error",
        signals_fetched: totalFetched,
        signals_new: totalNew,
        signals_enriched: totalEnriched,
        errors: [err.message],
        started_at: startedAt,
        completed_at: new Date().toISOString(),
      });
    } catch (_) {
      // ignore logging errors
    }

    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
