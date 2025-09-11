import { Grid } from "@mui/material";
import { StatsCard } from "./StatsCard";
import PersonIcon from "@mui/icons-material/Person";
import CakeIcon from "@mui/icons-material/Cake";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BarChartIcon from "@mui/icons-material/BarChart";

export function SummaryCards({ data }) {
  const total = data?.totalSubmissions ?? 0;
  const avgAge = data?.averageAgeYears;
  const agesCounted = data?.derived?.agesCounted ?? 0;
  const lastSubmission = data?.derived?.lastSubmissionAt;

  const formatDate = (isoString) => {
    if (!isoString) return "Never";
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatAge = (age) => {
    if (age === null || age === undefined) return "N/A";
    return `${age} years`;
  };

  return (
    <Grid 
      container 
      spacing={2}
      justifyContent="center"
    >
      <Grid size={{ xs: 6, sm: 3 }}>
        <StatsCard
          title="Total Submissions"
          value={total.toLocaleString()}
          icon={<PersonIcon />}
          color="primary"
        />
      </Grid>

      <Grid size={{ xs: 6, sm: 3 }}>
        <StatsCard
          title="Average Age"
          value={formatAge(avgAge)}
          icon={<CakeIcon />}
          color="secondary"
        />
      </Grid>

      <Grid size={{ xs: 6, sm: 3 }}>
        <StatsCard
          title="Valid Ages"
          value={agesCounted.toLocaleString()}
          icon={<BarChartIcon />}
          color="success"
        />
      </Grid>

      <Grid size={{ xs: 6, sm: 3 }}>
        <StatsCard
          title="Last Submission"
          value={formatDate(lastSubmission)}
          icon={<AccessTimeIcon />}
          color="info"
        />
      </Grid>
    </Grid>
  );
}