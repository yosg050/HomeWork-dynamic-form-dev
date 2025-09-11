import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DynamicForm from "../components/form/DynamicForm.jsx";
import Grid from "@mui/material/Grid";
import { useCallback, useEffect, useState } from "react";
import Toast from "../components/common/Toast.jsx";
import { Box } from "@mui/material";
import SubmissionsTabs from "../components/submissions/SubmissionsTabs.jsx";
import { useCachedSubmissions } from "../hooks/submissions.js";
import Loading from "../components/common/Loading.jsx";
import { useSchema } from "../hooks/schema.js";

export default function DynamicFormPage() {
  const { data: schema, isLoading: loading, isError, error } = useSchema();
  const { mutateAsync: submitForm, isPending } = useCachedSubmissions();
  const [snack, setSnack] = useState({
    open: false,
    severity: "success",
    msg: "",
  });

  const err = isError ? error?.message || "Failed to load schema" : null;

  const handleFormSubmit = useCallback(
    async (formData) => {
      try {
        const res = await submitForm(formData);

        if (res?.ok) {
          setSnack({
            open: true,
            severity: "success",
            msg: res.message || "Submission saved successfully!",
          });
          return true;
        } else {
          let msg = res?.message || "Submission failed.";
          if (res?.error === "DUPLICATE_SUBMISSION") {
            msg = "This form already exists in the system.";
          }
          setSnack({ open: true, severity: "error", msg });
          return false;
        }
      } catch (err) {
        let msg = "Server error. Please try again later.";
        try {
          const raw = String(err?.message ?? "");
          const start = raw.indexOf("{");
          if (start >= 0) {
            const body = JSON.parse(raw.slice(start)); // { ok, error, message, details }
            if (body?.error === "DUPLICATE_SUBMISSION") {
              msg = "This form already exists in the system.";
            } else if (body?.message) {
              msg = body.message;
            }
          }
        } catch {}

        setSnack({ open: true, severity: "error", msg });
        return false;
      }
    },
    [submitForm]
  );

  if (loading)
    return (
      <Container sx={{ py: 3 }}>
        <Loading />
      </Container>
    );
  if (err) return <Container sx={{ py: 3 }}>Error: {err}</Container>;
  if (!schema) return <Container sx={{ py: 3 }}>No schema</Container>;

  return (
    <Container maxWidth={false} sx={{ py: 2 }}>
      <Grid
        container
        spacing={5}
        sx={{ height: "calc(100vh - 100px)", marginLeft: 5, marginRight: 5 }}
      >
        <Grid size={{ xs: 12, md: 5 }} sx={{ height: "100%" }}>
          <Paper
            elevation={1}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" align="center" sx={{ mb: 3 }}>
              {schema?.title ?? "Dynamic Form"}
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <DynamicForm
                schema={schema}
                onSubmit={handleFormSubmit}
                submitting={isPending}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }} sx={{ height: "100%" }}>
          <Paper
            elevation={1}
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
              Past Submissions{" "}
            </Typography>
            <Box sx={{ flexGrow: 1, overflow: "auto" }}>
              <SubmissionsTabs />
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Toast
        open={snack.open}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        severity={snack.severity}
        message={snack.msg}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        variant="filled"
        snackKey={`${snack.severity}-${snack.msg}`}
      />
    </Container>
  );
}
