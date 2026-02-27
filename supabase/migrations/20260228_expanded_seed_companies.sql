-- ============================================================================
-- VIGYL Expanded Seed Data: ~90 Additional Real Companies
-- Fills industry gaps to reach 175+ total companies across 25+ sectors
-- ============================================================================

INSERT INTO companies (name, slug, industry_slug, industry_name, sector, website_url, description,
  headquarters_city, headquarters_state, headquarters_country, revenue_tier, annual_revenue_estimate,
  employee_count_estimate, market_position, competitive_advantage, scope, ai_readiness_score, tags)
VALUES

-- ═══════════════════════════════════════════════════════════════════════════
-- HEALTHCARE & LIFE SCIENCES (10 companies)
-- ═══════════════════════════════════════════════════════════════════════════

('Teladoc Health', 'teladoc-health', 'physician-practices', 'Physician Practices', 'Healthcare & Life Sciences',
 'https://www.teladoc.com', 'Virtual care provider offering telehealth, mental health, and chronic condition management services to 90M+ members worldwide.',
 'Purchase', 'NY', 'US', 'upper_mid', '$2.6B', 4500, 'Market Leader',
 'Largest telehealth platform with integrated virtual primary care and mental health', 'national', 82,
 ARRAY['public', 'telehealth', 'virtual-care', 'mental-health']),

('Oak Street Health', 'oak-street-health', 'outpatient-urgent-care', 'Outpatient & Urgent Care', 'Healthcare & Life Sciences',
 'https://www.oakstreethealth.com', 'Value-based primary care provider focused on Medicare patients, operating 200+ clinics with technology-enabled care model.',
 'Chicago', 'IL', 'US', 'upper_mid', '$2.8B', 8000, 'Strong Challenger',
 'Value-based Medicare primary care model with proven outcomes and tech-enabled care delivery', 'national', 72,
 ARRAY['cvs-subsidiary', 'value-based-care', 'medicare', 'high-growth']),

('Moderna', 'moderna', 'pharmaceutical-manufacturing', 'Pharmaceutical Manufacturing', 'Manufacturing — Nondurable Goods',
 'https://www.modernatx.com', 'Biotechnology company pioneering mRNA-based medicines and vaccines, with expanding pipeline in oncology, rare diseases, and infectious diseases.',
 'Cambridge', 'MA', 'US', 'enterprise', '$6.7B', 5900, 'Strong Challenger',
 'mRNA platform with validated technology and expanding therapeutic applications beyond vaccines', 'national', 90,
 ARRAY['public', 'biotech', 'mrna', 'vaccines', 'oncology']),

('Dexcom', 'dexcom', 'medical-device-manufacturing', 'Medical Device Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.dexcom.com', 'Medical device company specializing in continuous glucose monitoring systems for diabetes management with real-time smartphone integration.',
 'San Diego', 'CA', 'US', 'upper_mid', '$3.6B', 10000, 'Market Leader',
 'Leading CGM platform with consumer-grade UX and expanding beyond Type 1 diabetes', 'national', 85,
 ARRAY['public', 'medtech', 'diabetes', 'wearable', 'connected-health']),

('Brookdale Senior Living', 'brookdale-senior', 'nursing-residential-care', 'Nursing & Residential Care', 'Healthcare & Life Sciences',
 'https://www.brookdale.com', 'Largest US senior living community operator with 650+ communities offering independent living, assisted living, and memory care.',
 'Nashville', 'TN', 'US', 'upper_mid', '$3.1B', 54000, 'Market Leader',
 'Scale advantage as largest US senior living operator with turnaround momentum', 'national', 40,
 ARRAY['public', 'senior-living', 'assisted-living', 'memory-care']),

-- ═══════════════════════════════════════════════════════════════════════════
-- ENERGY & UTILITIES (8 companies)
-- ═══════════════════════════════════════════════════════════════════════════

('NextEra Energy', 'nextera-energy', 'renewable-energy-production', 'Renewable Energy Production', 'Energy & Utilities',
 'https://www.nexteraenergy.com', 'World''s largest generator of renewable energy from wind and solar, also operating Florida Power & Light regulated utility.',
 'Juno Beach', 'FL', 'US', 'enterprise', '$28B', 16000, 'Market Leader',
 'Largest renewable energy developer with regulated utility providing stable cash flow', 'national', 72,
 ARRAY['public', 'renewable', 'wind', 'solar', 'regulated-utility']),

('Enphase Energy', 'enphase-energy', 'renewable-energy-production', 'Renewable Energy Production', 'Energy & Utilities',
 'https://www.enphase.com', 'Solar energy technology company designing and manufacturing microinverters, battery storage, and EV chargers for residential solar systems.',
 'Fremont', 'CA', 'US', 'upper_mid', '$2.3B', 3000, 'Market Leader',
 'Dominant residential solar microinverter with expanding battery and home energy ecosystem', 'national', 85,
 ARRAY['public', 'solar', 'microinverter', 'energy-storage']),

('Waste Management', 'waste-management', 'waste-management-services', 'Waste Management Services', 'Energy & Utilities',
 'https://www.wm.com', 'Largest environmental services company in North America providing waste collection, recycling, and renewable energy generation from landfill gas.',
 'Houston', 'TX', 'US', 'enterprise', '$20.4B', 48000, 'Market Leader',
 'Dominant waste collection network with renewable natural gas revenue stream', 'national', 62,
 ARRAY['public', 'waste', 'recycling', 'renewable-gas']),

('Atmos Energy', 'atmos-energy', 'natural-gas-distribution', 'Natural Gas Distribution', 'Energy & Utilities',
 'https://www.atmosenergy.com', 'Pure-play natural gas distribution company serving 3M+ customers across eight states with safety and modernization focus.',
 'Dallas', 'TX', 'US', 'enterprise', '$4.8B', 4800, 'Regional Leader',
 'Largest US pure-play natural gas distributor with industry-leading pipeline modernization program', 'national', 50,
 ARRAY['public', 'natural-gas', 'regulated-utility', 'infrastructure']),

('American Water Works', 'american-water-works', 'water-sewage-utilities', 'Water & Sewage Utilities', 'Energy & Utilities',
 'https://www.amwater.com', 'Largest publicly traded US water and wastewater utility providing services to 14M+ people across 14 states.',
 'Camden', 'NJ', 'US', 'enterprise', '$4.2B', 6600, 'Market Leader',
 'Largest US water utility with regulated rate base growth and acquisition strategy', 'national', 55,
 ARRAY['public', 'water-utility', 'regulated', 'infrastructure']),

('Georgia Power', 'georgia-power', 'electric-power-generation', 'Electric Power Generation', 'Energy & Utilities',
 'https://www.georgiapower.com', 'Electric utility subsidiary of Southern Company serving 2.7M customers across Georgia with nuclear, natural gas, solar, and hydro generation.',
 'Atlanta', 'GA', 'US', 'enterprise', '$10.5B', 8000, 'Regional Leader',
 'Dominant Georgia utility with diverse generation fleet including new Vogtle nuclear units', 'local', 52,
 ARRAY['subsidiary', 'regulated-utility', 'nuclear', 'georgia']),

('Sunrun', 'sunrun', 'renewable-energy-production', 'Renewable Energy Production', 'Energy & Utilities',
 'https://www.sunrun.com', 'Largest residential solar, battery storage, and energy services company in the US with 900K+ customers.',
 'San Francisco', 'CA', 'US', 'upper_mid', '$2.2B', 15000, 'Market Leader',
 'Largest residential solar installer with integrated battery storage and virtual power plant capability', 'national', 70,
 ARRAY['public', 'solar', 'residential', 'energy-storage', 'vpp']),

('Enel', 'enel', 'renewable-energy-production', 'Renewable Energy Production', 'Energy & Utilities',
 'https://www.enel.com', 'Italian multinational energy company and one of the world''s largest renewable energy producers operating in 30+ countries.',
 'Rome', '', 'IT', 'enterprise', '$92B', 56000, 'Market Leader',
 'Global renewable energy leader with integrated generation, distribution, and retail presence', 'international', 65,
 ARRAY['public', 'renewable', 'utility', 'italian', 'global']),

-- ═══════════════════════════════════════════════════════════════════════════
-- CONSTRUCTION & REAL ESTATE (6 companies)
-- ═══════════════════════════════════════════════════════════════════════════

('D.R. Horton', 'dr-horton', 'residential-construction', 'Residential Construction', 'Construction & Infrastructure',
 'https://www.drhorton.com', 'Largest homebuilder in the US by volume, constructing affordable to luxury homes across 33 states.',
 'Arlington', 'TX', 'US', 'enterprise', '$36.8B', 14000, 'Market Leader',
 'Highest volume US homebuilder with affordable entry-level focus and land acquisition expertise', 'national', 52,
 ARRAY['public', 'homebuilder', 'affordable', 'volume-builder']),

('Procore Technologies', 'procore', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.procore.com', 'Cloud-based construction management platform connecting owners, contractors, and field teams with project management, quality, and safety tools.',
 'Carpinteria', 'CA', 'US', 'mid_market', '$950M', 3300, 'Market Leader',
 'Dominant construction project management platform with strong network effects and field adoption', 'national', 82,
 ARRAY['public', 'construction-tech', 'vertical-saas', 'project-management']),

('AECOM', 'aecom', 'heavy-civil-engineering', 'Heavy & Civil Engineering', 'Construction & Infrastructure',
 'https://www.aecom.com', 'Global infrastructure consulting firm providing planning, design, engineering, and construction management for transportation, water, and buildings.',
 'Dallas', 'TX', 'US', 'enterprise', '$14.4B', 51000, 'Market Leader',
 'Scale advantage in infrastructure consulting with government relationships and global delivery', 'national', 65,
 ARRAY['public', 'engineering', 'infrastructure', 'consulting']),

('Zillow Group', 'zillow', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.zillow.com', 'Digital real estate company operating Zillow, Trulia, and StreetEasy marketplace platforms with AI-powered home valuations.',
 'Seattle', 'WA', 'US', 'upper_mid', '$2.0B', 6500, 'Market Leader',
 'Dominant consumer real estate platform with Zestimate AI valuations and agent marketplace', 'national', 85,
 ARRAY['public', 'proptech', 'marketplace', 'ai-valuations']),

('Vulcan Materials', 'vulcan-materials', 'nonmetallic-mineral-mining', 'Nonmetallic Mineral Mining', 'Primary & Resources',
 'https://www.vulcanmaterials.com', 'Largest US producer of construction aggregates — crushed stone, sand, and gravel — with 404 active quarries and distribution sites.',
 'Birmingham', 'AL', 'US', 'enterprise', '$8.1B', 12500, 'Market Leader',
 'Irreplaceable quarry network with local market moats and infrastructure spending tailwinds', 'national', 45,
 ARRAY['public', 'aggregates', 'construction-materials', 'infrastructure']),

('Jacobs Solutions', 'jacobs-solutions', 'industrial-construction', 'Industrial Construction', 'Construction & Infrastructure',
 'https://www.jacobs.com', 'Global professional services firm providing engineering, consulting, and technical services for infrastructure, advanced facilities, and sustainability.',
 'Dallas', 'TX', 'US', 'enterprise', '$16.4B', 60000, 'Market Leader',
 'Diversified engineering services with strong position in government, defense, and sustainability projects', 'national', 68,
 ARRAY['public', 'engineering', 'consulting', 'defense', 'sustainability']),

-- ═══════════════════════════════════════════════════════════════════════════
-- MANUFACTURING (10 companies)
-- ═══════════════════════════════════════════════════════════════════════════

('Honeywell', 'honeywell', 'industrial-equipment-manufacturing', 'Industrial Equipment Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.honeywell.com', 'Diversified technology and manufacturing company operating in aerospace, building automation, performance materials, and safety solutions.',
 'Charlotte', 'NC', 'US', 'enterprise', '$36.7B', 95000, 'Market Leader',
 'Diversified industrial technology leader with strong aerospace and building automation positions', 'national', 75,
 ARRAY['public', 'diversified-industrial', 'aerospace', 'automation']),

('Deere & Company', 'deere', 'agricultural-equipment-manufacturing', 'Agricultural Equipment Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.deere.com', 'World''s largest manufacturer of agricultural equipment, also producing construction and forestry machinery with precision agriculture technology.',
 'Moline', 'IL', 'US', 'enterprise', '$55.7B', 83000, 'Market Leader',
 'Precision agriculture technology leadership with autonomous and AI-driven farm equipment', 'national', 78,
 ARRAY['public', 'agriculture', 'precision-farming', 'autonomous']),

('Dow', 'dow', 'chemical-manufacturing', 'Chemical Manufacturing', 'Manufacturing — Nondurable Goods',
 'https://www.dow.com', 'Global materials science company producing plastics, industrial chemicals, and performance materials for packaging, infrastructure, and mobility.',
 'Midland', 'MI', 'US', 'enterprise', '$44.6B', 35900, 'Market Leader',
 'Scale advantage in commodity chemicals with growing specialty materials and sustainability portfolio', 'national', 60,
 ARRAY['public', 'chemicals', 'materials-science', 'sustainability']),

('Illinois Tool Works', 'illinois-tool-works', 'machinery-manufacturing', 'Machinery Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.itw.com', 'Diversified manufacturer with 85 divisions producing specialty products for automotive, construction, food equipment, and welding markets.',
 'Glenview', 'IL', 'US', 'enterprise', '$16.1B', 46000, 'Market Leader',
 'Decentralized operating model with 80/20 front-to-back process driving industry-leading margins', 'national', 58,
 ARRAY['public', 'diversified-manufacturing', 'specialty', 'high-margin']),

('Parker Hannifin', 'parker-hannifin', 'industrial-equipment-manufacturing', 'Industrial Equipment Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.parker.com', 'Global leader in motion and control technologies providing precision engineered solutions for aerospace, industrial, and filtration markets.',
 'Cleveland', 'OH', 'US', 'enterprise', '$19.1B', 55000, 'Market Leader',
 'Broadest motion and control portfolio with aftermarket revenue stream and M&A expertise', 'national', 62,
 ARRAY['public', 'motion-control', 'aerospace', 'filtration']),

('Berry Global', 'berry-global', 'plastics-rubber-products', 'Plastics & Rubber Products', 'Manufacturing — Nondurable Goods',
 'https://www.berryglobal.com', 'Global manufacturer of packaging and engineered products providing sustainable packaging solutions for healthcare, consumer, and industrial markets.',
 'Evansville', 'IN', 'US', 'enterprise', '$12.4B', 40000, 'Strong Challenger',
 'Scale in plastic packaging with growing sustainable and recycled content portfolio', 'national', 48,
 ARRAY['public', 'packaging', 'plastics', 'sustainability']),

('Steelcase', 'steelcase', 'furniture-manufacturing', 'Furniture Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.steelcase.com', 'Global office furniture and workspace solutions company designing products and spaces that support employee wellbeing and collaboration.',
 'Grand Rapids', 'MI', 'US', 'upper_mid', '$3.2B', 11500, 'Market Leader',
 'Leading workplace design firm with research-backed approach to hybrid work environments', 'national', 55,
 ARRAY['public', 'office-furniture', 'workplace-design', 'hybrid-work']),

('Siemens', 'siemens', 'industrial-equipment-manufacturing', 'Industrial Equipment Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.siemens.com', 'German industrial conglomerate with leading positions in industrial automation, smart infrastructure, digital industries, and mobility.',
 'Munich', '', 'DE', 'enterprise', '$80B', 320000, 'Market Leader',
 'Global leader in industrial automation and digital factory with Xcelerator platform', 'international', 82,
 ARRAY['public', 'industrial-automation', 'digital-factory', 'german']),

('Toyota Motor', 'toyota', 'automotive-manufacturing', 'Automotive Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.toyota.com', 'World''s largest automaker by volume producing vehicles across all segments with leadership in hybrid technology and the Toyota Production System.',
 'Toyota City', '', 'JP', 'enterprise', '$275B', 372000, 'Market Leader',
 'Lean manufacturing excellence with diversified powertrain strategy and global scale', 'international', 68,
 ARRAY['public', 'automotive', 'hybrid', 'japanese', 'lean-manufacturing']),

('Airbus', 'airbus', 'aerospace-defense-manufacturing', 'Aerospace & Defense Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.airbus.com', 'European multinational aerospace corporation and one of two major commercial aircraft manufacturers, also producing helicopters and defense systems.',
 'Leiden', '', 'NL', 'enterprise', '$75B', 134000, 'Market Leader',
 'Duopoly position in commercial aviation with record backlog and growing defense presence', 'international', 72,
 ARRAY['public', 'aerospace', 'commercial-aviation', 'european', 'defense']),

-- ═══════════════════════════════════════════════════════════════════════════
-- TRANSPORTATION & LOGISTICS (8 companies)
-- ═══════════════════════════════════════════════════════════════════════════

('J.B. Hunt Transport', 'jb-hunt', 'trucking-freight', 'Trucking & Freight', 'Transportation & Logistics',
 'https://www.jbhunt.com', 'One of the largest transportation and logistics companies in North America with intermodal, dedicated, and brokerage services.',
 'Lowell', 'AR', 'US', 'enterprise', '$12.8B', 35000, 'Market Leader',
 'Largest intermodal provider with technology-driven J.B. Hunt 360 platform', 'national', 68,
 ARRAY['public', 'intermodal', 'trucking', 'logistics-tech']),

('XPO', 'xpo', 'trucking-freight', 'Trucking & Freight', 'Transportation & Logistics',
 'https://www.xpo.com', 'Leading North American LTL carrier focused on technology-driven freight transportation with 600+ terminals.',
 'Greenwich', 'CT', 'US', 'enterprise', '$7.7B', 38000, 'Strong Challenger',
 'Technology-forward LTL carrier with AI-optimized network and strong service metrics', 'national', 72,
 ARRAY['public', 'ltl', 'trucking', 'technology']),

('Delta Air Lines', 'delta-air-lines', 'air-transportation', 'Air Transportation', 'Transportation & Logistics',
 'https://www.delta.com', 'Major US airline operating the world''s largest hub at Atlanta''s Hartsfield-Jackson with premium-focused strategy and SkyMiles loyalty.',
 'Atlanta', 'GA', 'US', 'enterprise', '$58B', 100000, 'Market Leader',
 'Premium brand with operational excellence and strongest balance sheet among US carriers', 'local', 68,
 ARRAY['public', 'airline', 'premium', 'atlanta-hub']),

('FedEx', 'fedex', 'last-mile-delivery', 'Last-Mile Delivery', 'Transportation & Logistics',
 'https://www.fedex.com', 'Global courier delivery and logistics company providing express, ground, freight, and e-commerce services across 220+ countries.',
 'Memphis', 'TN', 'US', 'enterprise', '$87B', 500000, 'Market Leader',
 'Integrated air-ground global delivery network with DRIVE transformation program', 'national', 65,
 ARRAY['public', 'express', 'logistics', 'global', 'transformation']),

('Union Pacific', 'union-pacific', 'rail-transportation', 'Rail Transportation', 'Transportation & Logistics',
 'https://www.up.com', 'One of America''s leading freight railroads operating 32,000+ route miles across 23 western states connecting to all major West Coast ports.',
 'Omaha', 'NE', 'US', 'enterprise', '$24.1B', 30000, 'Market Leader',
 'Dominant western US rail network with irreplaceable right-of-way infrastructure', 'national', 58,
 ARRAY['public', 'railroad', 'freight', 'infrastructure']),

('Flexport', 'flexport', 'third-party-logistics', 'Third-Party Logistics', 'Transportation & Logistics',
 'https://www.flexport.com', 'Technology-driven freight forwarder providing end-to-end supply chain logistics with real-time visibility and data analytics.',
 'San Francisco', 'CA', 'US', 'mid_market', '$1.5B', 3000, 'Emerging Player',
 'Modern tech-first freight forwarding platform disrupting traditional supply chain intermediaries', 'national', 88,
 ARRAY['venture-backed', 'freight-forwarding', 'tech-platform', 'supply-chain']),

('Maersk', 'maersk', 'maritime-shipping', 'Maritime Shipping', 'Transportation & Logistics',
 'https://www.maersk.com', 'Danish integrated logistics company and world''s second-largest container shipping line with end-to-end supply chain solutions.',
 'Copenhagen', '', 'DK', 'enterprise', '$51B', 100000, 'Market Leader',
 'Integrated end-to-end logistics with dominant ocean shipping and growing landside logistics', 'international', 68,
 ARRAY['public', 'container-shipping', 'logistics', 'danish', 'integrated']),

('DHL Group', 'dhl-group', 'last-mile-delivery', 'Last-Mile Delivery', 'Transportation & Logistics',
 'https://www.dhl.com', 'German logistics company and world''s largest courier company providing express, freight, supply chain, and e-commerce logistics globally.',
 'Bonn', '', 'DE', 'enterprise', '$88B', 590000, 'Market Leader',
 'Most global logistics network with presence in 220+ countries and strong e-commerce capabilities', 'international', 65,
 ARRAY['public', 'express', 'logistics', 'german', 'global']),

-- ═══════════════════════════════════════════════════════════════════════════
-- FINANCIAL SERVICES (8 companies)
-- ═══════════════════════════════════════════════════════════════════════════

('JPMorgan Chase', 'jpmorgan-chase', 'commercial-banking', 'Commercial Banking', 'Financial Services',
 'https://www.jpmorganchase.com', 'Largest US bank by assets providing investment banking, commercial banking, asset management, and consumer banking services globally.',
 'New York', 'NY', 'US', 'enterprise', '$154B', 310000, 'Market Leader',
 'Scale and technology advantage with $16B annual tech spend and dominant investment banking franchise', 'national', 82,
 ARRAY['public', 'universal-bank', 'investment-banking', 'tech-forward']),

('Stripe', 'stripe', 'fintech-services', 'Fintech Services', 'Financial Services',
 'https://www.stripe.com', 'Technology company building economic infrastructure for the internet, providing payment processing, billing, and financial tools for businesses.',
 'San Francisco', 'CA', 'US', 'enterprise', '$5B', 8000, 'Market Leader',
 'Developer-first payments platform with expanding financial infrastructure suite', 'national', 95,
 ARRAY['privately-held', 'payments', 'developer-tools', 'infrastructure']),

('Markel Group', 'markel-group', 'insurance-carriers', 'Insurance Carriers', 'Financial Services',
 'https://www.markel.com', 'Specialty insurance holding company providing excess and surplus lines insurance, reinsurance, and investment management services.',
 'Glen Allen', 'VA', 'US', 'enterprise', '$15.6B', 20000, 'Strong Challenger',
 'Specialty insurance expertise with Berkshire-style investment and Markel Ventures operating businesses', 'national', 50,
 ARRAY['public', 'specialty-insurance', 'e-and-s', 'conglomerate']),

('BlackRock', 'blackrock', 'asset-management', 'Asset Management', 'Financial Services',
 'https://www.blackrock.com', 'World''s largest asset manager with $10T+ AUM operating Aladdin risk management platform and iShares ETF franchise.',
 'New York', 'NY', 'US', 'enterprise', '$19.4B', 19000, 'Market Leader',
 'Dominant asset management platform with Aladdin technology serving institutional investors globally', 'national', 85,
 ARRAY['public', 'asset-management', 'etf', 'fintech-platform']),

('Coinbase', 'coinbase', 'fintech-services', 'Fintech Services', 'Financial Services',
 'https://www.coinbase.com', 'Largest US cryptocurrency exchange platform providing trading, custody, and staking services for retail and institutional clients.',
 'San Francisco', 'CA', 'US', 'upper_mid', '$3.1B', 3400, 'Market Leader',
 'Most trusted US crypto platform with regulatory-first approach and institutional custody', 'national', 90,
 ARRAY['public', 'crypto', 'exchange', 'institutional-custody']),

('Revolut', 'revolut', 'fintech-services', 'Fintech Services', 'Financial Services',
 'https://www.revolut.com', 'British fintech company offering banking, crypto, stock trading, and cross-border payments through a mobile app with 40M+ customers.',
 'London', '', 'GB', 'upper_mid', '$2.2B', 8000, 'Strong Challenger',
 'All-in-one fintech app disrupting traditional banking across 35+ countries', 'international', 90,
 ARRAY['privately-held', 'neobank', 'crypto', 'british', 'high-growth']),

('Nubank', 'nubank', 'fintech-services', 'Fintech Services', 'Financial Services',
 'https://www.nu.com.br', 'Brazilian digital bank and largest neobank in the world outside China with 100M+ customers across Brazil, Mexico, and Colombia.',
 'Sao Paulo', '', 'BR', 'enterprise', '$8.0B', 8000, 'Market Leader',
 'Dominant Latin American neobank with lowest cost-to-serve and massive customer base', 'international', 85,
 ARRAY['public', 'neobank', 'latin-america', 'brazilian', 'mobile-first']),

('Razorpay', 'razorpay', 'payment-processing', 'Payment Processing', 'Financial Services',
 'https://www.razorpay.com', 'Indian fintech company providing payment gateway, business banking, and lending solutions for businesses of all sizes in India.',
 'Bangalore', '', 'IN', 'mid_market', '$500M', 3000, 'Market Leader',
 'Dominant Indian payment gateway with expanding business banking and lending stack', 'international', 82,
 ARRAY['privately-held', 'payments', 'indian', 'business-banking']),

-- ═══════════════════════════════════════════════════════════════════════════
-- MEDIA, TELECOM & ENTERTAINMENT (8 companies)
-- ═══════════════════════════════════════════════════════════════════════════

('Netflix', 'netflix', 'cable-streaming-media', 'Cable & Streaming Media', 'Telecommunications & Media',
 'https://www.netflix.com', 'World''s largest streaming entertainment service with 280M+ subscribers in 190+ countries producing award-winning original content.',
 'Los Gatos', 'CA', 'US', 'enterprise', '$33.7B', 13000, 'Market Leader',
 'Largest streaming platform with unmatched content spend and global distribution advantage', 'national', 90,
 ARRAY['public', 'streaming', 'content', 'global', 'ad-tier']),

('T-Mobile', 't-mobile', 'wireless-telecom', 'Wireless Telecommunications', 'Telecommunications & Media',
 'https://www.t-mobile.com', 'Third-largest US wireless carrier with fastest-growing subscriber base and leading 5G network coverage using mid-band spectrum advantage.',
 'Bellevue', 'WA', 'US', 'enterprise', '$80.1B', 71000, 'Strong Challenger',
 'Fastest 5G network build-out with mid-band spectrum advantage and subscriber momentum', 'national', 72,
 ARRAY['public', 'wireless', '5g', 'telecom']),

('Roblox', 'roblox', 'gaming-interactive-media', 'Gaming & Interactive Media', 'Technology & Digital Economy',
 'https://www.roblox.com', 'Online platform hosting millions of user-created 3D experiences, primarily popular with Gen Z and Gen Alpha users with virtual economy and social features.',
 'San Mateo', 'CA', 'US', 'upper_mid', '$2.7B', 2100, 'Market Leader',
 'Dominant user-generated gaming platform with massive young audience and virtual economy', 'national', 88,
 ARRAY['public', 'gaming', 'ugc', 'metaverse', 'gen-z']),

('Warner Bros Discovery', 'warner-bros-discovery', 'film-video-production', 'Film & Video Production', 'Telecommunications & Media',
 'https://www.wbd.com', 'Global media and entertainment company operating Warner Bros studio, HBO, CNN, Discovery channels, and Max streaming platform.',
 'New York', 'NY', 'US', 'enterprise', '$41.3B', 35000, 'Strong Challenger',
 'Unmatched content library across film, TV, and news with Max streaming platform', 'national', 62,
 ARRAY['public', 'media', 'studio', 'streaming', 'news']),

('iHeartMedia', 'iheartmedia', 'broadcasting', 'Broadcasting', 'Telecommunications & Media',
 'https://www.iheartmedia.com', 'Largest radio broadcasting company in the US operating 860 stations with growing digital and podcasting businesses.',
 'San Antonio', 'TX', 'US', 'upper_mid', '$3.9B', 10000, 'Market Leader',
 'Dominant US radio platform with growing digital audio and podcasting ecosystem', 'national', 55,
 ARRAY['public', 'radio', 'broadcasting', 'podcasting', 'digital-audio']),

('Comcast', 'comcast', 'wired-telecom', 'Wired Telecommunications', 'Telecommunications & Media',
 'https://www.comcast.com', 'Global media and technology company operating Xfinity broadband, NBCUniversal, and Sky businesses with 33M broadband subscribers.',
 'Philadelphia', 'PA', 'US', 'enterprise', '$121B', 186000, 'Market Leader',
 'Dominant US broadband provider with integrated content and theme park businesses', 'national', 68,
 ARRAY['public', 'broadband', 'media', 'content', 'theme-parks']),

('Universal Music Group', 'universal-music', 'music-production', 'Music Production & Publishing', 'Telecommunications & Media',
 'https://www.universalmusic.com', 'World''s largest music company representing artists including Taylor Swift, Drake, and Billie Eilish with labels including Interscope, Republic, and Def Jam.',
 'Santa Monica', 'CA', 'US', 'enterprise', '$12B', 10000, 'Market Leader',
 'Largest music catalog and artist roster with AI licensing and superfan platform strategy', 'international', 65,
 ARRAY['public', 'music', 'labels', 'publishing', 'global']),

('Vivendi', 'vivendi', 'film-video-production', 'Film & Video Production', 'Telecommunications & Media',
 'https://www.vivendi.com', 'French media conglomerate operating Canal+, Havas advertising, Gameloft gaming, and Prisma Media publishing.',
 'Paris', '', 'FR', 'enterprise', '$10.5B', 39000, 'Strong Challenger',
 'Diversified European media conglomerate with pay-TV and advertising scale', 'international', 55,
 ARRAY['public', 'media-conglomerate', 'advertising', 'french']),

-- ═══════════════════════════════════════════════════════════════════════════
-- RETAIL & WHOLESALE (10 companies)
-- ═══════════════════════════════════════════════════════════════════════════

('Walmart', 'walmart', 'big-box-retailers', 'Big Box Retailers', 'Retail Trade',
 'https://www.walmart.com', 'World''s largest company by revenue operating 10,500+ stores and clubs worldwide with growing e-commerce and advertising businesses.',
 'Bentonville', 'AR', 'US', 'enterprise', '$648B', 2100000, 'Market Leader',
 'Unmatched physical retail scale with growing digital ecosystem including Walmart Connect ads', 'national', 72,
 ARRAY['public', 'mass-retail', 'ecommerce', 'advertising', 'global']),

('Chewy', 'chewy', 'ecommerce-retail', 'E-commerce Retail', 'Retail Trade',
 'https://www.chewy.com', 'Online retailer of pet food, treats, and supplies with autoship subscription model and growing veterinary services business.',
 'Dania Beach', 'FL', 'US', 'enterprise', '$11.2B', 20000, 'Market Leader',
 'Dominant pet e-commerce with best-in-class customer service and autoship loyalty', 'national', 75,
 ARRAY['public', 'pet', 'ecommerce', 'subscription', 'autoship']),

('Publix', 'publix', 'grocery-stores', 'Grocery Stores', 'Retail Trade',
 'https://www.publix.com', 'Largest employee-owned grocery chain in the US operating 1,300+ supermarkets across the Southeast with legendary customer service.',
 'Lakeland', 'FL', 'US', 'enterprise', '$57B', 255000, 'Regional Leader',
 'Employee ownership culture driving highest customer satisfaction in grocery retail', 'local', 48,
 ARRAY['employee-owned', 'grocery', 'southeast', 'customer-service']),

('Five Below', 'five-below', 'specialty-retail', 'Specialty Retail', 'Retail Trade',
 'https://www.fivebelow.com', 'Discount retailer targeting teens and pre-teens with products priced at $5 and below (with some items up to $25) in trend-right categories.',
 'Philadelphia', 'PA', 'US', 'upper_mid', '$3.5B', 22000, 'Strong Challenger',
 'Unique teen-focused value proposition with strong store unit economics and growth runway', 'national', 42,
 ARRAY['public', 'value-retail', 'teen', 'high-growth']),

('AutoZone', 'autozone', 'specialty-retail', 'Specialty Retail', 'Retail Trade',
 'https://www.autozone.com', 'Largest auto parts retailer in the Americas with 7,000+ stores providing parts, accessories, and diagnostic services for DIY and professional customers.',
 'Memphis', 'TN', 'US', 'enterprise', '$17.5B', 110000, 'Market Leader',
 'Dominant auto parts retailer with growing commercial (DIFM) business and supply chain advantage', 'national', 55,
 ARRAY['public', 'auto-parts', 'retail', 'commercial-growth']),

('McKesson', 'mckesson', 'pharmaceutical-wholesalers', 'Pharmaceutical Wholesalers', 'Wholesale Trade',
 'https://www.mckesson.com', 'Largest pharmaceutical distributor in North America providing drug distribution, medical supplies, and health IT solutions.',
 'Irving', 'TX', 'US', 'enterprise', '$309B', 51000, 'Market Leader',
 'Scale advantage in pharmaceutical distribution with growing specialty drug and oncology capabilities', 'national', 65,
 ARRAY['public', 'pharmaceutical', 'distribution', 'specialty-drugs']),

('Sysco', 'sysco', 'food-beverage-wholesalers', 'Food & Beverage Wholesalers', 'Wholesale Trade',
 'https://www.sysco.com', 'World''s largest food distribution company serving restaurants, healthcare, hospitality, and education with 700K+ customers.',
 'Houston', 'TX', 'US', 'enterprise', '$76B', 72000, 'Market Leader',
 'Dominant foodservice distribution with unmatched route density and product breadth', 'national', 55,
 ARRAY['public', 'foodservice', 'distribution', 'restaurants']),

('Wawa', 'wawa', 'convenience-stores', 'Convenience Stores', 'Retail Trade',
 'https://www.wawa.com', 'Privately held convenience store chain with 1,000+ locations across the East Coast known for made-to-order hoagies and fresh food.',
 'Wawa', 'PA', 'US', 'enterprise', '$17B', 47000, 'Regional Leader',
 'Cult-like brand loyalty with fresh food differentiation and employee ownership culture', 'national', 52,
 ARRAY['privately-held', 'convenience', 'fresh-food', 'employee-owned']),

('ALDI US', 'aldi-us', 'grocery-stores', 'Grocery Stores', 'Retail Trade',
 'https://www.aldi.us', 'German-owned discount grocery chain rapidly expanding in the US with 2,300+ stores focused on private-label products and efficiency.',
 'Batavia', 'IL', 'US', 'enterprise', '$19B', 45000, 'Strong Challenger',
 'Ultra-efficient discount grocery model with 90% private-label and aggressive US expansion', 'national', 42,
 ARRAY['privately-held', 'discount-grocery', 'private-label', 'german-owned']),

('Inditex', 'inditex', 'apparel-manufacturing', 'Apparel Manufacturing', 'Manufacturing — Nondurable Goods',
 'https://www.inditex.com', 'Spanish multinational fashion group operating Zara, Massimo Dutti, and Pull&Bear with industry-leading fast fashion supply chain.',
 'Arteixo', '', 'ES', 'enterprise', '$38B', 165000, 'Market Leader',
 'Fastest fashion supply chain with 2-week design-to-store capability and global retail scale', 'international', 65,
 ARRAY['public', 'fast-fashion', 'retail', 'spanish', 'supply-chain']),

-- ═══════════════════════════════════════════════════════════════════════════
-- TECHNOLOGY (additional — filling gaps in AI, data, dev tools) (10 companies)
-- ═══════════════════════════════════════════════════════════════════════════

('Anthropic', 'anthropic', 'ai-platforms', 'AI Platforms', 'Technology & Digital Economy',
 'https://www.anthropic.com', 'AI safety company building Claude, a family of AI assistants focused on being helpful, harmless, and honest with Constitutional AI approach.',
 'San Francisco', 'CA', 'US', 'mid_market', '$900M', 1000, 'Strong Challenger',
 'Safety-focused AI lab with Claude models competitive at the frontier of AI capability', 'national', 98,
 ARRAY['venture-backed', 'ai-safety', 'llm', 'frontier-ai']),

('Databricks', 'databricks', 'cloud-infrastructure', 'Cloud Infrastructure Providers', 'Technology & Digital Economy',
 'https://www.databricks.com', 'Unified analytics and AI platform combining data lake and data warehouse functionality with collaborative notebooks and ML capabilities.',
 'San Francisco', 'CA', 'US', 'upper_mid', '$1.6B', 5500, 'Strong Challenger',
 'Lakehouse architecture unifying data engineering and AI with open-source Delta Lake foundation', 'national', 95,
 ARRAY['venture-backed', 'data-platform', 'ai-ml', 'open-source']),

('Cloudflare', 'cloudflare', 'cloud-infrastructure', 'Cloud Infrastructure Providers', 'Technology & Digital Economy',
 'https://www.cloudflare.com', 'Edge cloud platform providing CDN, security, and serverless computing with a global network spanning 300+ cities.',
 'San Francisco', 'CA', 'US', 'upper_mid', '$1.5B', 3700, 'Strong Challenger',
 'Global edge network with developer platform disrupting traditional CDN and security markets', 'national', 92,
 ARRAY['public', 'edge-cloud', 'security', 'developer-platform']),

('MongoDB', 'mongodb', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.mongodb.com', 'Database platform company providing the most popular NoSQL document database as both self-managed and Atlas cloud database-as-a-service.',
 'New York', 'NY', 'US', 'upper_mid', '$1.7B', 5200, 'Market Leader',
 'Dominant document database with Atlas cloud service driving strong growth and developer adoption', 'national', 90,
 ARRAY['public', 'database', 'developer-tools', 'cloud-native']),

('GitLab', 'gitlab', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.gitlab.com', 'DevSecOps platform providing source code management, CI/CD, security scanning, and AI-powered code suggestions in a single application.',
 'San Francisco', 'CA', 'US', 'mid_market', '$580M', 2100, 'Strong Challenger',
 'Single-platform DevSecOps covering the entire software development lifecycle with AI features', 'national', 92,
 ARRAY['public', 'devsecops', 'developer-tools', 'ai-code', 'remote-first']),

('Twilio', 'twilio', 'saas-providers', 'SaaS Providers', 'Technology & Digital Economy',
 'https://www.twilio.com', 'Cloud communications platform providing APIs for SMS, voice, video, email, and customer engagement with AI-powered Segment CDP.',
 'San Francisco', 'CA', 'US', 'upper_mid', '$4.0B', 5500, 'Market Leader',
 'Dominant CPaaS platform with expanding customer data and AI engagement capabilities', 'national', 88,
 ARRAY['public', 'cpaas', 'apis', 'customer-data', 'ai']),

('Elastic', 'elastic', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.elastic.co', 'Search AI company providing Elasticsearch, Kibana, and Elastic Cloud for enterprise search, observability, and security analytics.',
 'San Francisco', 'CA', 'US', 'upper_mid', '$1.3B', 3400, 'Market Leader',
 'De facto standard for enterprise search with expanding AI-powered search and observability', 'national', 85,
 ARRAY['public', 'search', 'observability', 'open-source', 'ai-search']),

('UiPath', 'uipath', 'ai-platforms', 'AI Platforms', 'Technology & Digital Economy',
 'https://www.uipath.com', 'Enterprise automation platform providing robotic process automation, AI, and business automation for back-office and operational workflows.',
 'New York', 'NY', 'US', 'upper_mid', '$1.3B', 4100, 'Market Leader',
 'Leading enterprise RPA platform expanding into AI-driven process automation and mining', 'national', 88,
 ARRAY['public', 'rpa', 'automation', 'ai-agents', 'process-mining']),

('HashiCorp', 'hashicorp', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.hashicorp.com', 'Infrastructure automation company providing Terraform, Vault, Consul, and Nomad tools for multi-cloud provisioning and security.',
 'San Francisco', 'CA', 'US', 'mid_market', '$583M', 2200, 'Market Leader',
 'De facto standard for infrastructure-as-code with Terraform and multi-cloud management', 'national', 92,
 ARRAY['ibm-acquired', 'infrastructure-as-code', 'multi-cloud', 'open-source']),

('Confluent', 'confluent', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.confluent.io', 'Data streaming platform built on Apache Kafka providing real-time data processing and event-driven architecture for enterprises.',
 'Mountain View', 'CA', 'US', 'mid_market', '$780M', 2900, 'Market Leader',
 'Dominant data streaming platform with managed Kafka and expanding AI/ML streaming capabilities', 'national', 90,
 ARRAY['public', 'data-streaming', 'kafka', 'event-driven', 'real-time'])

ON CONFLICT (slug) DO NOTHING;
