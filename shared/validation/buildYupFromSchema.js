import * as yup from "yup";
import { validatorForField } from "./fieldValidators.js";

export function buildYupFromSchema(schemaDef) {
  const shape = Object.fromEntries(
    (schemaDef?.fields ?? []).map((fld) => [fld.name, validatorForField(fld)])
  );
  return yup.object().shape(shape);
}
