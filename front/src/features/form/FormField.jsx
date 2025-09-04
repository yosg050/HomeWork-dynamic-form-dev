import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const normalizeOptions = (fld) =>
  (fld.options || []).map((opt) =>
    typeof opt === "object" && opt !== null
      ? { value: opt.value, label: opt.label ?? String(opt.value) }
      : { value: opt, label: String(opt) }
  );

export default function FormField({ fld, form }) {
  const {
    control,
    formState: { errors },
  } = form;
  const isSelect = fld.type === "select";
  const isDateOrNumber = fld.type === "date" || fld.type === "number";
  const options = isSelect ? normalizeOptions(fld) : [];

  return (
    <Controller
      name={fld.name}
      control={control}
      render={({ field }) => {
        const err = errors[fld.name]?.message;
        return (
          <TextField
            {...field}
            fullWidth
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
  );
}
