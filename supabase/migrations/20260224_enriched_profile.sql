-- Enriched Company Profile fields
-- These help the intelligence engine generate more targeted, relevant prospects

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS services text[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS company_descriptors text[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS known_competitors text[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS value_propositions text[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS ideal_client_revenue_min text DEFAULT NULL;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS ideal_client_revenue_max text DEFAULT NULL;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS ideal_client_employee_min integer DEFAULT NULL;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS ideal_client_employee_max integer DEFAULT NULL;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS geographic_focus text[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS case_study_industries text[] DEFAULT '{}';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS differentiators text DEFAULT NULL;

-- Contact verification tables (from Phase 13 enriched intelligence spec)
CREATE TABLE IF NOT EXISTS contact_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  prospect_id TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_title TEXT,
  feedback_type TEXT CHECK (feedback_type IN ('accurate', 'inaccurate', 'outdated')) NOT NULL,
  correct_info JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS verified_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  prospect_id TEXT NOT NULL,
  company_name TEXT NOT NULL,
  name TEXT NOT NULL,
  title TEXT,
  email TEXT,
  linkedin_url TEXT,
  phone TEXT,
  verification_source TEXT DEFAULT 'user_confirmed',
  confidence INTEGER DEFAULT 50,
  verified_at TIMESTAMPTZ DEFAULT now(),
  user_notes TEXT,
  is_primary BOOLEAN DEFAULT false,
  UNIQUE(user_id, prospect_id, name)
);

-- RLS policies
ALTER TABLE contact_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE verified_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own their contact feedback" ON contact_feedback FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users own their verified contacts" ON verified_contacts FOR ALL USING (auth.uid() = user_id);
