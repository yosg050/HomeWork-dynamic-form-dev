import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { form as schema } from "./../../shared/schemes";
import { useForm, Controller } from "react-hook-form";
import { buildYupFromSchema } from "../../shared";
import MenuItem from "@mui/material/MenuItem";

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

  return (
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
            const isDateOrNumber = fld.type === "date" || fld.type === "number";

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
                  inputLabel: isDateOrNumber ? { shrink: true } : undefined,
                }}
                inputProps={{
                  ...(fld.type === "number" ? { step: "1" } : {}),
                }}
              >
                {isSelect && (fld.options || []).map((opt) => (
                    <MenuItem key={String(opt)} >
                        {String(opt)}
                    </MenuItem>
                ))}
              </TextField>
            );
          }}
        />
      ))}
    </Box>
  );
}

{/* <div>
  <TextField
    required
    id="outlined-required"
    label="Required"
    defaultValue="Hello World"
  />
  <TextField
    disabled
    id="outlined-disabled"
    label="Disabled"
    defaultValue="Hello World"
  />
  <TextField
    id="outlined-password-input"
    label="Password"
    type="password"
    autoComplete="current-password"
  />
  <TextField
    id="outlined-read-only-input"
    label="Read Only"
    defaultValue="Hello World"
    slotProps={{
      input: {
        readOnly: true,
      },
    }}
  />
  <TextField
    id="outlined-number"
    label="Number"
    type="number"
    slotProps={{
      inputLabel: {
        shrink: true,
      },
    }}
  />
  <TextField id="outlined-search" label="Search field" type="search" />
  <TextField
    id="outlined-helperText"
    label="Helper text"
    defaultValue="Default Value"
    helperText="Some important text"
  />
</div> */}