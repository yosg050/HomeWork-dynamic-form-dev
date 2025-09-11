export class SubmissionsTimelineService {
  constructor() {
    this.dailySubmissions = new Map();
    this.firstSubmissionDate = null;
    this.lastSubmissionDate = null;
  }

  processSubmission(submission) {
    if (!submission || !submission.createdAt) {
      return;
    }

    const submissionDate = new Date(submission.createdAt);
    const dayKey = this.formatDateKey(submissionDate);

    // Track first and last submission dates
    if (
      !this.firstSubmissionDate ||
      submissionDate < this.firstSubmissionDate
    ) {
      this.firstSubmissionDate = submissionDate;
    }
    if (!this.lastSubmissionDate || submissionDate > this.lastSubmissionDate) {
      this.lastSubmissionDate = submissionDate;
    }

    // Count submissions per day
    if (this.dailySubmissions.has(dayKey)) {
      this.dailySubmissions.set(dayKey, this.dailySubmissions.get(dayKey) + 1);
    } else {
      this.dailySubmissions.set(dayKey, 1);
    }
  }

  formatDateKey(date) {
    // Format: YYYY-MM-DD
    return date.toISOString().split("T")[0];
  }

  generateDateRange(startDate, endDate) {
    const dates = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      dates.push(this.formatDateKey(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  }

  getResults() {
    // Return empty results if no submissions
    if (this.dailySubmissions.size === 0) {
      return {
        submissionsTimeline: {},
        timelineStats: {
          totalDays: 0,
          daysWithSubmissions: 0,
          averageSubmissionsPerDay: 0,
          peakDay: null,
          peakDayCount: 0,
          recentSevenDays: {},
        },
      };
    }

    // Generate complete timeline with all dates (fill missing days with 0)
    const allDates = this.generateDateRange(
      this.firstSubmissionDate,
      this.lastSubmissionDate
    );
    const completeTimeline = {};

    allDates.forEach((dateKey) => {
      completeTimeline[dateKey] = this.dailySubmissions.get(dateKey) || 0;
    });

    // Calculate statistics
    const submissionCounts = Array.from(this.dailySubmissions.values());
    const totalSubmissions = submissionCounts.reduce(
      (sum, count) => sum + count,
      0
    );
    const daysWithSubmissions = this.dailySubmissions.size;
    const totalDays = allDates.length;
    const averageSubmissionsPerDay =
      totalDays > 0 ? totalSubmissions / totalDays : 0;

    // Find peak day
    let peakDay = null;
    let peakDayCount = 0;
    this.dailySubmissions.forEach((count, date) => {
      if (count > peakDayCount) {
        peakDayCount = count;
        peakDay = date;
      }
    });

    // Get recent 7 days (or all days if less than 7)
    const recentDates = allDates.slice(-7);
    const recentSevenDays = {};
    recentDates.forEach((date) => {
      recentSevenDays[date] = completeTimeline[date];
    });

    return {
      submissionsTimeline: completeTimeline,
      timelineStats: {
        totalDays,
        daysWithSubmissions,
        averageSubmissionsPerDay:
          Math.round(averageSubmissionsPerDay * 100) / 100,
        peakDay,
        peakDayCount,
        recentSevenDays,
        firstSubmissionDate: this.firstSubmissionDate?.toISOString(),
        lastSubmissionDate: this.lastSubmissionDate?.toISOString(),
      },
    };
  }

  // Helper method to get data in format expected by frontend component
  getTimelineForChart() {
    const results = this.getResults();

    // Convert recent seven days to array format for easier frontend processing
    const recentTimeline = Object.entries(
      results.timelineStats.recentSevenDays
    ).map(([date, count]) => ({
      date,
      count,
      dayName: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
      formattedDate: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }));

    return {
      timeline: results.submissionsTimeline,
      recentTimeline,
      stats: results.timelineStats,
      submissions: recentTimeline, // For backward compatibility with your chart component
    };
  }
}
