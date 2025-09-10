import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DynamicForm from "../components/form/DynamicForm.jsx";
// import SubmissionsList from "../features/submissions/SubmissionsListTest.jsx";
import Grid from "@mui/material/Grid";
import { useCallback, useEffect, useState } from "react";
// import { fetchSchema, postSubmission } from "../api/submissions.js";
import Toast from "../components/common/Toast.jsx";
import SubmissionsList from "../components/submissions/SubmissionsList.jsx";
import { getSchema } from "../api/schema.js";
import { postSubmission } from "../api/submissions.js";
import { Box } from "@mui/material";
import SubmissionsTabs from "../components/submissions/SubmissionsTabs.jsx";
import { useCachedSubmissions } from "../queries/submissions.js";

export default function DynamicFormPage() {
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [snack, setSnack] = useState({
    open: false,
    severity: "success",
    msg: "",
  });
  const { mutateAsync: createSubmission, isPending } = useCachedSubmissions();

  useEffect(() => {
    getSchema()
      .then((res) => setSchema(res?.schema ?? res))
      .catch((e) => setErr(e.message || "Failed to load schema"))
      .finally(() => setLoading(false));
  }, []);

  const handleFormSubmit = useCallback(async (formData) => {
    try {
      const res = await postSubmission(formData);
      if (res?.ok) {
        setSnack({
          open: true,
          severity: "success",
          msg: res.message || "Submission saved successfully!",
        });
        await createSubmission(formData);
        return true;
      } else {
        setSnack({
          open: true,
          severity: "error",
          msg: res?.error || "Submission failed.",
        });
        return false;
      }
    } catch {
      setSnack({
        open: true,
        severity: "error",
        msg: "Server error. Please try again later.",
      });
      return false;
    }
  }, []);

  if (loading) return <Container sx={{ py: 3 }}>Loading…</Container>;
  if (err) return <Container sx={{ py: 3 }}>Error: {err}</Container>;
  if (!schema) return <Container sx={{ py: 3 }}>No schema</Container>;

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Grid container spacing={3} sx={{ height: "calc(100vh - 100px)" }}>
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
              {schema.title}
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
            <Typography variant="h6" sx={{ mb: 2 }}>
              Submissions
            </Typography>
            <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
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
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        variant="filled"
        snackKey={`${snack.severity}-${snack.msg}`}
      />
    </Container>
  );
}
