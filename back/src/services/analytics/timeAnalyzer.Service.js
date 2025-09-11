export class TimeAnalyzerService {
  constructor() {
    this.lastSubmissionAt = null;
  }

  processSubmission(submission) {
    if (submission.createdAt) {
      const submissionDate = new Date(submission.createdAt);
      if (!isNaN(submissionDate.getTime())) {
        if (
          !this.lastSubmissionAt ||
          submissionDate > new Date(this.lastSubmissionAt)
        ) {
          this.lastSubmissionAt = submissionDate.toISOString();
        }
      }
    }
  }

  getResults() {
    return {
      lastSubmissionAt: this.lastSubmissionAt,
    };
  }
}
