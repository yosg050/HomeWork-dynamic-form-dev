import { InternalError } from "../errors/DomainErrors.js";
import { ANALYTICS_CONFIG } from "../utils/analyticsConfig.js";
import { ageService } from "./analytics/age.Service.js";
import { streamSubmissions } from "./analytics/dataCollector.Service.js";
import { genderService } from "./analytics/gender.Service.js";
import { timelineService } from "./analytics/timeline.Service.js";

export class AnalyticsService {
  constructor() {
    this.genderCounts = this._initializeGenderCounts();
    this.ageBuckets = this._initializeAgeBuckets();
    this.ageSum = 0;
    this.validAgeCount = 0;
    this.dailySubmissions = {};
    this.lastSubmissionAt = null;
    this.totalSubmissions = 0;
  }

  _initializeGenderCounts() {
    const counts = {};
    ANALYTICS_CONFIG.GENDER_VALUES.forEach((gender) => {
      counts[gender] = 0;
    });
    return counts;
  }

  _initializeAgeBuckets() {
    const buckets = {};
    Object.keys(ANALYTICS_CONFIG.AGE_BUCKETS).forEach((bucketKey) => {
      buckets[bucketKey] = 0;
    });
    return buckets;
  }

  async getAnalytics() {
    try {
      await streamSubmissions((batch) => {
        this.accumulateData(batch);
      });

      return this.calculateFinalResults();
    } catch (err) {
      throw new InternalError("Failed to compute analytics", {
        cause: err.message,
      });
    }
  }

  accumulateData(submissions) {
    submissions.forEach((submission) => {
      genderService(submission.gender, this.genderCounts);

      const ageResult = ageService(submission.birthdate, {
        ageBuckets: this.ageBuckets,
        ageSum: this.ageSum,
        validAgeCount: this.validAgeCount,
      });

      if (ageResult) {
        this.ageSum = ageResult.ageSum;
        this.validAgeCount = ageResult.validAgeCount;
      }

      const timelineResult = timelineService(submission.createdAt, {
        dailySubmissions: this.dailySubmissions,
        lastSubmissionAt: this.lastSubmissionAt,
      });

      if (timelineResult) {
        this.lastSubmissionAt = timelineResult.lastSubmissionAt;
      }

      this.totalSubmissions++;
    });
  }

  calculateFinalResults() {
    const averageAge =
      this.validAgeCount > 0
        ? Number((this.ageSum / this.validAgeCount).toFixed(1))
        : null;

    return {
      totalSubmissions: this.totalSubmissions,
      perGender: this.genderCounts,
      averageAgeYears: averageAge,
      ageBuckets: this.ageBuckets,
      dailySubmissions: this.dailySubmissions,
      lastSubmissionAt: this.lastSubmissionAt,
    };
  }
}

export function getAnalytics() {
  const analyticsService = new AnalyticsService();
  return analyticsService.getAnalytics();
}
