import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DynamicForm from "../features/form/DynamicForm.jsx";
import SubmissionsList from "../features/submissions/SubmissionsList.jsx";
import { form as schema } from "../../shared/schemas/userRegistration.js";

export default function DynamicFormPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {schema.title}
            </Typography>
            <DynamicForm schema={schema} />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={1} sx={{ p: 2 }}>
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
