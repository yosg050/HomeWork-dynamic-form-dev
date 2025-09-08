import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function FormActions({ children, justify = "flex-end", spacing = 1 }) {
  return (
    <Stack
      direction="row"
      spacing={spacing}
      justifyContent={justify}
      alignItems="center"
    >
      {children}
    </Stack>
  );
}

FormActions.Submit = function Submit({ disabled, label = "Submit" }) {
  return (
    <Button type="submit" variant="contained" disabled={disabled}>
      {label}
    </Button>
  );
};

FormActions.Reset = function Reset({ onClick, disabled, label = "Reset" }) {
  return (
    <Button
      type="button"
      variant="outlined"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
};

export default FormActions;
