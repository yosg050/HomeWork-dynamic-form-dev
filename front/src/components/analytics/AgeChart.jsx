import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";

export function AgeChart({ data }) {


  if (!data || Object.keys(data).length === 0) {
    return (
      <Card sx={{ textAlign: "center", py: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Age Distribution
          </Typography>
          <Typography color="textSecondary">No data available</Typography>
        </CardContent>
      </Card>
    );
  }

  const total = Object.values(data).reduce((sum, count) => sum + count, 0);

  const sortedEntries = Object.entries(data).sort((a, b) => {
    const order = ["0-17", "18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
    return order.indexOf(a[0]) - order.indexOf(b[0]);
  });

  const ageColors = [
    "#4caf50",
    "#2196f3",
    "#ff9800",
    "#f44336",
    "#9c27b0",
    "#607d8b",
    "#795548",
    "#9e9e9e",
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ textAlign: "center" }}>
          Age Distribution
        </Typography>
        <Box sx={{ mt: 3 }}>
          {sortedEntries.map(([ageGroup, count], index) => {
            const percentage = total > 0 ? (count / total) * 100 : 0;
            return (
              <Box key={ageGroup} sx={{ mb: 3 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography variant="body1" fontWeight="medium">
                    {ageGroup}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {count} ({percentage.toFixed(1)}%)
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={percentage}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "rgba(0,0,0,0.1)",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: ageColors[index % ageColors.length],
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
