-- ============================================================================
-- VIGYL Seed Data: ~85 Real Companies
-- Mix of Georgia-local, national, and international companies
-- ============================================================================

INSERT INTO companies (name, slug, industry_slug, industry_name, sector, website_url, description,
  headquarters_city, headquarters_state, headquarters_country, revenue_tier, annual_revenue_estimate,
  employee_count_estimate, market_position, competitive_advantage, scope, ai_readiness_score, tags)
VALUES

-- ═══════════════════════════════════════════════════════════════════════════
-- GEORGIA-LOCAL (~20 companies)
-- ═══════════════════════════════════════════════════════════════════════════

('Chick-fil-A', 'chick-fil-a', 'food-processing', 'Food Processing', 'Manufacturing — Nondurable Goods',
 'https://www.chick-fil-a.com', 'Privately held fast-food chain specializing in chicken sandwiches, known for operator-driven franchise model and industry-leading customer satisfaction scores.',
 'Atlanta', 'GA', 'US', 'enterprise', '$6.8B', 36000, 'Market Leader',
 'Franchise operator model with highest per-unit revenue in fast food', 'local', 62,
 ARRAY['franchise', 'privately-held', 'high-growth', 'food-service']),

('NCR Voyix', 'ncr-voyix', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.ncrvoyix.com', 'Commerce platform company providing software and services for restaurants, retail, and digital banking after 2023 spin-off from NCR Corporation.',
 'Atlanta', 'GA', 'US', 'upper_mid', '$3.5B', 16000, 'Strong Challenger',
 'Deep domain expertise in restaurant and retail POS with digital banking platform', 'local', 75,
 ARRAY['public', 'spin-off', 'fintech', 'restaurant-tech']),

('Aflac', 'aflac', 'insurance-carriers', 'Insurance Carriers', 'Financial Services',
 'https://www.aflac.com', 'Leading supplemental insurance provider in the US and Japan, known for direct-to-consumer supplemental health and life insurance products.',
 'Columbus', 'GA', 'US', 'enterprise', '$19.5B', 12000, 'Market Leader',
 'Dominant position in supplemental insurance with strong brand recognition', 'local', 55,
 ARRAY['public', 'insurance', 'japan-operations', 'supplemental-health']),

('Gulfstream Aerospace', 'gulfstream-aerospace', 'aerospace-defense-manufacturing', 'Aerospace & Defense Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.gulfstream.com', 'Designs and manufactures business jet aircraft, a subsidiary of General Dynamics with advanced avionics and long-range capabilities.',
 'Savannah', 'GA', 'US', 'enterprise', '$9.2B', 18000, 'Market Leader',
 'Premium brand in large-cabin business aviation with technology leadership', 'local', 70,
 ARRAY['defense', 'subsidiary', 'premium-brand', 'manufacturing']),

('SouthState Bank', 'southstate-bank', 'commercial-banking', 'Commercial Banking', 'Financial Services',
 'https://www.southstatebank.com', 'Regional community bank serving the Southeast US with commercial banking, wealth management, and mortgage services.',
 'Winter Haven', 'FL', 'US', 'mid_market', '$780M', 5200, 'Regional Leader',
 'Strong community banking presence across the Southeast with personal service model', 'local', 45,
 ARRAY['regional-bank', 'community-banking', 'southeast', 'public']),

('Inspire Brands', 'inspire-brands', 'food-processing', 'Food Processing', 'Manufacturing — Nondurable Goods',
 'https://www.inspirebrands.com', 'Multi-brand restaurant company operating Arby''s, Buffalo Wild Wings, Sonic Drive-In, Jimmy John''s, and Dunkin'' with 32,000+ locations.',
 'Atlanta', 'GA', 'US', 'enterprise', '$27B', 650000, 'Market Leader',
 'Scale advantage with complementary daypart brands and shared digital infrastructure', 'local', 68,
 ARRAY['privately-held', 'multi-brand', 'restaurant', 'pe-backed']),

('Floor & Decor', 'floor-and-decor', 'home-improvement-retail', 'Home Improvement Retail', 'Retail Trade',
 'https://www.flooranddecor.com', 'Specialty retailer of hard surface flooring and related accessories operating 200+ warehouse-format stores across the US.',
 'Atlanta', 'GA', 'US', 'upper_mid', '$4.3B', 15000, 'Strong Challenger',
 'Warehouse-format stores with direct-from-manufacturer sourcing model', 'local', 50,
 ARRAY['public', 'specialty-retail', 'high-growth', 'warehouse-format']),

('Graphic Packaging', 'graphic-packaging', 'printing-packaging', 'Printing & Packaging', 'Manufacturing — Nondurable Goods',
 'https://www.graphicpkg.com', 'Leading provider of sustainable consumer packaging solutions, producing paperboard packaging for food, beverage, and consumer products.',
 'Atlanta', 'GA', 'US', 'upper_mid', '$9.4B', 24000, 'Market Leader',
 'Vertically integrated from forest to finished paperboard packaging', 'local', 58,
 ARRAY['public', 'sustainability', 'consumer-packaging', 'integrated']),

('Synovus Financial', 'synovus-financial', 'commercial-banking', 'Commercial Banking', 'Financial Services',
 'https://www.synovus.com', 'Financial services company providing commercial and retail banking, wealth management, and treasury services across the Southeast.',
 'Columbus', 'GA', 'US', 'mid_market', '$2.1B', 5300, 'Regional Leader',
 'Deep Southeast relationships with focus on commercial and wealth management', 'local', 50,
 ARRAY['public', 'regional-bank', 'wealth-management', 'southeast']),

('Calendly', 'calendly', 'saas-providers', 'SaaS Providers', 'Technology & Digital Economy',
 'https://www.calendly.com', 'Scheduling automation platform used by millions of professionals and organizations to simplify meeting scheduling across time zones and tools.',
 'Atlanta', 'GA', 'US', 'mid_market', '$350M', 700, 'Market Leader',
 'Category-defining scheduling platform with strong freemium flywheel and enterprise growth', 'local', 90,
 ARRAY['saas', 'plg', 'freemium', 'high-growth', 'venture-backed']),

('Cardlytics', 'cardlytics', 'digital-advertising', 'Digital Advertising', 'Technology & Digital Economy',
 'https://www.cardlytics.com', 'Purchase intelligence platform that partners with banks to deliver targeted marketing to consumers based on actual purchase data.',
 'Atlanta', 'GA', 'US', 'mid_market', '$275M', 600, 'Niche Specialist',
 'Unique access to anonymized bank transaction data for advertising targeting', 'local', 78,
 ARRAY['public', 'adtech', 'data-platform', 'bank-partnerships']),

('Kabbage (American Express)', 'kabbage-amex', 'fintech-services', 'Fintech Services', 'Financial Services',
 'https://www.kabbage.com', 'Automated small business lending and cash flow management platform, acquired by American Express in 2020.',
 'Atlanta', 'GA', 'US', 'mid_market', '$200M', 500, 'Strong Challenger',
 'AI-driven automated underwriting for small business lending', 'local', 85,
 ARRAY['fintech', 'acquired', 'small-business', 'ai-lending']),

('Manhattan Associates', 'manhattan-associates', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.manh.com', 'Supply chain and omnichannel solutions provider offering warehouse management, transportation management, and point-of-sale technology.',
 'Atlanta', 'GA', 'US', 'upper_mid', '$928M', 4400, 'Market Leader',
 'Best-in-class warehouse management and supply chain optimization software', 'local', 80,
 ARRAY['public', 'supply-chain', 'wms', 'enterprise-software']),

('EzCater', 'ezcater', 'ecommerce-retail', 'E-commerce Retail', 'Retail Trade',
 'https://www.ezcater.com', 'Online marketplace connecting businesses with local caterers and restaurants for corporate food solutions and workplace catering.',
 'Atlanta', 'GA', 'US', 'mid_market', '$300M', 800, 'Market Leader',
 'Dominant B2B catering marketplace with strong restaurant network effects', 'local', 72,
 ARRAY['marketplace', 'venture-backed', 'b2b', 'food-tech']),

('Greenlight Financial Technology', 'greenlight', 'fintech-services', 'Fintech Services', 'Financial Services',
 'https://www.greenlight.com', 'Family finance platform offering debit cards, investing, and financial literacy tools for kids, teens, and parents.',
 'Atlanta', 'GA', 'US', 'growth', '$100M', 500, 'Strong Challenger',
 'First-mover in family fintech with strong engagement and retention metrics', 'local', 82,
 ARRAY['fintech', 'venture-backed', 'consumer', 'family-finance']),

('InComm Payments', 'incomm-payments', 'payment-processing', 'Payment Processing', 'Financial Services',
 'https://www.incomm.com', 'Global payments technology company providing prepaid products, gift card solutions, and digital payment technologies.',
 'Atlanta', 'GA', 'US', 'upper_mid', '$1.2B', 3000, 'Strong Challenger',
 'Leading prepaid and gift card processing with extensive retail distribution', 'local', 65,
 ARRAY['privately-held', 'payments', 'prepaid', 'gift-cards']),

('Insight Global', 'insight-global', 'it-consulting-services', 'IT Consulting Services', 'Technology & Digital Economy',
 'https://www.insightglobal.com', 'Staffing and managed services company specializing in IT, accounting, finance, engineering, and government services.',
 'Atlanta', 'GA', 'US', 'upper_mid', '$4.2B', 14000, 'Strong Challenger',
 'Large-scale IT staffing with strong culture and consultant retention', 'local', 55,
 ARRAY['privately-held', 'staffing', 'it-services', 'high-growth']),

('Novelis', 'novelis', 'aluminum-production', 'Aluminum Production', 'Manufacturing — Durable Goods',
 'https://www.novelis.com', 'World leader in aluminum rolling and recycling, producing flat-rolled aluminum for automotive, beverage can, and specialty markets.',
 'Atlanta', 'GA', 'US', 'enterprise', '$18.5B', 13000, 'Market Leader',
 'Global leader in aluminum recycling with closed-loop sustainability model', 'local', 60,
 ARRAY['subsidiary', 'sustainability', 'recycling', 'automotive-supplier']),

('Genuine Parts Company', 'genuine-parts', 'durable-goods-wholesalers', 'Durable Goods Wholesalers', 'Wholesale Trade',
 'https://www.genpt.com', 'Distributor of automotive and industrial replacement parts through NAPA Auto Parts and Motion Industries networks.',
 'Atlanta', 'GA', 'US', 'enterprise', '$23.1B', 58000, 'Market Leader',
 'Massive distribution network with NAPA brand and industrial parts expertise', 'local', 52,
 ARRAY['public', 'distribution', 'automotive-parts', 'industrial']),

('Global Payments', 'global-payments', 'payment-processing', 'Payment Processing', 'Financial Services',
 'https://www.globalpayments.com', 'Worldwide provider of payment technology and software solutions for merchants, issuers, and financial institutions.',
 'Atlanta', 'GA', 'US', 'enterprise', '$9.7B', 27000, 'Market Leader',
 'Integrated payments and software with global merchant acquiring capabilities', 'local', 75,
 ARRAY['public', 'payments', 'merchant-services', 'global']),

-- ═══════════════════════════════════════════════════════════════════════════
-- NATIONAL (~40 companies)
-- ═══════════════════════════════════════════════════════════════════════════

('CrowdStrike', 'crowdstrike', 'cybersecurity-services', 'Cybersecurity Services', 'Technology & Digital Economy',
 'https://www.crowdstrike.com', 'Cloud-native cybersecurity platform delivering endpoint protection, threat intelligence, and incident response via the Falcon platform.',
 'Austin', 'TX', 'US', 'upper_mid', '$3.1B', 8500, 'Market Leader',
 'Cloud-native architecture with real-time AI threat detection across millions of endpoints', 'national', 95,
 ARRAY['public', 'cloud-native', 'ai-security', 'high-growth']),

('Datadog', 'datadog', 'saas-providers', 'SaaS Providers', 'Technology & Digital Economy',
 'https://www.datadoghq.com', 'Cloud monitoring and security platform providing observability for cloud-scale applications, infrastructure, and logs.',
 'New York', 'NY', 'US', 'upper_mid', '$2.1B', 5500, 'Market Leader',
 'Unified observability platform with strong land-and-expand model', 'national', 92,
 ARRAY['public', 'observability', 'cloud-native', 'developer-tools']),

('Toast', 'toast-pos', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.toasttab.com', 'Cloud-based restaurant management platform providing POS, online ordering, payroll, and team management for food service businesses.',
 'Boston', 'MA', 'US', 'upper_mid', '$3.9B', 5000, 'Market Leader',
 'Purpose-built restaurant platform with integrated payments and strong SMB penetration', 'national', 82,
 ARRAY['public', 'restaurant-tech', 'fintech', 'vertical-saas']),

('Palantir Technologies', 'palantir', 'ai-platforms', 'AI Platforms', 'Technology & Digital Economy',
 'https://www.palantir.com', 'Data analytics and AI platform company serving government and commercial clients with Gotham, Foundry, and AIP platforms.',
 'Denver', 'CO', 'US', 'upper_mid', '$2.2B', 3700, 'Niche Specialist',
 'Deep government relationships with expanding commercial AI platform', 'national', 95,
 ARRAY['public', 'government', 'ai-platform', 'defense']),

('Rivian', 'rivian', 'automotive-manufacturing', 'Automotive Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.rivian.com', 'Electric vehicle manufacturer producing the R1T pickup truck, R1S SUV, and Amazon delivery vans with in-house software and hardware.',
 'Irvine', 'CA', 'US', 'upper_mid', '$4.4B', 16000, 'Emerging Player',
 'Vertically integrated EV platform with Amazon commercial fleet partnership', 'national', 88,
 ARRAY['public', 'ev', 'startup', 'amazon-partnership']),

('Snowflake', 'snowflake', 'cloud-infrastructure', 'Cloud Infrastructure Providers', 'Technology & Digital Economy',
 'https://www.snowflake.com', 'Cloud data platform enabling data warehousing, data lakes, and data sharing across AWS, Azure, and GCP.',
 'Bozeman', 'MT', 'US', 'upper_mid', '$2.8B', 7000, 'Market Leader',
 'Cross-cloud data platform with consumption-based model and data marketplace', 'national', 95,
 ARRAY['public', 'data-platform', 'cloud-native', 'data-sharing']),

('HubSpot', 'hubspot', 'saas-providers', 'SaaS Providers', 'Technology & Digital Economy',
 'https://www.hubspot.com', 'CRM platform for scaling companies providing marketing, sales, content management, and customer service software.',
 'Cambridge', 'MA', 'US', 'upper_mid', '$2.2B', 7400, 'Strong Challenger',
 'Freemium CRM with best-in-class inbound marketing and strong SMB loyalty', 'national', 88,
 ARRAY['public', 'crm', 'marketing-tech', 'plg']),

('Sweetgreen', 'sweetgreen', 'food-processing', 'Food Processing', 'Manufacturing — Nondurable Goods',
 'https://www.sweetgreen.com', 'Fast-casual restaurant chain focused on healthy food with tech-forward ordering, automated kitchen (Infinite Kitchen), and supply chain transparency.',
 'Los Angeles', 'CA', 'US', 'mid_market', '$580M', 5000, 'Strong Challenger',
 'Tech-enabled food platform with vertical integration and automation investment', 'national', 78,
 ARRAY['public', 'fast-casual', 'sustainability', 'food-tech']),

('Samsara', 'samsara', 'saas-providers', 'SaaS Providers', 'Technology & Digital Economy',
 'https://www.samsara.com', 'IoT platform for fleet management, video-based safety, and connected operations serving trucking, construction, and field services.',
 'San Francisco', 'CA', 'US', 'upper_mid', '$937M', 2700, 'Market Leader',
 'Connected operations cloud with strong hardware + software integration for physical operations', 'national', 85,
 ARRAY['public', 'iot', 'fleet-management', 'safety']),

('DraftKings', 'draftkings', 'gaming-interactive-media', 'Gaming & Interactive Media', 'Technology & Digital Economy',
 'https://www.draftkings.com', 'Digital sports entertainment and gaming company offering sports betting, daily fantasy sports, and iGaming across North America.',
 'Boston', 'MA', 'US', 'upper_mid', '$3.7B', 6500, 'Strong Challenger',
 'Technology-first sportsbook with proprietary platform and strong brand', 'national', 80,
 ARRAY['public', 'sports-betting', 'gaming', 'digital-entertainment']),

('Hims & Hers Health', 'hims-hers', 'physician-practices', 'Physician Practices', 'Healthcare & Life Sciences',
 'https://www.forhims.com', 'Telehealth platform providing personalized health and wellness products via direct-to-consumer telehealth consultations.',
 'San Francisco', 'CA', 'US', 'mid_market', '$872M', 2500, 'Strong Challenger',
 'D2C telehealth model with strong brand and subscription revenue', 'national', 80,
 ARRAY['public', 'telehealth', 'd2c', 'subscription']),

('Rocket Mortgage', 'rocket-mortgage', 'mortgage-consumer-lending', 'Mortgage & Consumer Lending', 'Financial Services',
 'https://www.rocketmortgage.com', 'Largest retail mortgage lender in the US, pioneering the fully digital mortgage application and approval process.',
 'Detroit', 'MI', 'US', 'enterprise', '$7.4B', 18000, 'Market Leader',
 'Fully digital mortgage process with AI-powered underwriting at scale', 'national', 82,
 ARRAY['public', 'digital-mortgage', 'fintech', 'ai-underwriting']),

('ServiceTitan', 'servicetitan', 'saas-providers', 'SaaS Providers', 'Technology & Digital Economy',
 'https://www.servicetitan.com', 'All-in-one software platform for home and commercial service businesses including HVAC, plumbing, electrical, and landscaping.',
 'Glendale', 'CA', 'US', 'mid_market', '$600M', 2700, 'Market Leader',
 'Dominant vertical SaaS for trades with deep workflow automation', 'national', 78,
 ARRAY['public', 'vertical-saas', 'field-service', 'recent-ipo']),

('Carvana', 'carvana', 'automobile-dealers', 'Automobile Dealers', 'Retail Trade',
 'https://www.carvana.com', 'E-commerce platform for buying, selling, and financing used cars with signature car vending machines and home delivery.',
 'Tempe', 'AZ', 'US', 'upper_mid', '$12.3B', 13000, 'Strong Challenger',
 'Fully online used car buying with proprietary inspection and reconditioning infrastructure', 'national', 75,
 ARRAY['public', 'ecommerce', 'automotive', 'turnaround']),

('Celsius Holdings', 'celsius-holdings', 'beverage-manufacturing', 'Beverage Manufacturing', 'Manufacturing — Nondurable Goods',
 'https://www.celsius.com', 'Functional fitness beverage brand producing thermogenic energy drinks positioned as healthy alternatives to traditional energy drinks.',
 'Boca Raton', 'FL', 'US', 'upper_mid', '$1.3B', 800, 'Strong Challenger',
 'Fastest-growing energy drink brand with health-conscious positioning and PepsiCo distribution', 'national', 55,
 ARRAY['public', 'beverage', 'high-growth', 'pepsi-partnership']),

('Veeva Systems', 'veeva-systems', 'saas-providers', 'SaaS Providers', 'Technology & Digital Economy',
 'https://www.veeva.com', 'Cloud computing company focused on pharmaceutical and life sciences applications including CRM, regulatory, and clinical data management.',
 'Pleasanton', 'CA', 'US', 'upper_mid', '$2.4B', 7000, 'Market Leader',
 'Dominant vertical SaaS for life sciences with high switching costs and regulatory moat', 'national', 85,
 ARRAY['public', 'vertical-saas', 'life-sciences', 'regulated-industry']),

('Duolingo', 'duolingo', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.duolingo.com', 'Language learning platform with gamified mobile app serving 100M+ monthly active users with free and subscription tiers.',
 'Pittsburgh', 'PA', 'US', 'mid_market', '$531M', 700, 'Market Leader',
 'AI-powered adaptive learning with best-in-class retention and virality', 'national', 92,
 ARRAY['public', 'edtech', 'consumer', 'ai-native', 'gamification']),

('Wiz', 'wiz', 'cybersecurity-services', 'Cybersecurity Services', 'Technology & Digital Economy',
 'https://www.wiz.io', 'Cloud security platform providing agentless cloud-native security across AWS, Azure, GCP, and multi-cloud environments.',
 'New York', 'NY', 'US', 'mid_market', '$500M', 1500, 'Strong Challenger',
 'Fastest-growing cybersecurity company with agentless cloud security approach', 'national', 95,
 ARRAY['venture-backed', 'cloud-security', 'hyper-growth', 'multi-cloud']),

('Figma', 'figma', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.figma.com', 'Collaborative design platform for UI/UX design, prototyping, and design systems used by millions of product teams worldwide.',
 'San Francisco', 'CA', 'US', 'mid_market', '$600M', 1400, 'Market Leader',
 'Browser-first collaborative design tool with massive developer and designer community', 'national', 95,
 ARRAY['venture-backed', 'design-tools', 'collaboration', 'plg']),

('Elevance Health', 'elevance-health', 'insurance-carriers', 'Insurance Carriers', 'Financial Services',
 'https://www.elevancehealth.com', 'Health benefits company serving 47M members, operating Anthem Blue Cross Blue Shield plans and Carelon health services.',
 'Indianapolis', 'IN', 'US', 'enterprise', '$171B', 100000, 'Market Leader',
 'Scale in managed care with growing health services and digital health capabilities', 'national', 65,
 ARRAY['public', 'health-insurance', 'managed-care', 'digital-health']),

('Prologis', 'prologis', 'warehousing-storage', 'Warehousing & Storage', 'Transportation & Logistics',
 'https://www.prologis.com', 'Global leader in logistics real estate, owning and operating 1.2B sq ft of distribution facilities across 19 countries.',
 'San Francisco', 'CA', 'US', 'enterprise', '$8.0B', 2600, 'Market Leader',
 'Largest industrial REIT with premium logistics locations near major population centers', 'national', 72,
 ARRAY['public', 'reit', 'logistics', 'global']),

('Kroger', 'kroger', 'grocery-stores', 'Grocery Stores', 'Retail Trade',
 'https://www.kroger.com', 'One of the largest US supermarket chains operating 2,700+ stores under Kroger, Ralphs, Harris Teeter, and other banners.',
 'Cincinnati', 'OH', 'US', 'enterprise', '$150B', 430000, 'Market Leader',
 'Scale advantage with private label brands and digital grocery infrastructure', 'national', 60,
 ARRAY['public', 'grocery', 'omnichannel', 'private-label']),

('Nucor', 'nucor', 'steel-production', 'Steel Production', 'Manufacturing — Durable Goods',
 'https://www.nucor.com', 'Largest steel producer in the US operating mini-mills with electric arc furnace technology and a decentralized management structure.',
 'Charlotte', 'NC', 'US', 'enterprise', '$35B', 31000, 'Market Leader',
 'Low-cost mini-mill model with industry-leading efficiency and decentralized culture', 'national', 58,
 ARRAY['public', 'steel', 'manufacturing', 'eaf-technology']),

('C.H. Robinson', 'ch-robinson', 'third-party-logistics', 'Third-Party Logistics', 'Transportation & Logistics',
 'https://www.chrobinson.com', 'One of the world''s largest third-party logistics providers offering multimodal freight transportation, supply chain management, and logistics services.',
 'Eden Prairie', 'MN', 'US', 'enterprise', '$17.6B', 14600, 'Market Leader',
 'Massive carrier network with technology-driven brokerage and Navisphere platform', 'national', 70,
 ARRAY['public', '3pl', 'freight-brokerage', 'technology-platform']),

('HCA Healthcare', 'hca-healthcare', 'hospitals', 'Hospitals', 'Healthcare & Life Sciences',
 'https://www.hcahealthcare.com', 'Largest for-profit hospital operator in the US with 186 hospitals and 2,000+ care sites across 20 states and the UK.',
 'Nashville', 'TN', 'US', 'enterprise', '$65B', 283000, 'Market Leader',
 'Scale-driven clinical data advantage with standardized operating model across 186 hospitals', 'national', 62,
 ARRAY['public', 'for-profit', 'hospital-system', 'data-driven']),

('Medtronic', 'medtronic', 'medical-device-manufacturing', 'Medical Device Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.medtronic.com', 'Global leader in medical technology offering devices and therapies across cardiac, neurological, diabetes, and surgical specialties.',
 'Minneapolis', 'MN', 'US', 'enterprise', '$32.4B', 95000, 'Market Leader',
 'Broadest medtech portfolio with installed base advantage in cardiac and surgical robotics', 'national', 75,
 ARRAY['public', 'medtech', 'global', 'robotics']),

('CoStar Group', 'costar-group', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.costargroup.com', 'Provider of commercial real estate information, analytics, and marketing services operating CoStar, LoopNet, and Apartments.com.',
 'Washington', 'DC', 'US', 'upper_mid', '$2.5B', 6500, 'Market Leader',
 'Dominant CRE data platform with irreplaceable research database and network effects', 'national', 72,
 ARRAY['public', 'proptech', 'data-platform', 'marketplace']),

('Fortinet', 'fortinet', 'cybersecurity-services', 'Cybersecurity Services', 'Technology & Digital Economy',
 'https://www.fortinet.com', 'Cybersecurity company providing network security appliances, firewall, and SASE solutions with proprietary ASIC-powered FortiGate platform.',
 'Sunnyvale', 'CA', 'US', 'upper_mid', '$5.3B', 13500, 'Market Leader',
 'ASIC-powered security appliances with industry-leading price-performance ratio', 'national', 80,
 ARRAY['public', 'network-security', 'firewall', 'sase']),

('Hologic', 'hologic', 'medical-device-manufacturing', 'Medical Device Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.hologic.com', 'Medical technology company specializing in women''s health diagnostics, including 3D mammography, molecular diagnostics, and GYN surgical products.',
 'Marlborough', 'MA', 'US', 'upper_mid', '$4.0B', 7000, 'Market Leader',
 'Dominant position in breast cancer screening with 3D mammography and molecular diagnostics leadership', 'national', 70,
 ARRAY['public', 'womens-health', 'diagnostics', 'medtech']),

('Builders FirstSource', 'builders-firstsource', 'specialty-trade-contractors', 'Specialty Trade Contractors', 'Construction & Infrastructure',
 'https://www.bldr.com', 'Largest US supplier of structural building products and value-added components to residential construction professionals.',
 'Dallas', 'TX', 'US', 'enterprise', '$17.1B', 28000, 'Market Leader',
 'Scale advantage in building products distribution with value-added manufacturing', 'national', 55,
 ARRAY['public', 'building-products', 'residential', 'distributor']),

('Quanta Services', 'quanta-services', 'specialty-trade-contractors', 'Specialty Trade Contractors', 'Construction & Infrastructure',
 'https://www.quantaservices.com', 'Leading specialty contractor providing infrastructure services for electric, gas, telecommunications, renewable energy, and pipeline industries.',
 'Houston', 'TX', 'US', 'enterprise', '$20.9B', 48000, 'Market Leader',
 'Largest specialty infrastructure contractor with expertise spanning power, renewables, and telecom', 'national', 58,
 ARRAY['public', 'infrastructure', 'utility', 'renewables']),

('Fair Isaac (FICO)', 'fico', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.fico.com', 'Analytics software company best known for the FICO Score used in credit decisions, plus enterprise fraud detection and decision management platforms.',
 'Bozeman', 'MT', 'US', 'upper_mid', '$1.6B', 3600, 'Market Leader',
 'Ubiquitous credit scoring standard with expanding AI-driven decision management platform', 'national', 80,
 ARRAY['public', 'fintech', 'credit-scoring', 'ai-decisioning']),

('Vertiv Holdings', 'vertiv', 'data-centers', 'Data Centers', 'Technology & Digital Economy',
 'https://www.vertiv.com', 'Critical digital infrastructure and continuity solutions provider offering power management, cooling, and IT infrastructure for data centers.',
 'Westerville', 'OH', 'US', 'upper_mid', '$7.6B', 26000, 'Strong Challenger',
 'Critical infrastructure for data center power and cooling riding the AI compute buildout wave', 'national', 70,
 ARRAY['public', 'data-center-infrastructure', 'cooling', 'ai-buildout']),

('AppLovin', 'applovin', 'digital-advertising', 'Digital Advertising', 'Technology & Digital Economy',
 'https://www.applovin.com', 'Technology platform enabling mobile app developers to market, monetize, and publish their apps through AI-powered advertising.',
 'Palo Alto', 'CA', 'US', 'upper_mid', '$4.7B', 1700, 'Strong Challenger',
 'AI-powered ad engine (AXON) with best-in-class ROAS for mobile app advertisers', 'national', 92,
 ARRAY['public', 'adtech', 'mobile', 'ai-native', 'high-growth']),

('Ollie''s Bargain Outlet', 'ollies-bargain-outlet', 'specialty-retail', 'Specialty Retail', 'Retail Trade',
 'https://www.ollies.us', 'Closeout retailer offering brand-name merchandise at deeply discounted prices through 500+ stores across the eastern US.',
 'Harrisburg', 'PA', 'US', 'upper_mid', '$2.1B', 12000, 'Niche Specialist',
 'Treasure-hunt shopping model with opportunistic buying and loyal customer base', 'national', 35,
 ARRAY['public', 'closeout-retail', 'value', 'growing-store-base']),

('Republic Services', 'republic-services', 'waste-management-services', 'Waste Management Services', 'Energy & Utilities',
 'https://www.republicservices.com', 'Second largest waste management company in the US providing solid waste collection, recycling, and disposal services.',
 'Phoenix', 'AZ', 'US', 'enterprise', '$15.5B', 41000, 'Strong Challenger',
 'Route density and technology investment in sustainability and fleet electrification', 'national', 60,
 ARRAY['public', 'waste-management', 'recycling', 'sustainability']),

('Constellation Energy', 'constellation-energy', 'electric-power-generation', 'Electric Power Generation', 'Energy & Utilities',
 'https://www.constellationenergy.com', 'Largest producer of carbon-free energy in the US operating nuclear, wind, solar, and hydro generation assets.',
 'Baltimore', 'MD', 'US', 'enterprise', '$25.2B', 13000, 'Market Leader',
 'Largest US nuclear fleet providing clean baseload power in an AI-driven demand surge', 'national', 60,
 ARRAY['public', 'nuclear', 'clean-energy', 'ai-data-center-demand']),

-- ═══════════════════════════════════════════════════════════════════════════
-- INTERNATIONAL (~25 companies)
-- ═══════════════════════════════════════════════════════════════════════════

('Shopify', 'shopify', 'ecommerce-retail', 'E-commerce Retail', 'Retail Trade',
 'https://www.shopify.com', 'Commerce platform enabling millions of merchants to create online stores, manage payments, and run their businesses across channels.',
 'Ottawa', '', 'CA', 'enterprise', '$7.1B', 12000, 'Market Leader',
 'Dominant SMB e-commerce platform with expanding enterprise and POS presence', 'international', 92,
 ARRAY['public', 'ecommerce-platform', 'plg', 'canadian']),

('Wise', 'wise-payments', 'fintech-services', 'Fintech Services', 'Financial Services',
 'https://www.wise.com', 'International money transfer service offering low-cost cross-border payments and multi-currency accounts for individuals and businesses.',
 'London', '', 'GB', 'mid_market', '$960M', 5600, 'Strong Challenger',
 'Transparent pricing disrupting traditional international money transfer with direct FX network', 'international', 88,
 ARRAY['public', 'payments', 'international', 'fintech']),

('Canva', 'canva', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.canva.com', 'Online design platform enabling non-designers to create professional graphics, presentations, videos, and documents using templates and AI.',
 'Sydney', '', 'AU', 'upper_mid', '$2.3B', 5000, 'Market Leader',
 'Democratized design with massive freemium base and expanding enterprise collaboration features', 'international', 90,
 ARRAY['privately-held', 'design-tools', 'plg', 'australian']),

('SAP', 'sap', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.sap.com', 'Enterprise application software company providing ERP, CRM, and business intelligence solutions to large enterprises globally.',
 'Walldorf', '', 'DE', 'enterprise', '$35.4B', 107000, 'Market Leader',
 'Dominant ERP platform with massive installed base migrating to S/4HANA cloud', 'international', 78,
 ARRAY['public', 'erp', 'enterprise-software', 'german']),

('Deliveroo', 'deliveroo', 'ecommerce-retail', 'E-commerce Retail', 'Retail Trade',
 'https://www.deliveroo.com', 'Online food delivery platform operating across Europe, Middle East, and Asia with restaurant marketplace and delivery network.',
 'London', '', 'GB', 'upper_mid', '$2.1B', 3800, 'Strong Challenger',
 'Strong European and Asian market presence with editions dark kitchen model', 'international', 78,
 ARRAY['public', 'food-delivery', 'gig-economy', 'british']),

('Mercado Libre', 'mercado-libre', 'ecommerce-retail', 'E-commerce Retail', 'Retail Trade',
 'https://www.mercadolibre.com', 'Largest e-commerce and fintech ecosystem in Latin America operating marketplace, payments (Mercado Pago), logistics, and credit services.',
 'Buenos Aires', '', 'AR', 'enterprise', '$14.5B', 46000, 'Market Leader',
 'Dominant LATAM e-commerce ecosystem with integrated fintech and logistics moat', 'international', 82,
 ARRAY['public', 'ecommerce', 'fintech', 'latin-america']),

('ASML', 'asml', 'semiconductor-manufacturing', 'Semiconductor Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.asml.com', 'Sole manufacturer of extreme ultraviolet lithography machines essential for producing advanced semiconductors below 7nm.',
 'Veldhoven', '', 'NL', 'enterprise', '$27.6B', 42000, 'Market Leader',
 'Monopoly position in EUV lithography — essential for all advanced chip manufacturing', 'international', 85,
 ARRAY['public', 'monopoly', 'semiconductor-equipment', 'dutch']),

('Spotify', 'spotify', 'podcasting-digital-audio', 'Podcasting & Digital Audio', 'Telecommunications & Media',
 'https://www.spotify.com', 'Audio streaming platform with 600M+ users offering music, podcasts, and audiobooks with AI-powered personalization and discovery.',
 'Stockholm', '', 'SE', 'enterprise', '$15.7B', 9000, 'Market Leader',
 'Dominant audio streaming platform with best-in-class recommendation algorithms and creator tools', 'international', 90,
 ARRAY['public', 'streaming', 'music', 'podcasts', 'swedish']),

('Atlassian', 'atlassian', 'saas-providers', 'SaaS Providers', 'Technology & Digital Economy',
 'https://www.atlassian.com', 'Enterprise software company providing team collaboration tools including Jira, Confluence, Trello, and Bitbucket for software development teams.',
 'Sydney', '', 'AU', 'enterprise', '$4.4B', 12000, 'Market Leader',
 'De facto standard for software development workflows with strong PLG model', 'international', 88,
 ARRAY['public', 'developer-tools', 'collaboration', 'plg', 'australian']),

('Tata Consultancy Services', 'tcs', 'it-consulting-services', 'IT Consulting Services', 'Technology & Digital Economy',
 'https://www.tcs.com', 'Global IT services and consulting company providing digital transformation, cloud migration, and enterprise solutions to Fortune 500 clients.',
 'Mumbai', '', 'IN', 'enterprise', '$29.1B', 614000, 'Market Leader',
 'Massive delivery capability with deep enterprise relationships and competitive cost structure', 'international', 72,
 ARRAY['public', 'it-services', 'consulting', 'indian']),

('BYD', 'byd', 'automotive-manufacturing', 'Automotive Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.byd.com', 'Chinese automaker and battery manufacturer that became the world''s largest EV maker, also producing buses, trucks, and energy storage systems.',
 'Shenzhen', '', 'CN', 'enterprise', '$92B', 570000, 'Market Leader',
 'Vertically integrated EV and battery manufacturing with massive scale and cost advantage', 'international', 75,
 ARRAY['public', 'ev', 'battery', 'chinese', 'vertically-integrated']),

('Adyen', 'adyen', 'payment-processing', 'Payment Processing', 'Financial Services',
 'https://www.adyen.com', 'Global payment platform providing unified commerce solutions for enterprise merchants across online, in-store, and mobile channels.',
 'Amsterdam', '', 'NL', 'enterprise', '$8.1B', 4300, 'Market Leader',
 'Single-platform payment processing across all channels with direct acquirer model', 'international', 88,
 ARRAY['public', 'payments', 'enterprise', 'dutch']),

('Grab Holdings', 'grab-holdings', 'ecommerce-retail', 'E-commerce Retail', 'Retail Trade',
 'https://www.grab.com', 'Southeast Asian superapp providing ride-hailing, food delivery, digital payments, and financial services across 8 countries.',
 'Singapore', '', 'SG', 'upper_mid', '$2.4B', 9000, 'Market Leader',
 'Dominant Southeast Asian superapp with integrated mobility, delivery, and fintech ecosystem', 'international', 80,
 ARRAY['public', 'superapp', 'ride-hailing', 'southeast-asia']),

('Rolls-Royce Holdings', 'rolls-royce', 'aerospace-defense-manufacturing', 'Aerospace & Defense Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.rolls-royce.com', 'British engineering company designing and manufacturing aircraft engines, power systems, and defense technologies for global markets.',
 'London', '', 'GB', 'enterprise', '$18.9B', 42000, 'Market Leader',
 'Leading wide-body aircraft engine manufacturer with power-by-the-hour service model', 'international', 68,
 ARRAY['public', 'aerospace', 'defense', 'british', 'engines']),

('Novo Nordisk', 'novo-nordisk', 'pharmaceutical-manufacturing', 'Pharmaceutical Manufacturing', 'Manufacturing — Nondurable Goods',
 'https://www.novonordisk.com', 'Danish pharmaceutical company dominating the GLP-1 market with Ozempic and Wegovy for diabetes and obesity treatment.',
 'Bagsvaerd', '', 'DK', 'enterprise', '$36B', 64000, 'Market Leader',
 'Dominant position in GLP-1 receptor agonists with massive manufacturing expansion underway', 'international', 72,
 ARRAY['public', 'pharma', 'glp-1', 'danish', 'blockbuster-drugs']),

('TSMC', 'tsmc', 'semiconductor-manufacturing', 'Semiconductor Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.tsmc.com', 'World''s largest semiconductor foundry manufacturing chips for Apple, NVIDIA, AMD, and Qualcomm with leading-edge process technology.',
 'Hsinchu', '', 'TW', 'enterprise', '$87B', 76000, 'Market Leader',
 'Dominant pure-play foundry with technology leadership at 3nm and below', 'international', 85,
 ARRAY['public', 'foundry', 'semiconductor', 'taiwanese']),

('Klarna', 'klarna', 'fintech-services', 'Fintech Services', 'Financial Services',
 'https://www.klarna.com', 'Swedish fintech providing buy-now-pay-later services, AI-powered shopping, and payment solutions for 150M consumers globally.',
 'Stockholm', '', 'SE', 'upper_mid', '$2.3B', 3800, 'Strong Challenger',
 'BNPL pioneer pivoting to AI-powered shopping and financial services platform', 'international', 88,
 ARRAY['public', 'bnpl', 'fintech', 'swedish', 'ai-shopping']),

('Arm Holdings', 'arm-holdings', 'semiconductor-manufacturing', 'Semiconductor Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.arm.com', 'British semiconductor IP company licensing chip designs used in 99% of smartphones and expanding into automotive, IoT, and data center markets.',
 'Cambridge', '', 'GB', 'enterprise', '$3.2B', 6400, 'Market Leader',
 'IP licensing model powering virtually all mobile devices with growing server and automotive reach', 'international', 88,
 ARRAY['public', 'ip-licensing', 'chip-design', 'british', 'mobile']),

('Dassault Systemes', 'dassault-systemes', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.3ds.com', 'French software company providing 3D design, simulation, and PLM solutions with the 3DEXPERIENCE platform for manufacturing and life sciences.',
 'Velizy-Villacoublay', '', 'FR', 'enterprise', '$6.5B', 24000, 'Market Leader',
 'Industry standard for 3D design and digital twin in aerospace, automotive, and life sciences', 'international', 78,
 ARRAY['public', 'plm', 'digital-twin', 'french', 'manufacturing']),

('Schneider Electric', 'schneider-electric', 'industrial-equipment-manufacturing', 'Industrial Equipment Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.se.com', 'Global specialist in energy management and industrial automation providing solutions for data centers, buildings, infrastructure, and industry.',
 'Rueil-Malmaison', '', 'FR', 'enterprise', '$38B', 150000, 'Market Leader',
 'Dual leadership in energy management and industrial automation with strong sustainability positioning', 'international', 75,
 ARRAY['public', 'energy-management', 'automation', 'french', 'sustainability']),

('Infosys', 'infosys', 'it-consulting-services', 'IT Consulting Services', 'Technology & Digital Economy',
 'https://www.infosys.com', 'Global digital services and consulting company providing IT outsourcing, cloud transformation, and AI services to enterprise clients.',
 'Bangalore', '', 'IN', 'enterprise', '$18.6B', 318000, 'Strong Challenger',
 'Strong digital transformation practice with AI-first strategy and competitive delivery model', 'international', 78,
 ARRAY['public', 'it-services', 'digital-transformation', 'indian']),

('Roper Technologies', 'roper-technologies', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.ropertech.com', 'Diversified technology company operating niche vertical software businesses across healthcare, government, and infrastructure markets.',
 'Sarasota', 'FL', 'US', 'enterprise', '$6.1B', 18600, 'Market Leader',
 'Portfolio of niche vertical software businesses with high recurring revenue and mission-critical positioning', 'national', 70,
 ARRAY['public', 'vertical-software', 'diversified', 'acquisition-driven']),

('Wolters Kluwer', 'wolters-kluwer', 'software-publishing', 'Software Publishing', 'Technology & Digital Economy',
 'https://www.wolterskluwer.com', 'Dutch information services company providing professional software and workflow solutions for healthcare, tax, legal, and compliance markets.',
 'Alphen aan den Rijn', '', 'NL', 'enterprise', '$6.4B', 21000, 'Market Leader',
 'Mission-critical professional information and software with high switching costs in regulated industries', 'international', 72,
 ARRAY['public', 'information-services', 'compliance', 'dutch', 'regulated']),

('Samsung Electronics', 'samsung-electronics', 'computer-hardware-manufacturing', 'Computer Hardware Manufacturing', 'Manufacturing — Durable Goods',
 'https://www.samsung.com', 'South Korean technology conglomerate and world''s largest manufacturer of smartphones, memory chips, displays, and consumer electronics.',
 'Suwon', '', 'KR', 'enterprise', '$200B', 267000, 'Market Leader',
 'Vertically integrated technology leader in memory, displays, and mobile devices with massive R&D investment', 'international', 80,
 ARRAY['public', 'conglomerate', 'semiconductor', 'korean', 'consumer-electronics'])

ON CONFLICT (slug) DO NOTHING;
