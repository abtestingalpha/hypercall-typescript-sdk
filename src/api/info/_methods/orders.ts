import * as v from '@valibot/valibot'

import { PositiveInteger, WalletAddress, parser } from '../../_base.ts'
import { toQuery, type InfoConfig } from './_base/mod.ts'

// -------------------- Schemas --------------------

/** Request orders for a wallet. */
export const OrdersRequest = v.pipe(
  v.object({
    /** Wallet address. */
    wallet: v.pipe(WalletAddress, v.description('Wallet address.')),
    /** Maximum rows to return. */
    limit: v.pipe(v.optional(PositiveInteger), v.description('Limit.')),
    /** Rows to skip. */
    offset: v.pipe(v.optional(PositiveInteger), v.description('Offset.')),
  }),
  v.description('Request orders for a wallet.'),
)

export type OrdersParameters = v.InferInput<typeof OrdersRequest>

/** Orders response. */
export type OrdersResponse = unknown

/** Request orders for a wallet. */
export function orders<TResponse = OrdersResponse>(
  config: InfoConfig,
  params: OrdersParameters,
  signal?: AbortSignal,
): Promise<TResponse> {
  const request = parser(OrdersRequest)(params)
  const query = toQuery({
    wallet: request.wallet.toLowerCase(),
    limit: request.limit,
    offset: request.offset,
  })

  return config.transport.request(`/orders?${query}`, { signal })
}
