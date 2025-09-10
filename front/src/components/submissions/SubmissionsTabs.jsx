import { Box, CircularProgress, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useSubmissions } from "../../queries/submissions";
import { useMemo, useState } from "react";
import SubmissionsList from "./SubmissionsList";


function filterByTab(items, tab) {
  if (tab === "all") return items;
  return (items ?? []).filter((r) => (r?.gender ?? "").toLowerCase() === tab);
}


export default function SubmissionsTabs() {
  const { data, isLoading, isError } = useSubmissions();

  return (
    <Paper variant="outlined" sx={{ p: 2, height: "100%", overflow: "auto" }}>
      <Stack spacing={2}>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && <Alert severity="error">Failed to load submissions</Alert>}

        {!isLoading && !isError && <SubmissionsList items={data ?? []} />}
      </Stack>
    </Paper>
  );
}