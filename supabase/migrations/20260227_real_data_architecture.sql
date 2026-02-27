-- ============================================================================
-- VIGYL Real Data Architecture
-- Creates: companies, real_signals, company_scores, company_contacts,
--          signal_ingestion_log
-- ============================================================================

-- ─── Companies ───────────────────────────────────────────────────────────────
-- Global company directory — shared across all users, no user_id
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  industry_slug TEXT NOT NULL,
  industry_name TEXT NOT NULL,
  sector TEXT,
  website_url TEXT,
  description TEXT,
  headquarters_city TEXT,
  headquarters_state TEXT,
  headquarters_country TEXT DEFAULT 'US',
  revenue_tier TEXT CHECK (revenue_tier IN ('growth', 'mid_market', 'upper_mid', 'enterprise')),
  annual_revenue_estimate TEXT,
  employee_count_estimate INTEGER,
  market_position TEXT CHECK (market_position IN (
    'Market Leader', 'Strong Challenger', 'Niche Specialist',
    'Emerging Player', 'Regional Leader'
  )),
  competitive_advantage TEXT,
  scope TEXT CHECK (scope IN ('local', 'national', 'international')) DEFAULT 'national',
  ai_readiness_score INTEGER DEFAULT 40 CHECK (ai_readiness_score BETWEEN 0 AND 100),
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_companies_industry ON companies(industry_slug);
CREATE INDEX IF NOT EXISTS idx_companies_scope ON companies(scope);
CREATE INDEX IF NOT EXISTS idx_companies_revenue_tier ON companies(revenue_tier);
CREATE INDEX IF NOT EXISTS idx_companies_state ON companies(headquarters_state);
CREATE INDEX IF NOT EXISTS idx_companies_active ON companies(is_active) WHERE is_active = true;

-- ─── Real Signals ────────────────────────────────────────────────────────────
-- Ingested news articles with AI-enriched classification
CREATE TABLE IF NOT EXISTS real_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT,
  source_url TEXT NOT NULL,
  source_name TEXT,
  published_at TIMESTAMPTZ,
  ingested_at TIMESTAMPTZ DEFAULT now(),
  signal_type TEXT CHECK (signal_type IN (
    'political', 'regulatory', 'economic', 'hiring', 'tech',
    'supply_chain', 'social', 'competitive', 'environmental'
  )),
  sentiment TEXT CHECK (sentiment IN ('positive', 'negative', 'neutral')),
  severity INTEGER CHECK (severity BETWEEN 1 AND 5),
  sales_implication TEXT,
  related_industries TEXT[] DEFAULT '{}',
  related_company_names TEXT[] DEFAULT '{}',
  ai_enriched BOOLEAN DEFAULT false,
  content_hash TEXT UNIQUE,
  metadata JSONB DEFAULT '{}'
);

CREATE INDEX IF NOT EXISTS idx_real_signals_published ON real_signals(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_real_signals_type ON real_signals(signal_type);
CREATE INDEX IF NOT EXISTS idx_real_signals_industries ON real_signals USING GIN(related_industries);
CREATE INDEX IF NOT EXISTS idx_real_signals_companies ON real_signals USING GIN(related_company_names);
CREATE INDEX IF NOT EXISTS idx_real_signals_ingested ON real_signals(ingested_at DESC);
CREATE INDEX IF NOT EXISTS idx_real_signals_enriched ON real_signals(ai_enriched) WHERE ai_enriched = true;

-- ─── Company Scores ──────────────────────────────────────────────────────────
-- Per-user scoring cache: how well each company matches the user's profile
CREATE TABLE IF NOT EXISTS company_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  composite_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  industry_match_score NUMERIC(5,2) DEFAULT 0,
  revenue_match_score NUMERIC(5,2) DEFAULT 0,
  geo_match_score NUMERIC(5,2) DEFAULT 0,
  services_match_score NUMERIC(5,2) DEFAULT 0,
  signal_recency_score NUMERIC(5,2) DEFAULT 0,
  matched_signal_ids UUID[] DEFAULT '{}',
  scored_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, company_id)
);

CREATE INDEX IF NOT EXISTS idx_company_scores_user ON company_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_company_scores_composite ON company_scores(user_id, composite_score DESC);

-- ─── Company Contacts ────────────────────────────────────────────────────────
-- Known decision-makers / contacts at each company
CREATE TABLE IF NOT EXISTS company_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  title TEXT,
  department TEXT,
  linkedin_url TEXT,
  email TEXT,
  verified BOOLEAN DEFAULT false,
  source TEXT,
  relevance TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_company_contacts_company ON company_contacts(company_id);

-- ─── Signal Ingestion Log ────────────────────────────────────────────────────
-- Tracks each ingestion run for monitoring and debugging
CREATE TABLE IF NOT EXISTS signal_ingestion_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  query_term TEXT,
  signals_fetched INTEGER DEFAULT 0,
  signals_new INTEGER DEFAULT 0,
  signals_enriched INTEGER DEFAULT 0,
  errors TEXT[] DEFAULT '{}',
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'
);

-- ─── Row Level Security ──────────────────────────────────────────────────────

-- Companies: any authenticated user can read (global directory)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read companies"
  ON companies FOR SELECT
  USING (auth.role() = 'authenticated');

-- Allow service role to insert/update companies (for seed data & future enrichment)
CREATE POLICY "Service role manages companies"
  ON companies FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Real Signals: any authenticated user can read
ALTER TABLE real_signals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read real signals"
  ON real_signals FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Service role manages real signals"
  ON real_signals FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Company Scores: users own their scores
ALTER TABLE company_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own company scores"
  ON company_scores FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role manages company scores"
  ON company_scores FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Company Contacts: any authenticated user can read
ALTER TABLE company_contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated users can read company contacts"
  ON company_contacts FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Service role manages company contacts"
  ON company_contacts FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Signal Ingestion Log: service role only
ALTER TABLE signal_ingestion_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manages ingestion log"
  ON signal_ingestion_log FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- ─── Updated-at triggers ─────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER company_contacts_updated_at
  BEFORE UPDATE ON company_contacts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
