// import { Alert, Box, CircularProgress, Paper, Stack } from "@mui/material";
// import { useSubmissions } from "../../queries/submissions";
// import SubmissionsList from "./SubmissionsList";


// function filterByTab(items, tab) {
//   if (tab === "all") return items;
//   return (items ?? []).filter((r) => (r?.gender ?? "").toLowerCase() === tab);
// }


// export default function SubmissionsTabs() {
//   const { data, isLoading, isError } = useSubmissions();

//   return (
//     <Paper variant="outlined" sx={{ p: 2, height: "100%", overflow: "auto" }}>
//       <Stack spacing={2}>

//         {isLoading && (
//           <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
//             <CircularProgress />
//           </Box>
//         )}

//         {isError && <Alert severity="error">Failed to load submissions</Alert>}

//         {!isLoading && !isError && <SubmissionsList items={data ?? []} />}
//       </Stack>
//     </Paper>
//   );
// }

import { useEffect, useRef } from "react";
import {
  Stack,
  Typography,
  Divider,
  CircularProgress,
  Button,
  Paper,
} from "@mui/material";
import SubmissionCard from "./SubmissionCard";
import { useSubmissionsInfinite } from "../../queries/submissions";
// import { useSubmissionsInfinite } from "../../hooks/useSubmissions";

export default function SubmissionsTabs() {
  const LIMIT = 50;
  const {
    data,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSubmissionsInfinite(LIMIT);

  const items = data?.pages?.flatMap((p) => p.items) ?? [];

  // אינסוף-גלילה: כשמגיעים לתחתית נטען עוד
  const sentinelRef = useRef(null);
  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage || isFetchingNextPage) return;
    const io = new IntersectionObserver(
      (entries) => entries[0]?.isIntersecting && fetchNextPage(),
      { root: null, rootMargin: "120px", threshold: 0.01 }
    );
    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <Stack alignItems="center" sx={{ py: 4 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack spacing={2} sx={{ py: 2 }}>
        <Typography color="error">
          Failed to load submissions: {String(error.message || error)}
        </Typography>
        <Button onClick={() => refetch()}>Retry</Button>
      </Stack>
    );
  }

  if (!items.length) {
    return (
      <Typography variant="body2" color="text.secondary">
        No submissions yet.
      </Typography>
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: 2, height: "100%", overflow: "auto" }}>


      <Stack spacing={2}>
        {items.map((row, idx) => (
          <div key={row.hash ?? row.id ?? row.createdAt ?? idx}>
            {/* <SubmissionCard row={row} /> */}
            <SubmissionCard key={row.hash ?? row.id ?? idx} row={row} />
            <Divider />
          </div>
        ))}
      </Stack>

      <Stack alignItems="center" sx={{ py: 2 }}>
        {isFetchingNextPage && <CircularProgress size={24} />}
        {!isFetchingNextPage && hasNextPage && (
          <Button onClick={() => fetchNextPage()}>Load more</Button>
        )}
        <div ref={sentinelRef} style={{ height: 1 }} />
        {!hasNextPage && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            No more results.
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}
