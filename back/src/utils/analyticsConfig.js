export const ANALYTICS_CONFIG = {
  PAGE_SIZE: 1000,
 
  PROJECTION_FIELDS: ["gender", "birthdate", "createdAt"],
  AGE_BUCKETS: {
    "0-17": { min: 0, max: 17 },
    "18-24": { min: 18, max: 24 },
    "25-34": { min: 25, max: 34 },
    "35-44": { min: 35, max: 44 },
    "45-54": { min: 45, max: 54 },
    "55-64": { min: 55, max: 64 },
    "65+": { min: 65, max: 120 },
  },
  GENDER_VALUES: ["Male", "Female", "Other"],
};
