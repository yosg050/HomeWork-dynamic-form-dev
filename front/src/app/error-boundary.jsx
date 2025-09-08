import { Component } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <Stack spacing={2}>
        <Alert severity="error">Something went wrong.</Alert>
        <pre style={{ whiteSpace: "pre-wrap" }}>{String(this.state.error)}</pre>
        <Button variant="outlined" onClick={() => location.reload()}>
          Reload
        </Button>
      </Stack>
    );
  }
}
