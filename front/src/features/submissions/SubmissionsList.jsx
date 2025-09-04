import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function SubmissionsList() {
  const title = "Here will be the list of all forms.";
  return (
    <Stack spacing={1}>
      <Alert severity="warning">{title}</Alert>
    </Stack>
  );
}



// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
// import { useSubmissions } from "./useSubmissions.js";

// export default function SubmissionsList() {
//   const { data, isLoading, error } = useSubmissions();

//   if (isLoading) return <Typography>Loading…</Typography>;
//   if (error) return <Typography color="error">Failed to load</Typography>;
//   if (!data?.length) return (
//     <Typography variant="body2" color="text.secondary">
//       No submissions yet.
//     </Typography>
//   );

//   return (
//     <Stack spacing={1}>
//       {data.map((row, i) => (
//         <Typography key={i} variant="body2">
//           {JSON.stringify(row)}
//         </Typography>
//       ))}
//     </Stack>
//   );
// }
