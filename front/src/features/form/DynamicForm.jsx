import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "./FormField.jsx";
import FormActions from "./FormActions.jsx";
import { getDefaultValues, buildYupFromSchema } from "../../../shared/index.js";
import { postSubmission } from "../../lib/api.js";

export default function DynamicForm({ schema }) {
  const yupSchema = buildYupFromSchema(schema);
  const form = useForm({
    defaultValues: getDefaultValues(schema),
    resolver: yupResolver(yupSchema),
    mode: "onBlur",
  });
  const { handleSubmit, reset } = form;

  const onSubmit = async (data) => {
    // Send to API
    await postSubmission(data);
    // Reset according to the task
    reset(getDefaultValues(schema));
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Stack spacing={2}>
        {schema.fields.map((fld) => (
          <FormField key={fld.name} fld={fld} form={form} />
        ))}

        <FormActions
          onReset={() => reset(getDefaultValues(schema))}
          isSubmitting={form.formState.isSubmitting}
        >
          <Button
            type="submit"
            variant="contained"
            disabled={form.formState.isSubmitting}
          >
            Submit
          </Button>
        </FormActions>
      </Stack>
    </Box>
  );
}
