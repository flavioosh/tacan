export function randomSeed(): string {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
}
