import { GenderAnalyzerService } from "./analytics/genderAnalyzer.Service.js";
import { AgeAnalyzerService } from "./analytics/ageAnalyzer.Service.js";
import { TimeAnalyzerService } from "./analytics/timeAnalyzer.Service.js";
import { SubmissionsTimelineService } from "./analytics/submissionsTimeline.Service.js";
import { DataCollectorService } from "./analytics/dataCollector.Service.js";
import { InternalError } from "../errors/DomainErrors.js";

export class AnalyticsService {
  constructor() {
    this.dataCollector = new DataCollectorService();
  }

  calculateStatistics(submissions) {
    // Initialize analyzers for each calculation
    const genderAnalyzer = new GenderAnalyzerService();
    const ageAnalyzer = new AgeAnalyzerService();
    const timeAnalyzer = new TimeAnalyzerService();
    const timelineAnalyzer = new SubmissionsTimelineService();

    // Process each submission through all analyzers
    submissions.forEach((submission) => {
      genderAnalyzer.processSubmission(submission);
      ageAnalyzer.processSubmission(submission);
      timeAnalyzer.processSubmission(submission);
      timelineAnalyzer.processSubmission(submission);
    });

    // Collect results from all analyzers
    const genderResults = genderAnalyzer.getResults();
    const ageResults = ageAnalyzer.getResults();
    const timeResults = timeAnalyzer.getResults();
    const timelineResults = timelineAnalyzer.getTimelineForChart();

    return {
      totalSubmissions: submissions.length,
      ...genderResults,
      ...ageResults,
      derived: {
        ageBuckets: ageResults.ageBuckets,
        ...timeResults,
        // Timeline data for the new chart
        submissionsTimeline: timelineResults.timeline,
        timelineStats: timelineResults.stats,
        submissions: timelineResults.submissions, // For chart component
      },
    };
  }

  async getAnalytics() {
    try {
      const submissions = await this.dataCollector.fetchAllSubmissions();
      const analytics = this.calculateStatistics(submissions);

      return analytics;
    } catch (err) {
      throw new InternalError("Failed to compute analytics", {
        cause: err.message,
      });
    }
  }
}

// For backward compatibility - export function as before
const analyticsService = new AnalyticsService();
export function getAnalytics() {
  return analyticsService.getAnalytics();
}
