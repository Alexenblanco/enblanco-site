/** Service ids for the lead form (project path) multi-select. Order matches UI. */
export const LEAD_SERVICE_IDS = [
  "branding",
  "naming",
  "art-direction",
  "marketing-creativo",
  "web-design",
  "editorial-design",
  "packaging",
  "other",
] as const;

export type LeadServiceId = (typeof LEAD_SERVICE_IDS)[number];
