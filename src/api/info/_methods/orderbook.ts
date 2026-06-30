import * as v from '@valibot/valibot'

import { NonEmptyString, PositiveInteger, parser } from '../../_base.ts'
import { toQuery, type InfoConfig } from './_base/mod.ts'

// -------------------- Schemas --------------------

/** Request orderbook for an instrument. */
export const OrderbookRequest = v.pipe(
  v.object({
    /** Instrument id. */
    instrumentId: v.pipe(
      v.union([NonEmptyString, PositiveInteger]),
      v.description('Instrument id.'),
    ),
    /** Orderbook depth. */
    depth: v.pipe(v.optional(PositiveInteger), v.description('Book depth.')),
  }),
  v.description('Request orderbook for an instrument.'),
)

export type OrderbookParameters = v.InferInput<typeof OrderbookRequest>

/** Orderbook response. */
export type OrderbookResponse = unknown

/** Request orderbook for an instrument. */
export function orderbook<TResponse = OrderbookResponse>(
  config: InfoConfig,
  params: OrderbookParameters,
  signal?: AbortSignal,
): Promise<TResponse> {
  const request = parser(OrderbookRequest)(params)
  const query = toQuery({
    instrument_id: String(request.instrumentId),
    depth: request.depth ?? 15,
  })

  return config.transport.request(`/orderbook?${query}`, { signal })
}
