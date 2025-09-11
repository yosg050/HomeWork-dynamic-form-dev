import { Stack, Typography } from "@mui/material";
import SubmissionCard from "./SubmissionCard";

export default function SubmissionsList({items = []}) {
    if (!items.length) {
      return (
        <Typography variant="body2" color="text.secondary">
          No submissions yet.
        </Typography>
      );
    }
    return (
      <Stack spacing={2}>
        {items.map((row, idx) => (
          <SubmissionCard key={row.id ?? idx} row={row} />
        ))}
      </Stack>
    );
}

