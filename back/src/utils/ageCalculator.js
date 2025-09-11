import { ANALYTICS_CONFIG } from "./analyticsConfig.js";

export function calculateAgeInYears(birthdateStr) {
  if (!birthdateStr) {
    return null;
  }

  const birthDate = new Date(birthdateStr);
  if (isNaN(birthDate.getTime())) {
    return null;
  }

  const now = new Date();
  const diffMs = now - birthDate;
  // Use Gregorian calendar average year (365.2425 days)
  const years = diffMs / (1000 * 60 * 60 * 24 * 365.2425);

  return years;
}

export function categorizeAge(ageInYears) {
  if (ageInYears == null) {
    return "unknown";
  }

  const bucket = ANALYTICS_CONFIG.AGE_BUCKETS.find(
    (bucket) => ageInYears >= bucket.min && ageInYears <= bucket.max
  );

  return bucket ? bucket.label : "unknown";
}

export function isValidAge(ageInYears) {
  return (
    ageInYears != null &&
    isFinite(ageInYears) &&
    ageInYears >= ANALYTICS_CONFIG.MIN_AGE &&
    ageInYears <= ANALYTICS_CONFIG.MAX_AGE
  );
}
