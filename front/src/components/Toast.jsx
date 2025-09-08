import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function Toast({
  open,
  onClose,
  message,
  severity = "info",
  autoHideDuration = 4000,
  anchorOrigin = { vertical: "bottom", horizontal: "center" },
  variant = "filled",
  snackKey,
}) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    onClose?.();
  };
  return (
    <Snackbar
      key={snackKey ?? `${severity}-${String(message)}`}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      disableWindowBlurListener
    >
      <MuiAlert
        onClose={handleClose}
        severity={severity}
        variant={variant}
        sx={{ width: "100%" }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
