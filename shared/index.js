import * as yup from "yup";


export function getDefaultValues(schema) {
  return Object.fromEntries(
    (schema.fields || []).map((f) => [f.name, f.default ?? ""])
  );
}

function validatorForField(fld) {
const reqMsg =
    fld.required === true
      ? `${fld.label || fld.name} is a required field`
      : undefined;

  switch (fld.type) {
    case "email": {
      let v = yup.string().email("Invalid email");
      if (reqMsg) v = v.required(reqMsg);
      if (fld.minLength)
        v = v.min(fld.minLength, `Minimum ${fld.minLength} characters`);
      if (fld.maxLength)
        v = v.max(fld.maxLength, `Maximum ${fld.maxLength} characters`);
      return v;
    }
    case "password": {
      let v = yup.string();
      if (reqMsg) v = v.required(reqMsg);
      if (fld.minLength)
        v = v.min(fld.minLength, `Minimum ${fld.minLength} characters`);
      if (fld.maxLength)
        v = v.max(fld.maxLength, `Maximum ${fld.maxLength} characters`);
      return v;
    }
    case "number": {
      let v = yup.number()
        .typeError("There must be a number")
        .transform((val, orig) => (orig === "" ? undefined : val));
      if (reqMsg) v = v.required(reqMsg);
      if (typeof fld.min === "number")
        (v = v.min), (fld.min, `Minimum ${fld.min}`);
      if (typeof fld.max === "number")
        (v = v.max), (fld.max, `Maximum ${fld.max}`);
      return v;
    }
    case "date": {
      let v = yup.string.matches(
        /^\d{4}-\d{2}-\d{2}$/,
        "Invalid date (YYYY-MM-DD)"
      );
      if (reqMsg) v = v.required(reqMsg);
      return v;
    }
    case "select": {
      let v = yup.mixed();
      if (Array.isArray(fld.options) && fld.options.length > 0) {
        v = v.oneOf(fld.options, "Invalid value");
      }
      if (reqMsg) v = v.required(reqMsg);
      return v;
    }
    case "text":
    default: {
      let v = yup.string();
      if (reqMsg) v = v.required(reqMsg);
      if (fld.minLength)
        v = v.min(fld.minLength, `Minimum ${fld.minLength} characters`);
      if (fld.maxLength)
        v = v.max(fld.maxLength, `Maximum ${fld.maxLength} characters`);
      if (fld.pattern)
        v = v.matches(new RegExp(fld.pattern), "Invalid template");
      return v;
    }
  }
}

export function buildYupFromSchema(schema) {
  const schema = Object.fromEntries(
    (schema.fields || []).map((fld) => [fld.name, validatorForField(fld)])
  );
  return yup.Object().schema(shape);
}
