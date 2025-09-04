import * as React from "react";
import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { form as schema } from "./../../shared/schema/schemes.js";
import { getDefaultValues, buildYupFromSchema } from "../../shared/index.js";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function DynamicForm() {
  const yupSchema = buildYupFromSchema(schema);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: getDefaultValues(schema),
    resolver: yupResolver(yupSchema),
    name: "onBlur",
  });

  const onSubmit = async (data) => {
    console.log("From Data: ", data);
  };

  const normalizeOptions = (fld) => {
    return (fld.options || []).map((opt) =>
      typeof opt === "object" && opt !== null
        ? { value: opt.value, label: opt.label ?? String(opt.value) }
        : { value: opt, label: String(opt) }
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {schema.title}
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
              sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            >
              {schema.fields.map((fld) => (
                <Controller
                  key={fld.name}
                  name={fld.name}
                  control={control}
                  render={({ field }) => {
                    const err = errors[fld.name]?.message;
                    const isSelect = fld.type === "select";
                    const isDateOrNumber =
                      fld.type === "date" || fld.type === "number";

                    const options = isSelect ? normalizeOptions(fld) : [];

                    return (
                      <TextField
                        {...field}
                        label={fld.label}
                        select={isSelect}
                        type={!isSelect ? fld.type : undefined}
                        required={!!fld.required}
                        error={!!err}
                        helperText={err || " "}
                        slotProps={{
                          inputLabel: isDateOrNumber
                            ? { shrink: true }
                            : undefined,
                        }}
                        inputProps={{
                          ...(fld.type === "number" ? { step: "1" } : {}),
                        }}
                      >
                        {isSelect &&
                          options.map((opt) => (
                            <MenuItem key={String(opt.value)} value={opt.value}>
                              {opt.label}
                            </MenuItem>
                          ))}
                      </TextField>
                    );
                  }}
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
