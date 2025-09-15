import { ANALYTICS_CONFIG } from "../../utils/analyticsConfig.js";

export function ageService(birthdate, ageState) {
  if (!birthdate) return null;

  const birthDate = new Date(birthdate);
  if (isNaN(birthDate.getTime())) return null;

  const age = Math.floor(
    (new Date() - birthDate) / (1000 * 60 * 60 * 24 * 365.25)
  );

  if (age < 0 || age > 1200) {
    console.warn(`Invalid age: ${age}`);
    return null;
  }

  let ageCategory = null;
  for (const [label, range] of Object.entries(ANALYTICS_CONFIG.AGE_BUCKETS)) {
    if (age >= range.min && age <= range.max) {
      ageCategory = label;
      break;
    }
  }

  if (ageCategory && ageState.ageBuckets.hasOwnProperty(ageCategory)) {
    ageState.ageBuckets[ageCategory]++;
  } else {
    console.warn(`Unknown age category for age: ${age}`);
  }

  return {
    ageSum: ageState.ageSum + age,
    validAgeCount: ageState.validAgeCount + 1,
  };
}
