import { incrementMapCounter, mapToObject } from "../../utils/mapHelpers.js";

export class GenderAnalyzerService {
  constructor() {
    this.genderCounts = new Map();
  }

  processSubmission(submission) {
    incrementMapCounter(this.genderCounts, submission.gender);
  }

  getResults() {
    return {
      perGender: mapToObject(this.genderCounts),
    };
  }
}
