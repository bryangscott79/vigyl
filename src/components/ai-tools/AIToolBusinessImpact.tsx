import { TrendingUp, DollarSign, Clock, Shield, Users, Wrench } from "lucide-react";
import type { AITool } from "@/hooks/useAITools";

interface ImpactArea {
  title: string;
  level: "High" | "Medium" | "Low";
  description: string;
  icon: typeof TrendingUp;
}

interface CategoryImpactConfig {
  impacts: ImpactArea[];
  beneficiaries: string[];
  complexity: "Easy" | "Moderate" | "Complex";
}

const levelConfig: Record<string, { class: string; bg: string }> = {
  High: { class: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  Medium: { class: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  Low: { class: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
};

const complexityConfig: Record<string, { class: string; label: string }> = {
  Easy: { class: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", label: "Easy" },
  Moderate: { class: "bg-amber-500/10 text-amber-400 border-amber-500/20", label: "Moderate" },
  Complex: { class: "bg-red-500/10 text-red-400 border-red-500/20", label: "Complex" },
};

function getImpactConfig(tool: AITool): CategoryImpactConfig {
  const name = tool.name;
  const caps = tool.key_capabilities.join(", ").toLowerCase();
  const tags = tool.tags.join(", ").toLowerCase();

  switch (tool.category) {
    case "foundation_models":
      return {
        impacts: [
          { title: "Cost Reduction", level: "High", icon: DollarSign, description: `${name} automates reasoning-heavy tasks like research, drafting, and data synthesis -- reducing labor costs on knowledge work by replacing manual effort with AI-driven output.` },
          { title: "Time Savings", level: "High", icon: Clock, description: `Teams using ${name} can compress multi-hour analysis and writing tasks into minutes, freeing capacity for strategic work.` },
          { title: "Customer Experience", level: "Medium", icon: Users, description: `Powering chatbots, smart FAQs, and personalized responses, ${name} enables faster, more accurate customer interactions at scale.` },
          { title: "Competitive Advantage", level: "Medium", icon: Shield, description: `Early adoption of ${name} lets organizations build proprietary AI workflows and compound automation gains before competitors catch up.` },
          { title: "Revenue Growth", level: "Medium", icon: TrendingUp, description: `${name} unlocks new product capabilities -- from AI-assisted features to intelligent recommendations -- that can open revenue streams.` },
        ],
        beneficiaries: ["Product teams", "Customer support orgs", "Research analysts", "Content teams", "Startups building AI-native products"],
        complexity: tool.api_available ? "Moderate" : "Complex",
      };

    case "image_generation":
      return {
        impacts: [
          { title: "Cost Reduction", level: "High", icon: DollarSign, description: `${name} eliminates the need for stock photography budgets and reduces dependency on external design agencies for visual asset creation.` },
          { title: "Time Savings", level: "High", icon: Clock, description: `What takes a designer hours -- concepting, iterating, finalizing visuals -- ${name} can produce in seconds, dramatically accelerating creative pipelines.` },
          { title: "Revenue Growth", level: "Medium", icon: TrendingUp, description: `Faster visual content means faster campaign launches and more A/B testing of creative, driving higher marketing conversion rates.` },
          { title: "Competitive Advantage", level: "Medium", icon: Shield, description: `Brands using ${name} can produce on-trend visuals at the speed of culture, staying ahead of competitors still relying on traditional design cycles.` },
          { title: "Customer Experience", level: "Low", icon: Users, description: `Personalized product imagery and dynamic visual content powered by ${name} can make customer touchpoints feel more tailored and engaging.` },
        ],
        beneficiaries: ["Marketing teams", "Brand managers", "E-commerce companies", "Social media managers", "Small businesses without design staff"],
        complexity: "Easy",
      };

    case "video_generation":
      return {
        impacts: [
          { title: "Cost Reduction", level: "High", icon: DollarSign, description: `${name} replaces expensive video production workflows -- crews, studios, editing suites -- with AI-generated output at a fraction of the cost.` },
          { title: "Time Savings", level: "High", icon: Clock, description: `Video creation timelines collapse from weeks to hours with ${name}, enabling rapid iteration on training materials, ads, and social content.` },
          { title: "Revenue Growth", level: "High", icon: TrendingUp, description: `Video drives the highest engagement across platforms. ${name} lets teams produce more video content, boosting reach and conversion.` },
          { title: "Customer Experience", level: "Medium", icon: Users, description: `${name} enables personalized video messages, dynamic product demos, and interactive training -- raising the bar on customer and employee engagement.` },
          { title: "Competitive Advantage", level: "Medium", icon: Shield, description: `Organizations using ${name} can dominate video-first channels while competitors are still stuck in traditional production bottlenecks.` },
        ],
        beneficiaries: ["Marketing departments", "L&D / training teams", "Social media creators", "Sales enablement teams", "E-commerce brands"],
        complexity: "Moderate",
      };

    case "audio_voice":
      return {
        impacts: [
          { title: "Customer Experience", level: "High", icon: Users, description: `${name} powers natural-sounding voice interfaces, IVR systems, and audio content that makes every customer interaction feel more human.` },
          { title: "Cost Reduction", level: "High", icon: DollarSign, description: `Replacing voice actors, podcast editors, and manual transcription with ${name} cuts production costs dramatically across audio workflows.` },
          { title: "Time Savings", level: "Medium", icon: Clock, description: `Audio content that once required studio sessions and post-production can now be generated and iterated on rapidly with ${name}.` },
          { title: "Revenue Growth", level: "Medium", icon: TrendingUp, description: `${name} enables new audio products -- podcasts, audiobooks, voice-enabled features -- that expand content offerings and audience reach.` },
          { title: "Competitive Advantage", level: "Low", icon: Shield, description: `Accessibility improvements through ${name}'s voice synthesis and transcription features help reach underserved markets and meet compliance standards.` },
        ],
        beneficiaries: ["Content creators and podcasters", "Accessibility teams", "Customer service operations", "Media companies", "EdTech platforms"],
        complexity: "Easy",
      };

    case "code_developer":
      return {
        impacts: [
          { title: "Time Savings", level: "High", icon: Clock, description: `${name} accelerates development velocity by auto-completing code, generating boilerplate, and debugging -- developers ship features faster.` },
          { title: "Cost Reduction", level: "High", icon: DollarSign, description: `With ${name}, smaller engineering teams can deliver the output of larger ones, reducing headcount pressure and contractor spend.` },
          { title: "Revenue Growth", level: "High", icon: TrendingUp, description: `Faster product iteration powered by ${name} means features reach users sooner, shortening time-to-revenue on new capabilities.` },
          { title: "Competitive Advantage", level: "Medium", icon: Shield, description: `Teams using ${name} reduce technical debt faster and maintain code quality at speed -- a compounding advantage over time.` },
          { title: "Customer Experience", level: "Medium", icon: Users, description: `Faster bug fixes and feature delivery through ${name} translates directly to better product reliability and user satisfaction.` },
        ],
        beneficiaries: ["Software engineering teams", "CTOs and VP Engineering", "Startups with lean dev teams", "DevOps engineers", "Freelance developers"],
        complexity: tags.includes("ide") || caps.includes("plugin") ? "Easy" : "Moderate",
      };

    case "business_automation":
      return {
        impacts: [
          { title: "Cost Reduction", level: "High", icon: DollarSign, description: `${name} automates repetitive operational tasks -- data entry, approvals, notifications -- eliminating manual labor costs across departments.` },
          { title: "Time Savings", level: "High", icon: Clock, description: `Workflows that took hours of human coordination now execute automatically through ${name}, freeing teams to focus on high-value work.` },
          { title: "Revenue Growth", level: "Medium", icon: TrendingUp, description: `By removing operational bottlenecks, ${name} lets organizations scale revenue-generating activities without proportional headcount increases.` },
          { title: "Competitive Advantage", level: "High", icon: Shield, description: `${name} enables operational agility -- faster pivots, smoother scaling, quicker response to market changes -- that slower competitors cannot match.` },
          { title: "Customer Experience", level: "Medium", icon: Users, description: `Automated follow-ups, faster order processing, and fewer human errors through ${name} create smoother customer journeys end to end.` },
        ],
        beneficiaries: ["Operations managers", "Revenue operations teams", "SMBs scaling without adding headcount", "Customer success teams", "Finance and HR departments"],
        complexity: tool.integrations.length > 5 ? "Easy" : "Moderate",
      };

    case "design_creative":
      return {
        impacts: [
          { title: "Time Savings", level: "High", icon: Clock, description: `${name} compresses design iteration cycles -- wireframing, prototyping, asset creation -- so creative teams deliver polished work faster.` },
          { title: "Cost Reduction", level: "High", icon: DollarSign, description: `Fewer design revisions and less dependency on specialized contractors means ${name} cuts creative production costs significantly.` },
          { title: "Revenue Growth", level: "Medium", icon: TrendingUp, description: `Faster creative output from ${name} means campaigns, product pages, and brand materials launch sooner, driving revenue earlier.` },
          { title: "Competitive Advantage", level: "Medium", icon: Shield, description: `${name} helps maintain brand consistency at scale while enabling rapid experimentation -- a combination most competitors struggle with.` },
          { title: "Customer Experience", level: "Medium", icon: Users, description: `Higher-quality, more consistent visual experiences powered by ${name} build trust and professionalism across every customer touchpoint.` },
        ],
        beneficiaries: ["Design teams", "Marketing creative directors", "Brand managers", "E-commerce merchandising teams", "Agencies and studios"],
        complexity: "Easy",
      };

    case "data_analytics":
      return {
        impacts: [
          { title: "Revenue Growth", level: "High", icon: TrendingUp, description: `${name} surfaces revenue-driving insights -- churn patterns, upsell signals, conversion bottlenecks -- that would take analysts weeks to find manually.` },
          { title: "Competitive Advantage", level: "High", icon: Shield, description: `Data-driven decisions powered by ${name} compound over time, giving organizations a systematic edge in strategy and execution.` },
          { title: "Time Savings", level: "High", icon: Clock, description: `${name} automates report generation, data cleaning, and trend analysis -- work that previously consumed entire analyst days.` },
          { title: "Cost Reduction", level: "Medium", icon: DollarSign, description: `Self-service analytics through ${name} reduces the backlog on data teams and the need for specialized BI consultants.` },
          { title: "Customer Experience", level: "Medium", icon: Users, description: `Better data from ${name} enables more precise personalization, targeted offers, and proactive issue resolution for customers.` },
        ],
        beneficiaries: ["Business intelligence teams", "C-suite executives", "Product managers", "Growth and marketing analysts", "Data engineers"],
        complexity: caps.includes("natural language") || caps.includes("no-code") ? "Easy" : "Complex",
      };

    case "writing_content":
      return {
        impacts: [
          { title: "Time Savings", level: "High", icon: Clock, description: `${name} drafts blog posts, emails, ad copy, and reports in minutes -- work that previously consumed hours of writer and editor time.` },
          { title: "Revenue Growth", level: "High", icon: TrendingUp, description: `More content, faster, means more SEO surface area, more campaign variations, and more sales collateral -- all driving pipeline with ${name}.` },
          { title: "Cost Reduction", level: "High", icon: DollarSign, description: `${name} reduces reliance on freelance writers and agencies for routine content, keeping production costs low as output scales.` },
          { title: "Competitive Advantage", level: "Medium", icon: Shield, description: `Brands using ${name} can maintain a consistent, high-volume content presence that drowns out competitors with less content velocity.` },
          { title: "Customer Experience", level: "Medium", icon: Users, description: `${name} enables personalized messaging at scale -- tailored emails, dynamic landing pages, and localized content -- that makes customers feel understood.` },
        ],
        beneficiaries: ["Content marketing teams", "Sales enablement managers", "SEO specialists", "Copywriters and editors", "Startup founders wearing multiple hats"],
        complexity: "Easy",
      };

    case "specialized":
    default:
      return {
        impacts: [
          { title: "Competitive Advantage", level: "High", icon: Shield, description: `${name} targets a specific vertical with purpose-built AI, giving adopters capabilities that horizontal tools cannot replicate.` },
          { title: "Time Savings", level: "High", icon: Clock, description: `Domain-specific automation in ${name} eliminates manual steps unique to this vertical, saving time where generic tools cannot.` },
          { title: "Cost Reduction", level: "Medium", icon: DollarSign, description: `${name} replaces specialized consultants or manual processes with AI-driven workflows tailored to the domain's exact needs.` },
          { title: "Revenue Growth", level: "Medium", icon: TrendingUp, description: `${name} enables new service offerings or operational efficiencies that directly translate to top-line growth in this vertical.` },
          { title: "Customer Experience", level: "Medium", icon: Users, description: `End users of ${name}-powered workflows benefit from faster, more accurate outcomes tuned to their specific industry expectations.` },
        ],
        beneficiaries: ["Industry specialists", "Domain-specific teams", "Compliance and regulatory teams", "Niche SaaS companies", "Enterprise vertical leads"],
        complexity: "Complex",
      };
  }
}

export default function AIToolBusinessImpact({ tool }: { tool: AITool }) {
  const config = getImpactConfig(tool);
  const complexity = complexityConfig[config.complexity];

  return (
    <div className="space-y-5">
      {/* Impact areas */}
      <div className="space-y-3">
        {config.impacts.map((impact) => {
          const level = levelConfig[impact.level];
          const Icon = impact.icon;
          return (
            <div
              key={impact.title}
              className="rounded-lg border border-border bg-card p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Icon className={`h-4 w-4 flex-shrink-0 ${level.class}`} />
                  <h4 className="text-sm font-semibold text-foreground">{impact.title}</h4>
                </div>
                <span
                  className={`inline-flex flex-shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-medium ${level.bg}`}
                >
                  {impact.level}
                </span>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                {impact.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Who benefits most */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="text-sm font-semibold text-foreground mb-2">Who Benefits Most</h4>
        <div className="flex flex-wrap gap-1.5">
          {config.beneficiaries.map((b) => (
            <span
              key={b}
              className="inline-flex items-center rounded-full bg-primary/5 px-2.5 py-1 text-[11px] text-primary/80"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Implementation complexity */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-semibold text-foreground">Implementation Complexity</h4>
          </div>
          <span
            className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${complexity.class}`}
          >
            {complexity.label}
          </span>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
          {config.complexity === "Easy" && `${tool.name} is designed for quick adoption with minimal technical setup. Most teams can be productive within a day.`}
          {config.complexity === "Moderate" && `${tool.name} requires some integration work and team onboarding. Expect 1-2 weeks to see full value from the implementation.`}
          {config.complexity === "Complex" && `${tool.name} involves significant integration effort, potential infrastructure changes, and specialized expertise. Plan for a multi-week rollout.`}
        </p>
      </div>
    </div>
  );
}
