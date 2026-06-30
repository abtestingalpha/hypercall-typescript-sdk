import * as v from '@valibot/valibot'

import type { InfoConfig } from './_base/mod.ts'

// -------------------- Schemas --------------------

/** Request listed markets. */
export const MarketsRequest = v.pipe(
  v.object({}),
  v.description('Request listed markets.'),
)

/** Listed markets response. */
export type MarketsResponse = unknown

/** Request listed markets. */
export function markets<TResponse = MarketsResponse>(
  config: InfoConfig,
  signal?: AbortSignal,
): Promise<TResponse> {
  return config.transport.request('/markets', { signal })
}
