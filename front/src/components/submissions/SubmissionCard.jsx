import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

function fmt(d) {
  try {
    return new Date(d).toLocaleString();
  } catch {
    return d ?? "-";
  }
}


export default function SubmissionCard({ row }) {

  return (
    <Card variant="outlined">
      <CardHeader
        title={`${row?.username ?? "-"} · ${row?.email ?? "-"}`}
        subheader={fmt(row?.createdAt)}
        sx={{ pb: 0.5 }}
      />
      <Divider />
      <CardContent sx={{ pt: 1.5 }}>
        <Stack spacing={0.5}>
          <Typography variant="body2">
            <strong>Gender:</strong> {row?.gender ?? "-"}
          </Typography>
          <Typography variant="body2">
            <strong>Birthdate:</strong> {row?.birthdate ?? "-"}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
