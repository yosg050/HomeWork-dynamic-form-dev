export function timelineService(createdAt, timelineState) {
  if (!createdAt) return null;

  const submissionDate = new Date(createdAt);
  if (isNaN(submissionDate.getTime())) return null;

  const dayKey = submissionDate.toISOString().split("T")[0];
  timelineState.dailySubmissions[dayKey] =
    (timelineState.dailySubmissions[dayKey] || 0) + 1;

  const newLastSubmission =
    !timelineState.lastSubmissionAt ||
    submissionDate > timelineState.lastSubmissionAt
      ? submissionDate
      : timelineState.lastSubmissionAt;

  return {
    lastSubmissionAt: newLastSubmission,
  };
}
