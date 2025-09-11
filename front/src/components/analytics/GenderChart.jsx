// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   LinearProgress,
// } from "@mui/material";

// export function GenderChart({ data }) {
//   if (!data || Object.keys(data).length === 0) {
//     return (
//       <Card>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Gender Distribution
//           </Typography>
//           <Typography color="textSecondary">No data available</Typography>
//         </CardContent>
//       </Card>
//     );
//   }

//   const total = Object.values(data).reduce((sum, count) => sum + count, 0);

//   const genderColors = {
//     Male: "#2196f3",
//     Female: "#e91e63",
//     Other: "#ff9800",
//     Unknown: "#9e9e9e",
//   };

//   return (
//     <Card>
//       <CardContent>
//         <Typography variant="h6" gutterBottom>
//           Gender Distribution
//         </Typography>
//         <Box sx={{ mt: 2 }}>
//           {Object.entries(data).map(([gender, count]) => {
//             const percentage = total > 0 ? (count / total) * 100 : 0;
//             return (
//               <Box key={gender} sx={{ mb: 2 }}>
//                 <Box
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                   mb={1}
//                 >
//                   <Typography variant="body2" fontWeight="medium">
//                     {gender}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {count} ({percentage.toFixed(1)}%)
//                   </Typography>
//                 </Box>
//                 <LinearProgress
//                   variant="determinate"
//                   value={percentage}
//                   sx={{
//                     height: 8,
//                     borderRadius: 4,
//                     backgroundColor: "rgba(0,0,0,0.1)",
//                     "& .MuiLinearProgress-bar": {
//                       backgroundColor: genderColors[gender] || "#9e9e9e",
//                       borderRadius: 4,
//                     },
//                   }}
//                 />
//               </Box>
//             );
//           })}
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }

import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";

export function GenderChart({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <Card sx={{ textAlign: "center", py: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Gender Distribution
          </Typography>
          <Typography color="textSecondary">No data available</Typography>
        </CardContent>
      </Card>
    );
  }

  const total = Object.values(data).reduce((sum, count) => sum + count, 0);

  const genderColors = {
    Male: "#2196f3",
    Female: "#e91e63",
    Other: "#ff9800",
    Unknown: "#9e9e9e",
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ textAlign: "center",  }}>
          Gender Distribution
        </Typography>
        <Box sx={{ mt: 3 }}>
          {Object.entries(data).map(([gender, count]) => {
            const percentage = total > 0 ? (count / total) * 100 : 0;
            return (
              <Box key={gender} sx={{ mb: 3 }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography variant="body1" fontWeight="medium">
                    {gender}
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
                      backgroundColor: genderColors[gender] || "#9e9e9e",
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
