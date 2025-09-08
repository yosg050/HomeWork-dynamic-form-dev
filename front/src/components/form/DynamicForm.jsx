import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "./FormField.jsx";
import { buildYupFromSchema } from "../../../../shared/index.js";
import { getDefaultValues } from "../../helpers/schemaUtils.js";

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

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={handleSubmit(submit)} autoComplete="off">
        <Stack spacing={2}>
          {(schema?.fields ?? []).map((fld) => (
            <FormField key={fld.name} field={fld} />
          ))}

          <Button
            type="submit"
            variant="contained"
            disabled={!!submitting}
            sx={{ alignSelf: "flex-start" }}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
}
