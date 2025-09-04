export function toAllowedOptions(options) {
  if (!Array.isArray(options)) return [];
  return options.map((opt) =>
    typeof opt === "object" && opt !== null ? opt.value : opt
  );
}
