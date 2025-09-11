export const ANALYTICS_CONFIG = {
  PAGE_SIZE: 1000,
  MAX_AGE: 120,
  MIN_AGE: 0,
  AGE_BUCKETS: [
    { min: 0, max: 17, label: "0-17" },
    { min: 18, max: 24, label: "18-24" },
    { min: 25, max: 34, label: "25-34" },
    { min: 35, max: 44, label: "35-44" },
    { min: 45, max: 54, label: "45-54" },
    { min: 55, max: 64, label: "55-64" },
    { min: 65, max: 200, label: "65+" },
  ],
  PROJECTION_FIELDS: ["gender", "birthdate", "createdAt"],
};
