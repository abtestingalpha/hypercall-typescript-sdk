import * as v from '@valibot/valibot'

import { NonEmptyString, PositiveInteger, parser } from '../../_base.ts'
import { toQuery, type InfoConfig } from './_base/mod.ts'

// -------------------- Schemas --------------------

/** Request option summaries for a currency. */
export const OptionSummariesRequest = v.pipe(
  v.object({
    /** Underlying currency, such as BTC or US500. */
    currency: v.pipe(NonEmptyString, v.description('Underlying currency.')),
    /** Instrument kind. */
    kind: v.pipe(v.optional(NonEmptyString), v.description('Instrument kind.')),
    /** Optional expiry timestamp. */
    expiry: v.pipe(v.optional(PositiveInteger), v.description('Optional expiry timestamp.')),
  }),
  v.description('Request option summaries for a currency.'),
)

export type OptionSummariesParameters = v.InferInput<typeof OptionSummariesRequest>

/** Option summaries response. */
export type OptionSummariesResponse = unknown

/** Request option summaries for a currency. */
export function optionSummaries<TResponse = OptionSummariesResponse>(
  config: InfoConfig,
  params: OptionSummariesParameters,
  signal?: AbortSignal,
): Promise<TResponse> {
  const request = parser(OptionSummariesRequest)(params)
  const query = toQuery({
    currency: request.currency,
    kind: request.kind ?? 'option',
    expiry: request.expiry,
  })

  return config.transport.request(`/options-summary?${query}`, { signal })
}
