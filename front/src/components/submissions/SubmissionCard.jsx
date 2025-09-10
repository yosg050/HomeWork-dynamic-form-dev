import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

export default function SubmissionCard({ row }) {
  const fmt = (d) => {
    try {
      return new Date(d).toLocaleString();
    } catch {
      return d ?? "-";
    }
  };
  const fmtDate = (d) => {
    try {
      return new Date(d).toLocaleDateString("he-IL", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });
    } catch {
      return d ?? "-";
    }
  };

  return (
    <Card variant="outlined">
      <CardHeader
        title={`${row?.username ?? "-"}`}
        sx={{ pb: 0.4, textAlign: "center" }}
      />
      <Divider />

      <CardContent sx={{ textAlign: "center" }}>
        <Stack spacing={0.5}>
          <Typography variant="body2">
            <strong>Created At:</strong> {fmt(row?.createdAt)}
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong> {row?.email ?? "-"}
          </Typography>
          <Typography variant="body2">
            <strong>Gender:</strong> {row?.gender ?? "-"}
          </Typography>
          <Typography variant="body2">
            <strong>Birthdate:</strong> {fmtDate(row?.birthdate)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
