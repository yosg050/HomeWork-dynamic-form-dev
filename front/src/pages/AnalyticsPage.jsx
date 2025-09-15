import { Suspense } from "react";
import {
  Alert,
  CircularProgress,
  Grid,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { SummaryCards } from "../components/analytics/SummaryCards";
import { GenderChart } from "../components/analytics/GenderChart";
import { AgeChart } from "../components/analytics/AgeChart";
import Loading from "../components/common/Loading";
import { SubmissionsTimelineChart } from "../components/analytics/SubmissionsTimelineChart";
import { useAnalytics } from "../hooks/analytics";

function AnalyticsContent() {
  const { data, isLoading, error } = useAnalytics();
  

  if (isLoading) {
    return (
      <Container sx={{ textAlign: "center", py: 8 }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading Analytics...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error" sx={{ textAlign: "center" }}>
          <Typography variant="h6">Failed to load analytics</Typography>
          <Typography variant="body2">
            {error.message || "Please try refreshing the page"}
          </Typography>
        </Alert>
      </Container>
    );
  }

  const analyticsData = data || {};

  return (
    <Box sx={{ width: "100%", overflowY: "auto" }}>
      <Container
        maxWidth="lg"
        sx={{
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: 4,
        }}
      >
        {/* Page Header */}
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            mx: "auto",
            maxWidth: "800px",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Analytics Dashboard
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Overview of form submissions and user demographics
          </Typography>
        </Box>

        {/* Summary Cards */}
        <Box sx={{ mb: 4, mx: "auto", maxWidth: "1000px" }}>
          <SummaryCards data={analyticsData} />
        </Box>

        {/* Charts Section */}
        <Box sx={{ mb: 4, mx: "auto", maxWidth: "900px" }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid size={{ xs: 10, md: 6 }}>
              <GenderChart data={analyticsData.perGender} />
            </Grid>
            <Grid size={{ xs: 10, md: 6 }}>
              <AgeChart data={analyticsData.ageBuckets} />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container spacing={3} justifyContent="center">
            <Grid size={{ xs: 10, md: 10 }}>
              <SubmissionsTimelineChart data={analyticsData.dailySubmissions} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default function AnalyticsPage() {
  return (
    <Box sx={{ minHeight: "100vh", width: "100%" }}>
      <Suspense
        fallback={
          <Container sx={{ textAlign: "center", py: 8 }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              <Loading />
            </Typography>
          </Container>
        }
      >
        <AnalyticsContent />
      </Suspense>
    </Box>
  );
}
