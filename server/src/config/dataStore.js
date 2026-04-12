export function isMemoryStore() {
  return process.env.DATA_STORE === "memory";
}
