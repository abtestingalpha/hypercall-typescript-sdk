import * as v from '@valibot/valibot'

import { PositiveInteger, WalletAddress, parser } from '../../_base.ts'
import { toQuery, type InfoConfig } from './_base/mod.ts'

// -------------------- Schemas --------------------

/** Request fills for a wallet. */
export const FillsRequest = v.pipe(
  v.object({
    /** Wallet address. */
    wallet: v.pipe(WalletAddress, v.description('Wallet address.')),
    /** Maximum rows to return. */
    limit: v.pipe(v.optional(PositiveInteger), v.description('Limit.')),
    /** Rows to skip. */
    offset: v.pipe(v.optional(PositiveInteger), v.description('Offset.')),
  }),
  v.description('Request fills for a wallet.'),
)

export type FillsParameters = v.InferInput<typeof FillsRequest>

/** Fills response. */
export type FillsResponse = unknown

/** Request fills for a wallet. */
export function fills<TResponse = FillsResponse>(
  config: InfoConfig,
  params: FillsParameters,
  signal?: AbortSignal,
): Promise<TResponse> {
  const request = parser(FillsRequest)(params)
  const query = toQuery({
    wallet: request.wallet.toLowerCase(),
    limit: request.limit,
    offset: request.offset,
  })

  return config.transport.request(`/fills?${query}`, { signal })
}
