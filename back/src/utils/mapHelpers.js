export function incrementMapCounter(map, key, increment = 1) {
  const normalizedKey = (key ?? "unknown").toString();
  map.set(normalizedKey, (map.get(normalizedKey) ?? 0) + increment);
}

export function mapToObject(map) {
  return Object.fromEntries(map.entries());
}
