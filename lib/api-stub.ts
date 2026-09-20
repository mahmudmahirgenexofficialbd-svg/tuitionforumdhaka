// Every form submission goes through this single function.
// Backend phase: replace the body with a real fetch() to the Route Handler and return its typed result.
export async function submitStub<T>(_endpoint: string, _payload: T): Promise<{ ok: true }> {
  await new Promise((r) => setTimeout(r, 700));
  return { ok: true };
}
