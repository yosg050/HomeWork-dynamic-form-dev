import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const normalizeOptions = (fld) =>
  (fld.options || []).map((opt) =>
    typeof opt === "object" && opt !== null
      ? { value: opt.value, label: opt.label ?? String(opt.value) }
      : { value: opt, label: String(opt) }
  );

const mapType = (t) =>
  t === "password"
    ? "password"
    : t === "email"
    ? "email"
    : t === "date"
    ? "date"
    : t === "number"
    ? "number"
    : "text";

export default function FormField({ field }) {
  const { control } = useFormContext();
  const isSelect = field.type === "select";
  const options = isSelect ? normalizeOptions(field) : [];

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: rhf, fieldState }) => (
        <TextField
          {...rhf}
          fullWidth
          size="small"
          required={!!field.required}
          label={field.label}
          select={isSelect}
          type={!isSelect ? mapType(field.type) : undefined}
          InputLabelProps={
            !isSelect && field.type === "date" ? { shrink: true } : undefined
          }
          inputProps={
            !isSelect && field.type === "number" ? { step: "1" } : undefined
          }
          error={!!fieldState.error}
          helperText={fieldState.error?.message || " "}
        >
          {isSelect &&
            options.map((opt) => (
              <MenuItem key={String(opt.value)} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
        </TextField>
      )}
    />
  );
}
