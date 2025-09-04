import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DynamicForm from "../features/form/DynamicForm.jsx";
import SubmissionsList from "../features/submissions/SubmissionsList.jsx";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { fetchSchema } from "../lib/api.js";

export default function DynamicFormPage() {
  const [schema, setSchema] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetchSchema()
      .then(setSchema)
      .catch((e) => setErr(e.message || "Failed to load schema"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Container sx={{ py: 3 }}>Loading…</Container>;
  if (err) return <Container sx={{ py: 3 }}>Error: {err}</Container>;
  if (!schema) return <Container sx={{ py: 3 }}>No schema</Container>;

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <Paper
            elevation={2}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 3,
              mx: "auto",
              maxWidth: 720,
            }}
          >
            <Typography variant="h5" align="center" sx={{ mb: 2 }}>
              {schema.title}
            </Typography>
            <DynamicForm schema={schema} />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 6 }}>
          <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Submissions
            </Typography>
            <SubmissionsList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
