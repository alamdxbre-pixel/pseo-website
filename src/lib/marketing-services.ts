export interface ServiceFeature {
  title: string;
  desc: string;
}

export interface ServiceProcess {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface MarketingService {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  gradFrom: string;
  gradMid: string;
  gradTo: string;
  icon: string;
  overview: string;
  features: ServiceFeature[];
  subServices: string[];
  process: ServiceProcess[];
  faq: ServiceFaq[];
}

export const MARKETING_SERVICES: MarketingService[] = [
  {
    slug: 'advertising-services',
    title: 'Advertising Agency Services',
    shortTitle: 'Advertising',
    tagline: 'Single-point account management for all your advertising activities',
    metaTitle: 'Advertising Agency Services Dubai | Account Management & Campaign Reporting | Buoyant Marketing',
    metaDescription: 'Full-service advertising agency in Dubai — single-point account management, supplier coordination, approvals, quality control, and campaign reporting for UAE businesses.',
    keywords: ['advertising agency Dubai', 'advertising services UAE', 'campaign management Dubai', 'media coordination UAE', 'advertising account management Dubai'],
    gradFrom: '#7B2FF7',
    gradMid: '#F72585',
    gradTo: '#FF6B6B',
    icon: 'M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z',
    overview: 'Managing advertising across multiple suppliers, media channels, and approvals is complex and time-consuming. We act as your single point of contact — coordinating suppliers, managing approvals, enforcing quality, and delivering campaign reporting so you can focus on your business.',
    features: [
      { title: 'Single-Point Account Management', desc: 'One dedicated contact manages all your advertising activities — no chasing multiple suppliers or agencies.' },
      { title: 'Supplier Coordination', desc: 'We source, brief, and manage all creative, print, media, and production suppliers on your behalf.' },
      { title: 'Approvals Management', desc: 'Structured approval workflows ensuring nothing goes live without your sign-off at every key stage.' },
      { title: 'Quality Control', desc: 'Rigorous QC checks at every production and delivery stage to ensure output matches your brand standards.' },
      { title: 'Campaign Reporting', desc: 'Clear, consolidated performance reports covering reach, response, and results across all active campaigns.' },
      { title: 'Budget Oversight', desc: 'Full visibility on spend across every supplier and channel, with proactive budget management and alerts.' },
    ],
    subServices: ['Account Management', 'Supplier Coordination', 'Approvals Workflow', 'Quality Control', 'Campaign Reporting', 'Budget Management', 'Media Coordination', 'Vendor Management'],
    process: [
      { step: '01', title: 'Brief Collection', desc: 'We gather a complete brief covering your campaign goals, audience, timeline, budget, and brand requirements.' },
      { step: '02', title: 'Supplier & Channel Plan', desc: 'We map the right suppliers, media channels, and production partners for your specific campaign.' },
      { step: '03', title: 'Coordination & Approvals', desc: 'All creative, production, and media work is coordinated centrally with structured approval checkpoints.' },
      { step: '04', title: 'Launch & Monitor', desc: 'Campaign goes live with active monitoring across all channels and suppliers.' },
      { step: '05', title: 'Report & Review', desc: 'Consolidated campaign report delivered on completion with recommendations for the next cycle.' },
    ],
    faq: [
      { q: 'What does single-point account management mean in practice?', a: 'It means you have one contact at Buoyant Marketing who handles everything — briefing suppliers, chasing approvals, managing timelines, and consolidating all campaign reporting. You don\'t need to manage multiple vendors or agencies separately.' },
      { q: 'Do you manage advertising across both digital and physical channels?', a: 'Yes. We coordinate across all channels — digital (Meta, Google, display), print, outdoor, direct mail, and events — under a single managed account. This ensures consistent messaging and eliminates gaps between channels.' },
      { q: 'How do approvals work?', a: 'We set up a clear approval workflow at the start of each campaign. All creative, production artwork, and media placements go through defined review stages before anything is finalised or goes live. You always have visibility and sign-off at key milestones.' },
      { q: 'Is ad spend included in your service fees?', a: 'No. Ad spend for media placements, outdoor bookings, Meta, and Google is always billed separately from our service fees. We provide full transparency on all spend and never take undisclosed commissions from suppliers.' },
      { q: 'Can you manage an existing campaign that is already running?', a: 'Yes. We frequently take over ongoing campaigns from clients who need better coordination and reporting. We start with an audit of current activity and quickly establish clear processes and accountability.' },
    ],
  },

  {
    slug: 'campaign-creation',
    title: 'Campaign Creation & Realization',
    shortTitle: 'Campaigns',
    tagline: 'From concept to launch — complete campaign planning and execution',
    metaTitle: 'Campaign Creation & Realization Dubai | Concept to Launch | Buoyant Marketing',
    metaDescription: 'End-to-end campaign creation in Dubai — concept development, channel strategy, launch planning, creative adaptation, and complete rollout management for UAE brands.',
    keywords: ['campaign creation Dubai', 'marketing campaign UAE', 'campaign management Dubai', 'advertising campaign creation', 'campaign strategy UAE'],
    gradFrom: '#F72585',
    gradMid: '#FF6B6B',
    gradTo: '#FF9F1C',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    overview: 'A campaign without a clear concept and structured rollout plan rarely performs. We develop campaign concepts grounded in your business goals and audience insight, define the right channel strategy, plan the launch in detail, and manage the entire realization process through to completion.',
    features: [
      { title: 'Campaign Concept Development', desc: 'Strategic campaign concepts built around your brand, audience, and business objective — not generic templates.' },
      { title: 'Channel Strategy', desc: 'Identification of the right mix of channels (digital, print, outdoor, direct) for your audience and budget.' },
      { title: 'Launch Planning', desc: 'Detailed launch plan with timeline, milestones, asset checklist, and supplier schedule.' },
      { title: 'Creative Adaptation', desc: 'Campaign creative adapted across all required formats and channels — digital ads, print, banners, social.' },
      { title: 'Rollout Management', desc: 'Coordinated campaign rollout managed end-to-end, from first creative brief to final launch confirmation.' },
      { title: 'Performance Review', desc: 'Post-campaign performance review with documented learnings to improve the next campaign cycle.' },
    ],
    subServices: ['Campaign Concepting', 'Channel Strategy', 'Launch Planning', 'Creative Adaptation', 'Multi-Channel Rollout', 'Timeline Management', 'Campaign Brief Writing', 'Post-Campaign Review'],
    process: [
      { step: '01', title: 'Discovery', desc: 'We understand your business goal, target audience, competitive context, and campaign budget.' },
      { step: '02', title: 'Concept & Strategy', desc: 'Campaign concept and channel strategy developed and presented for alignment before any production begins.' },
      { step: '03', title: 'Planning & Scheduling', desc: 'Full launch plan with timeline, asset list, and supplier schedule documented and approved.' },
      { step: '04', title: 'Creative & Production', desc: 'All campaign creative and production assets delivered, approved, and campaign-ready.' },
      { step: '05', title: 'Launch & Evaluate', desc: 'Campaign launched on schedule with post-campaign performance evaluation and documented recommendations.' },
    ],
    faq: [
      { q: 'What is included in a campaign concept?', a: 'A campaign concept from Buoyant Marketing includes the core campaign idea, key messaging, visual direction, channel recommendations, and a high-level rollout plan. It is a strategic document, not just a creative mood board.' },
      { q: 'How long does it take to create and launch a campaign?', a: 'A straightforward digital campaign can be concept-to-launch in 2–3 weeks. Multi-channel campaigns involving print and outdoor typically require 4–6 weeks from brief to launch. We provide a specific timeline at the start of every project.' },
      { q: 'Do you handle both the creative and the production?', a: 'Yes. We develop the creative concept and manage all production — print artwork, digital ad creation, and campaign asset adaptation. Production costs for physical materials are quoted separately.' },
      { q: 'Can you run campaigns in both Arabic and English?', a: 'Yes. We produce bilingual campaign creative with native Arabic copywriting and design, ensuring both language versions are culturally appropriate and on-brand.' },
      { q: 'What happens after a campaign ends?', a: 'We conduct a post-campaign review covering what ran, what performed, and what to do differently next time. This review is included in every managed campaign and forms the brief for the next cycle.' },
    ],
  },

  {
    slug: 'brochures-leaflets',
    title: 'Brochures & Leaflets',
    shortTitle: 'Print Media',
    tagline: 'Professional print media that represents your brand with impact',
    metaTitle: 'Brochure & Leaflet Design Dubai | Print-Ready Artwork & Production | Buoyant Marketing',
    metaDescription: 'Professional brochure and leaflet services in Dubai — content and layout planning, print-ready artwork, print production coordination, and quality checks. Fast turnaround across UAE.',
    keywords: ['brochure design Dubai', 'leaflet printing UAE', 'brochure production Dubai', 'print design UAE', 'company profile design Dubai'],
    gradFrom: '#F59E0B',
    gradMid: '#F97316',
    gradTo: '#EF4444',
    icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
    overview: 'Your brochures and leaflets are often the first physical impression of your brand. We manage the entire process — from content structure and layout planning through to print-ready artwork and production coordination — ensuring every piece is on-brand, accurate, and delivered on time.',
    features: [
      { title: 'Content & Layout Planning', desc: 'Structured content planning ensuring your key messages are communicated clearly and in the right order.' },
      { title: 'Print-Ready Artwork', desc: 'Professionally designed layouts delivered as print-ready files with correct bleeds, colour profiles, and specifications.' },
      { title: 'Print Production Coordination', desc: 'We coordinate with quality-vetted print suppliers to ensure your job is produced to the right specification.' },
      { title: 'Quality Checks', desc: 'Pre-press checks and physical print proofs reviewed before full production runs to catch any errors.' },
      { title: 'Bilingual Design', desc: 'Arabic and English versions designed and typeset correctly, with RTL layout handled professionally.' },
      { title: 'Delivery Management', desc: 'Print delivery coordinated to your location or directly to distribution points across the UAE.' },
    ],
    subServices: ['Brochure Design', 'Leaflet Design', 'Company Profiles', 'Product Catalogues', 'Menu Design', 'Flyers', 'Bi-fold & Tri-fold', 'Arabic & English Versions', 'Print Coordination', 'Delivery Management'],
    process: [
      { step: '01', title: 'Content Brief', desc: 'We collect all content — copy, images, brand assets — and structure the layout plan for your approval.' },
      { step: '02', title: 'Design', desc: 'Layout designed to your brand standards with initial concept presented before full design development.' },
      { step: '03', title: 'Review & Revisions', desc: 'Design reviewed, revised, and signed off. Up to 2 revision rounds included as standard.' },
      { step: '04', title: 'Pre-Press & Print', desc: 'Print-ready files prepared, pre-press checks completed, and production coordinated with approved suppliers.' },
      { step: '05', title: 'Delivery', desc: 'Finished print items delivered to your premises or distribution points on the agreed date.' },
    ],
    faq: [
      { q: 'Are printing costs included in your brochure service?', a: 'No. Print production, fabrication, and delivery costs are quoted separately based on quantity, paper specification, and finish. We provide transparent, competitive print quotes from our supplier network.' },
      { q: 'How many revision rounds are included?', a: 'Up to 2 revision rounds per deliverable are included as standard. Additional revisions beyond this are quoted at an hourly rate. We find that clear briefs at the start significantly reduce the need for revisions.' },
      { q: 'Can you design in both Arabic and English?', a: 'Yes. We design bilingual brochures with native Arabic typesetting, ensuring RTL layouts are handled correctly and both language versions are visually consistent.' },
      { q: 'What file formats do you provide?', a: 'We deliver print-ready PDFs with correct bleed and colour profiles. We also provide editable source files (AI, InDesign) if requested. All files are archived for easy reuse in future campaigns.' },
      { q: 'How long does a brochure project take?', a: 'A standard A4 4-page brochure typically takes 5–8 working days from confirmed brief to print-ready artwork. Complex catalogues or bilingual projects may take 10–15 days. We provide a timeline at project start.' },
    ],
  },

  {
    slug: 'direct-marketing',
    title: 'Direct Marketing',
    shortTitle: 'Direct Marketing',
    tagline: 'Targeted distribution that reaches your audience where they are',
    metaTitle: 'Direct Marketing Services Dubai | Area Distribution & Targeted Campaigns | Buoyant Marketing',
    metaDescription: 'Targeted direct marketing in Dubai — area-based distribution planning, route coordination, delivery tracking, and campaign completion reports. Precise reach across UAE.',
    keywords: ['direct marketing Dubai', 'flyer distribution UAE', 'leaflet distribution Dubai', 'area marketing UAE', 'direct mail Dubai', 'targeted distribution UAE'],
    gradFrom: '#2563EB',
    gradMid: '#7B2FF7',
    gradTo: '#F72585',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    overview: 'Getting your message physically into the hands of your target audience requires precise planning and disciplined execution. We manage area-based targeting, distribution route planning, team coordination, delivery tracking, and provide a verified completion report for every campaign.',
    features: [
      { title: 'Area-Based Targeting', desc: 'Precise area selection based on your target customer profile — residential communities, business districts, retail zones.' },
      { title: 'Distribution Planning', desc: 'Detailed distribution plan covering coverage areas, volumes per zone, timing, and team allocation.' },
      { title: 'Route Coordination', desc: 'On-ground route management ensuring full coverage of planned areas without duplication or gaps.' },
      { title: 'Delivery Tracking', desc: 'Real-time distribution monitoring with GPS route verification and completion confirmation per zone.' },
      { title: 'Campaign Completion Reports', desc: 'Verified completion reports showing coverage maps, quantities distributed, and timeline adherence.' },
      { title: 'Repeat Campaign Management', desc: 'Ongoing direct marketing schedules managed efficiently using saved route data and area performance records.' },
    ],
    subServices: ['Residential Distribution', 'Business District Distribution', 'Retail Zone Coverage', 'Route Planning', 'GPS Tracking', 'Completion Reports', 'Door-to-Door', 'In-Store Distribution'],
    process: [
      { step: '01', title: 'Target Area Brief', desc: 'We define the target areas, volumes, and timing based on your audience and campaign objective.' },
      { step: '02', title: 'Distribution Plan', desc: 'Full distribution plan prepared with coverage map, zone breakdown, and volume allocation.' },
      { step: '03', title: 'Material Handover', desc: 'Printed materials received, counted, and cross-checked against planned distribution quantities.' },
      { step: '04', title: 'On-Ground Execution', desc: 'Distribution carried out by our coordinated team with active route monitoring throughout.' },
      { step: '05', title: 'Completion Report', desc: 'GPS-verified completion report delivered showing coverage, quantities distributed, and timeline.' },
    ],
    faq: [
      { q: 'Which areas in Dubai do you cover for direct marketing?', a: 'We cover all major residential communities, business districts, retail zones, and commercial areas across Dubai and can extend coverage to Abu Dhabi and Sharjah. Coverage areas are confirmed during planning based on your target audience.' },
      { q: 'Are printing and materials included in direct marketing fees?', a: 'No. Printing, fabrication, and material production costs are separate from distribution service fees. We can coordinate print production through our supplier network if required.' },
      { q: 'How do I know the distribution was actually completed?', a: 'We provide GPS-verified completion reports covering coverage maps, actual quantities distributed per zone, and timeline adherence. For repeat campaigns, we also track performance patterns across distribution cycles.' },
      { q: 'What is the minimum quantity for a direct marketing campaign?', a: 'Minimum quantities vary by area and campaign type. We recommend discussing your target area and audience first so we can advise on realistic minimum volumes for effective coverage.' },
      { q: 'Can you combine direct marketing with digital campaigns?', a: 'Yes. We recommend integrating direct marketing distribution with digital retargeting campaigns in the same areas for improved response rates. We can coordinate both as part of a broader campaign plan.' },
    ],
  },

  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortTitle: 'Digital',
    tagline: 'Performance-driven Meta and Google campaigns built to grow your business',
    metaTitle: 'Digital Marketing Agency Dubai | Meta & Google Campaign Management | Buoyant Marketing',
    metaDescription: 'Performance digital marketing in Dubai — Meta and Google campaign management, optimisation, retargeting, KPI reporting, and growth planning for UAE businesses.',
    keywords: ['digital marketing Dubai', 'Google Ads Dubai', 'Meta advertising UAE', 'Facebook ads Dubai', 'Instagram marketing UAE', 'PPC agency Dubai', 'digital advertising UAE'],
    gradFrom: '#10B981',
    gradMid: '#06B6D4',
    gradTo: '#3B82F6',
    icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9',
    overview: 'Digital advertising on Meta and Google is where most businesses in Dubai get results — or waste budget. We manage your campaigns with active optimisation, audience refinement, retargeting, and clear KPI reporting so every dirham of ad spend is working as hard as possible.',
    features: [
      { title: 'Meta Campaign Management', desc: 'Facebook and Instagram campaign setup, management, and optimisation targeting your specific audience in Dubai and beyond.' },
      { title: 'Google Campaign Management', desc: 'Google Search, Display, and Performance Max campaigns managed to capture high-intent traffic for your business.' },
      { title: 'Audience Optimisation', desc: 'Ongoing audience refinement based on campaign performance data — reducing wasted spend and improving conversion rates.' },
      { title: 'Retargeting Campaigns', desc: 'Retargeting setups that re-engage website visitors, ad viewers, and past customers to drive repeat action.' },
      { title: 'KPI Reporting', desc: 'Clear monthly reports covering reach, clicks, conversions, cost per result, and budget utilisation — no jargon.' },
      { title: 'Growth Planning', desc: 'Monthly strategy review with recommendations for scaling, testing new audiences, or adjusting creative for the next period.' },
    ],
    subServices: ['Meta Ads (Facebook & Instagram)', 'Google Search Ads', 'Google Display', 'Retargeting', 'Audience Targeting', 'Ad Creative', 'Landing Page Support', 'KPI Reporting', 'Growth Planning'],
    process: [
      { step: '01', title: 'Account Audit', desc: 'Review of existing ad accounts (or fresh setup if new) to establish baseline and identify quick wins.' },
      { step: '02', title: 'Strategy & Setup', desc: 'Campaign strategy defined: objectives, audiences, budget allocation, and ad creative plan.' },
      { step: '03', title: 'Creative Production', desc: 'Ad creative developed and approved — images, copy, and formats optimised for each platform.' },
      { step: '04', title: 'Campaign Launch', desc: 'Campaigns launched with tracking, retargeting pixels, and conversion events correctly configured from day one.' },
      { step: '05', title: 'Optimise & Report', desc: 'Active optimisation throughout the month with clear KPI report and growth recommendations delivered monthly.' },
    ],
    faq: [
      { q: 'Is ad spend included in digital marketing service fees?', a: 'No. Ad spend for Meta and Google is always billed separately from our management fees. You maintain full ownership and control of your ad accounts at all times.' },
      { q: 'What is the minimum ad spend for effective campaigns in Dubai?', a: 'For meaningful results, we recommend a minimum of AED 3,000/month in Meta or Google ad spend. Campaigns with lower budgets can still run but may have limited reach and slower optimisation. We advise on realistic budgets during onboarding.' },
      { q: 'Do you manage campaigns in Arabic?', a: 'Yes. We create Arabic-language ad creative and copy for campaigns targeting Arabic-speaking audiences, with native copywriting to ensure authenticity.' },
      { q: 'How long before I see results from digital advertising?', a: 'Most campaigns show meaningful initial data within the first 2–4 weeks. Optimisation improves performance progressively over 2–3 months as audience data accumulates. We provide realistic performance expectations at the start of every engagement.' },
      { q: 'Can I start with just one platform and add more later?', a: 'Yes. Many clients start with Meta or Google alone and expand to multiple platforms as budget grows. Our monthly plans are structured to scale with you.' },
    ],
  },
];

export const MARKETING_GEO = {
  region: 'AE-DU',
  placename: 'Dubai, UAE',
  position: '25.204849;55.270783',
  icbm: '25.204849, 55.270783',
};
