import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";

export function SubmissionsTimelineChart({ data }) {

  if (
    !data ||
    !data.submissionsTimeline ||
    Object.keys(data.submissionsTimeline).length === 0
  ) {
    return (
      <Card sx={{ textAlign: "center", py: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Submissions Timeline
          </Typography>
          <Typography color="textSecondary">No data available</Typography>
        </CardContent>
      </Card>
    );
  }

  const timeline = data.submissionsTimeline;
  const timelineStats = data.timelineStats || {};


  const timelineData = Object.entries(timeline)
    .map(([date, count]) => {
      const localDate = new Date(`${date}T12:00:00`);
      return {
        date,
        count,
        dayName: localDate.toLocaleDateString("en-US", { weekday: "short" }),
        formattedDate: localDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        fullDate: localDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      };
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const totalSubmissions = timelineStats.totalDays
    ? Object.values(timeline).reduce((sum, count) => sum + count, 0)
    : 0;
  const maxCount = Math.max(...Object.values(timeline));
  const peakDay = timelineStats.peakDay;

  const getBarColor = (count, index) => {
    if (count === 0) return "#f5f5f5";
    if (count === maxCount && count > 0) return "#f44336";
    if (count >= maxCount * 0.7) return "#ff9800";
    if (count >= maxCount * 0.4) return "#2196f3";
    return "#4caf50";
  };

  const getBarHeight = (count) => {
    if (maxCount === 0) return 2;
    const minHeight = 2;
    const maxHeight = 40;
    return minHeight + (count / maxCount) * (maxHeight - minHeight);
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <Box display="flex" alignItems="center">
            <BarChartIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="h6" component="div">
              Complete Submissions Timeline
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            gap: 1,
            overflowX: "auto",
            pb: 2,
            minHeight: 80,
            width: "100%",
            px: 1,
          }}
        >
          {timelineData.map((day, index) => {
            const barHeight = getBarHeight(day.count);
            const barColor = getBarColor(day.count, index);
            const isPeak = day.date === peakDay;

            return (
              <Box
                key={day.date}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flex: "1 1 auto",
                  minWidth: "30px",
                  cursor: "pointer",
                  "&:hover": {
                    "& .bar": {
                      transform: "scaleY(1.1)",
                      boxShadow: 2,
                    },
                    "& .date-label": {
                      fontWeight: "bold",
                      color: "primary.main",
                    },
                  },
                }}
              >
                <Box
                  className="bar"
                  sx={{
                    width: "100%",
                    maxWidth: "24px",
                    height: `${barHeight}px`,
                    backgroundColor: barColor,
                    borderRadius: "2px 2px 0 0",
                    transition: "all 0.3s ease-in-out",
                    border: isPeak ? "2px solid #f44336" : "none",
                    position: "relative",
                    "&::after": isPeak
                      ? {
                          content: '"★"',
                          position: "absolute",
                          top: -20,
                          left: "50%",
                          transform: "translateX(-50%)",
                          color: "#f44336",
                          fontSize: "12px",
                        }
                      : {},
                  }}
                />

                {day.count > 0 && (
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 0.5,
                      fontSize: "10px",
                      color:
                        day.count === maxCount
                          ? "error.main"
                          : "text.secondary",
                      fontWeight: day.count === maxCount ? "bold" : "normal",
                    }}
                  >
                    {day.count}
                  </Typography>
                )}

                {(index % Math.max(1, Math.floor(timelineData.length / 8)) ===
                  0 ||
                  day.count > 0) && (
                  <Typography
                    className="date-label"
                    variant="caption"
                    sx={{
                      mt: 1,
                      fontSize: "8px",
                      color: "text.secondary",
                      transform: "rotate(-45deg)",
                      transformOrigin: "center",
                      minWidth: "25px",
                      textAlign: "center",
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    {day.formattedDate}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="caption" color="textSecondary">
              Period: {timelineData[0]?.fullDate} -{" "}
              {timelineData[timelineData.length - 1]?.fullDate}
            </Typography>
          </Box>

          <Box display="flex" gap={2}>
            {timelineStats.averageSubmissionsPerDay && (
              <Typography variant="caption" color="textSecondary">
                Avg: {timelineStats.averageSubmissionsPerDay}/day
              </Typography>
            )}
            {timelineStats.daysWithSubmissions && (
              <Typography variant="caption" color="textSecondary">
                Active days: {timelineStats.daysWithSubmissions}/
                {timelineStats.totalDays}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
