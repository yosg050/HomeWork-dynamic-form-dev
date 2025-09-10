import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "./FormField.jsx";
import { buildYupFromSchema } from "../../../../shared/index.js";
import { getDefaultValues } from "../../helpers/schemaUtils.js";
import FormActions from "./FormActions.jsx";

export default function DynamicForm({ schema, onSubmit, submitting }) {
  const yupSchema = buildYupFromSchema(schema);
  const form = useForm({
    defaultValues: getDefaultValues(schema),
    resolver: yupResolver(yupSchema),
    mode: "onBlur",
  });

  const { handleSubmit, reset } = form;

  const submit = async (data) => {
    const ok = await onSubmit(data);
    if (ok) reset(getDefaultValues(schema));
  };
  const handleReset = () => reset(getDefaultValues(schema));

  return (
    <FormProvider {...form}>
      <Box
        component="form"
        onSubmit={handleSubmit(submit)}
        autoComplete="off"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Stack spacing={3} sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {(schema?.fields ?? []).map((fld) => (
              <FormField key={fld.name} field={fld} />
            ))}
          </Box>

          <FormActions justify="center" spacing={1.5}>
            <FormActions.Submit
              disabled={!!submitting}
              label={submitting ? "Submitting..." : "Submit"}
            />
            <FormActions.Reset
              onClick={handleReset}
              disabled={!!submitting}
              label="Reset"
            />
          </FormActions>
        </Stack>
      </Box>
    </FormProvider>
  );
}
