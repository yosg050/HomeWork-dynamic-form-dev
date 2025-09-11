import "./App.css";
import { Outlet, useLocation, Link as RouterLink } from "react-router-dom";
import { Box, Button, LinearProgress } from "@mui/material";
import { Suspense } from "react";
import Loading from "./components/common/Loading";

function NavButton() {
  const { pathname } = useLocation();
  const isAnalytics = pathname.startsWith("/analytics");
  return (
    <Button
      variant="contained"
      disableElevation
      component={RouterLink}
      to={isAnalytics ? "/" : "/analytics"}
    >
      {isAnalytics ? "Form" : "Analytics"}
    </Button>
  );
}

export default function App() {
  return (
    <>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ pt: 4 }}>
          <Suspense fallback={<Loading/>}>
            <Outlet />
          </Suspense>
        </Box>
      </Box>
      <Box
        sx={{
          position: "fixed",
          top: 16,
          insetInlineEnd: 16,
          zIndex: (t) => t.zIndex.tooltip + 1,
          pointerEvents: "auto",
        }}
      >
        <NavButton />
      </Box>
    </>
  );
}
