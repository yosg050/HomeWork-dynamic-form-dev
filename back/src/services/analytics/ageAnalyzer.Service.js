import {
  calculateAgeInYears,
  categorizeAge,
  isValidAge,
} from "../../utils/ageCalculator.js";
import { incrementMapCounter, mapToObject } from "../../utils/mapHelpers.js";

export class AgeAnalyzerService {
  constructor() {
    this.ageSum = 0;
    this.validAgeCount = 0;
    this.ageBuckets = new Map();
  }

  processSubmission(submission) {
    const ageInYears = calculateAgeInYears(submission.birthdate);

    if (isValidAge(ageInYears)) {
      this.ageSum += ageInYears;
      this.validAgeCount += 1;

      const ageCategory = categorizeAge(ageInYears);
      incrementMapCounter(this.ageBuckets, ageCategory);
    } else {
      incrementMapCounter(this.ageBuckets, "unknown");
    }
  }

  getResults() {
    const averageAge =
      this.validAgeCount > 0
        ? Number((this.ageSum / this.validAgeCount).toFixed(1))
        : null;

    return {
      averageAgeYears: averageAge,
      ageBuckets: mapToObject(this.ageBuckets),
    };
  }
}
