import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "./FormField.jsx";
import {
  getDefaultValues,
  buildYupFromSchema,
} from "../../../../shared/index.js";
import FormActions from "./FormActions.jsx";
import { postSubmission } from "../../lib/api.js";

export default function DynamicForm({ schema, onSubmit }) {
  const yupSchema = buildYupFromSchema(schema);

  const form = useForm({
    defaultValues: getDefaultValues(schema),
    resolver: yupResolver(yupSchema),
    mode: "onBlur",
  });

  const { handleSubmit, reset, formState } = form;

  // const onSubmit = async (data) => {
  //   console.log("Submitting", data);

  //   await postSubmission(data);
  //   reset(getDefaultValues(schema));
  // };
  const handleFormSubmit = async (data) => {
    const ok = await onSubmit?.(data);
    if (ok) reset(getDefaultValues(schema));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      autoComplete="off"
    >
      <Stack spacing={3} sx={{ width: 1 }}>
        {schema.fields.map((fld) => (
          <FormField key={fld.name} fld={fld} form={form} />
        ))}
        <FormActions justify="center">
          <FormActions.Reset
            onClick={() => reset(getDefaultValues(schema))}
            disabled={formState.isSubmitting}
          />
          <FormActions.Submit disabled={formState.isSubmitting} />
        </FormActions>
      </Stack>
    </Box>
  );
}
