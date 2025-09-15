import { Card, CardContent, Typography, Box } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";

export function SubmissionsTimelineChart({ data }) {
  if (!data || Object.keys(data).length === 0) {
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

  // Generate complete timeline
  const dates = Object.keys(data)
    .map((d) => new Date(d))
    .sort((a, b) => a - b);
  const timeline = {};
  const currentDate = new Date(dates[0]);

  while (currentDate <= dates[dates.length - 1]) {
    const dateKey = currentDate.toISOString().split("T")[0];
    timeline[dateKey] = data[dateKey] || 0;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const timelineData = Object.entries(timeline)
    .map(([date, count]) => ({
      date,
      count,
      formattedDate: new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const maxCount = Math.max(...Object.values(timeline));
  const totalSubmissions = Object.values(timeline).reduce(
    (sum, count) => sum + count,
    0
  );
  const avgPerDay = (totalSubmissions / Object.keys(timeline).length).toFixed(
    1
  );
  const activeDays = Object.values(timeline).filter(
    (count) => count > 0
  ).length;

  const getBarColor = (count) => {
    if (count === 0) return "#f5f5f5";
    if (count === maxCount) return "#f44336";
    if (count >= maxCount * 0.7) return "#ff9800";
    if (count >= maxCount * 0.4) return "#2196f3";
    return "#4caf50";
  };

  const getBarHeight = (count) =>
    maxCount === 0 ? 2 : 2 + (count / maxCount) * 38;

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <BarChartIcon sx={{ mr: 1, color: "primary.main" }} />
          <Typography variant="h6">Complete Submissions Timeline</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            gap: 1,
            overflowX: "auto",
            pb: 2,
            minHeight: 80,
          }}
        >
          {timelineData.map((day, index) => (
            <Box
              key={day.date}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: "1 1 auto",
                minWidth: "30px",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "24px",
                  height: `${getBarHeight(day.count)}px`,
                  backgroundColor: getBarColor(day.count),
                  borderRadius: "2px 2px 0 0",
                }}
              />

              {day.count > 0 && (
                <Typography
                  variant="caption"
                  sx={{ mt: 0.5, fontSize: "10px" }}
                >
                  {day.count}
                </Typography>
              )}

              {(index % Math.max(1, Math.floor(timelineData.length / 8)) ===
                0 ||
                day.count > 0) && (
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    fontSize: "8px",
                    color: "text.secondary",
                    transform: "rotate(-45deg)",
                    minWidth: "25px",
                    textAlign: "center",
                  }}
                >
                  {day.formattedDate}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
