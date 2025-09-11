export function incrementMapCounter(map, key, increment = 1) {
  const normalizedKey = (key ?? "Unknown").toString();
  map.set(normalizedKey, (map.get(normalizedKey) ?? 0) + increment);
}

export function mapToObject(map) {
  return Object.fromEntries(map.entries());
}
