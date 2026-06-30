import * as v from '@valibot/valibot'

import { NonEmptyString, parser } from '../../_base.ts'
import { toQuery, type InfoConfig } from './_base/mod.ts'

// -------------------- Schemas --------------------

/** Request instruments for a currency. */
export const InstrumentsRequest = v.pipe(
  v.object({
    /** Underlying currency, such as BTC or US500. */
    currency: v.pipe(NonEmptyString, v.description('Underlying currency.')),
    /** Instrument kind. */
    kind: v.pipe(v.optional(NonEmptyString), v.description('Instrument kind.')),
  }),
  v.description('Request instruments for a currency.'),
)

export type InstrumentsParameters = v.InferInput<typeof InstrumentsRequest>

/** Instruments response. */
export type InstrumentsResponse = unknown

/** Request instruments for a currency. */
export function instruments<TResponse = InstrumentsResponse>(
  config: InfoConfig,
  params: InstrumentsParameters,
  signal?: AbortSignal,
): Promise<TResponse> {
  const request = parser(InstrumentsRequest)(params)
  const query = toQuery({
    currency: request.currency,
    kind: request.kind ?? 'option',
  })

  return config.transport.request(`/instruments?${query}`, { signal })
}
