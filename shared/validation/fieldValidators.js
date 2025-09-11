import * as yup from "yup";
import { toAllowedOptions } from "./options.js";



export function validatorForField(fld) {
  const label = fld.label || fld.name;
  const reqMsg = fld.required ? `${label} is a required field` : undefined;

  switch (fld.type) {
    case "email": {
      let v = yup
        .string()
        .trim()
        .transform((v) => (v === "" ? undefined : v))
        .email("Invalid email");
      if (reqMsg) v = v.required(reqMsg);
      if (typeof fld.minLength === "number")
        v = v.min(fld.minLength, `Minimum ${fld.minLength} characters`);
      if (typeof fld.maxLength === "number")
        v = v.max(fld.maxLength, `Maximum ${fld.maxLength} characters`);
      return v;
    }

    case "password": {
      let v = yup
        .string()
        .trim()
        .transform((v) => (v === "" ? undefined : v));
      if (reqMsg) v = v.required(reqMsg);
      if (typeof fld.minLength === "number")
        v = v.min(fld.minLength, `Minimum ${fld.minLength} characters`);
      if (typeof fld.maxLength === "number")
        v = v.max(fld.maxLength, `Maximum ${fld.maxLength} characters`);
      return v;
    }

    case "number": {
      let v = yup
        .number()
        .typeError("There must be a number")
        .transform((val, orig) => (orig === "" ? undefined : val))
        .test(
          "finite",
          "Invalid number",
          (v) => v == null || Number.isFinite(v)
        );
      if (reqMsg) v = v.required(reqMsg);
      if (typeof fld.min === "number") v = v.min(fld.min, `Minimum ${fld.min}`);
      if (typeof fld.max === "number") v = v.max(fld.max, `Maximum ${fld.max}`);

      return v;
    }

    case "date": {
      let v = yup
        .string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date (YYYY-MM-DD)")
        .test("not-in-future", "Birthdate cannot be in the future", (val) => {
          if (!val) return true;
          const today = new Date().toISOString().slice(0, 10);
          return val <= today;
        });
      if (reqMsg) v = v.required(reqMsg);
      return v;
    }

    case "select": {
      let v = yup.mixed().transform((val) => (val === "" ? undefined : val));
      const allowed = toAllowedOptions(fld.options);
      if (allowed.length > 0) v = v.oneOf(allowed, "Invalid value");
      if (reqMsg) v = v.required(reqMsg);
      return v;
    }

    case "checkbox": {
      let v = yup.boolean();
      if (reqMsg) v = v.oneOf([true], reqMsg);
      return v;
    }

    case "text":
    default: {
      let v = yup
        .string()
        .trim()
        .transform((v) => (v === "" ? undefined : v));
      if (reqMsg) v = v.required(reqMsg);
      if (typeof fld.minLength === "number")
        v = v.min(fld.minLength, `Minimum ${fld.minLength} characters`);
      if (typeof fld.maxLength === "number")
        v = v.max(fld.maxLength, `Maximum ${fld.maxLength} characters`);
      if (fld.pattern) v = v.matches(new RegExp(fld.pattern), "Invalid format");
      return v;
    }
  }
}
