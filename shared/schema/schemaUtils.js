export function getDefaultValues(schemaDef) {
  return Object.fromEntries(
    (schemaDef?.fields ?? []).map((f) => [f.name, defaultForField(f)])
  );
}

function defaultForField(fld) {
  const d = fld.default;
  switch (fld.type) {
    case "checkbox":
      return typeof d === "boolean" ? d : false;
    case "number":
      return typeof d === "number" ? d : "";
    case "date":
      return typeof d === "string" ? d : "";
    case "select":
      return d ?? "";
    case "email":
    case "password":
    case "text":
    default:
      return typeof d === "string" ? d : "";
  }
}
