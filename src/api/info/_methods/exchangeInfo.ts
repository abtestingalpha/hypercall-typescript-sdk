import * as v from '@valibot/valibot'

import type { InfoConfig } from './_base/mod.ts'

// -------------------- Schemas --------------------

/** Request exchange metadata. */
export const ExchangeInfoRequest = v.pipe(
  v.object({}),
  v.description('Request exchange metadata.'),
)

/** Exchange metadata response. */
export type ExchangeInfoResponse = unknown

/** Request exchange metadata. */
export function exchangeInfo<TResponse = ExchangeInfoResponse>(
  config: InfoConfig,
  signal?: AbortSignal,
): Promise<TResponse> {
  return config.transport.request('/exchange-info', { signal })
}
