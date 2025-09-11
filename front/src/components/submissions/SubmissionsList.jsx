import { Stack } from "@mui/material";
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

// import { useQuery } from "@tanstack/react-query";
// import Paper from "@mui/material/Paper";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import Divider from "@mui/material/Divider";
// import CircularProgress from "@mui/material/CircularProgress";
// import Alert from "@mui/material/Alert";
// import { listSubmissions } from "../../api/submissions";

// function fmt(d) {
//   try {
//     return new Date(d).toLocaleString();
//   } catch {
//     return d;
//   }
// }

// export default function SubmissionsList() {
//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: ["submissions"],
//     queryFn: listSubmissions,
//     refetchOnWindowFocus: false,
//   });

//   return (
//     <Paper variant="outlined" sx={{ p: 2, height: "100%", overflow: "auto" }}>
//       <Stack spacing={2}>
//         <Typography variant="h6">Past Submissions</Typography>
//         {isLoading && <CircularProgress sx={{ alignSelf: "center", my: 2 }} />}
//         {error && <Alert severity="error">Failed to load submissions</Alert>}
//         {!isLoading && !error && (
//           <List
//             dense
//             sx={{
//               width: "100%",
//               width: "100%",
//               maxHeight: "60vh",
//               overflow: "auto",
//             }}
//           >
//             {(data ?? []).map((row, idx) => (
//               <Stack key={row.id ?? idx}>
//                 <ListItem alignItems="flex-start">
//                   <ListItemText
//                     primary={`${row.username ?? "-"} · ${row.email ?? "-"}`}
//                     secondary={
//                       <>
//                         <span>Gender: {row.gender ?? "-"}</span>
//                         {" · "}
//                         <span>Birthdate: {row.birthdate ?? "-"}</span>
//                         {" · "}
//                         <span>{fmt(row.createdAt)}</span>
//                       </>
//                     }
//                   />
//                 </ListItem>
//                 <Divider component="li" />
//               </Stack>
//             ))}
//             {(data ?? []).length === 0 && (
//               <Typography variant="body2" color="text.secondary">
//                 No submissions yet.
//               </Typography>
//             )}
//           </List>
//         )}
//       </Stack>
//     </Paper>
//   );
// }
