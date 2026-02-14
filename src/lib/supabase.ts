import { createPublicClient } from "@stalela/commons/client";
import type { SupabaseClient } from "@stalela/commons/client";

/**
 * Lazy-initialised public (anon-key) Supabase client.
 * Defers construction until first use so `next build` doesn't crash
 * when env vars are missing at module-evaluation time.
 */
function lazy(): SupabaseClient {
  let client: SupabaseClient | null = null;
  return new Proxy({} as SupabaseClient, {
    get(_target, prop, receiver) {
      if (!client) client = createPublicClient();
      return Reflect.get(client, prop, receiver);
    },
  });
}

export const supabase = lazy();
