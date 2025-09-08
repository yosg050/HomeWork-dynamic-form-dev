import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DynamicForm from "../components/form/DynamicForm.jsx";
// import SubmissionsList from "../features/submissions/SubmissionsListTest.jsx";
import Grid from "@mui/material/Grid";
import { useCallback, useEffect, useState } from "react";
// import { fetchSchema, postSubmission } from "../api/submissions.js";
import Toast from "../components/Toast.jsx";
import SubmissionsList from "../components/submissions/SubmissionsList.jsx";
import { getSchema } from "../api/schema.js";
import { postSubmission } from "../api/submissions.js";

export default function DynamicFormPage() {
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [snack, setSnack] = useState({
    open: false,
    severity: "success",
    msg: "",
  });

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
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={8} lg={8}>
          <Paper
            elevation={2}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              mx: "auto",
            }}
          >
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
              {schema.title}
            </Typography>
            <DynamicForm schema={schema} onSubmit={handleFormSubmit} />{" "}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Submissions
            </Typography>
            <SubmissionsList />
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
