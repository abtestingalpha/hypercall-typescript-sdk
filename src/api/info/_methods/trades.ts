import * as v from '@valibot/valibot'

import { NonEmptyString, NonNegativeInteger, parse, PositiveInteger, WalletAddress } from '../../_base.ts'
import type { Address, Decimal, PaginatedResponse } from './_base/_schemas.ts'
import { toQuery, type InfoConfig } from './_base/mod.ts'

// -------------------- Schemas --------------------

/** Request public venue trades. */
export const TradesRequest = v.pipe(
  v.object({
    /** Maximum rows to return. */
    limit: v.pipe(v.optional(PositiveInteger), v.description('Limit.')),
    /** Rows to skip. Not supported when filtering by symbol. */
    offset: v.pipe(v.optional(NonNegativeInteger), v.description('Offset.')),
    /** Optional instrument symbol filter. */
    symbol: v.pipe(v.optional(NonEmptyString), v.description('Instrument symbol filter.')),
    /** Optional underlying asset filter. */
    underlying: v.pipe(v.optional(NonEmptyString), v.description('Underlying asset filter.')),
    /** Optional wallet filter, matching maker or taker. */
    account: v.pipe(v.optional(WalletAddress), v.description('Maker or taker wallet filter.')),
  }),
  v.check((input) => {
    const filterCount = Number(input.symbol !== undefined) +
      Number(input.underlying !== undefined) +
      Number(input.account !== undefined)
    return filterCount <= 1
  }, 'Expected at most one of symbol, underlying, or account.'),
  v.check(
    (input) => input.symbol === undefined || input.offset === undefined,
    'Symbol-filtered trades do not support offset.',
  ),
  v.description('Request public venue trades.'),
)
export type TradesRequest = v.InferOutput<typeof TradesRequest>

type TradesBaseParameters = {
  /** Maximum rows to return. */
  limit?: number
}

/** Request parameters for public venue trades without a filter. */
export type AllTradesParameters = TradesBaseParameters & {
  /** Rows to skip. */
  offset?: number
  symbol?: never
  underlying?: never
  account?: never
}

/** Request parameters for public venue trades filtered by symbol. */
export type SymbolTradesParameters = TradesBaseParameters & {
  /** Instrument symbol filter. */
  symbol: string
  offset?: never
  underlying?: never
  account?: never
}

/** Request parameters for public venue trades filtered by underlying asset. */
export type UnderlyingTradesParameters = TradesBaseParameters & {
  /** Underlying asset filter. */
  underlying: string
  /** Rows to skip. */
  offset?: number
  symbol?: never
  account?: never
}

/** Request parameters for public venue trades filtered by maker or taker wallet. */
export type AccountTradesParameters = TradesBaseParameters & {
  /** Maker or taker wallet filter. */
  account: Address
  /** Rows to skip. */
  offset?: number
  symbol?: never
  underlying?: never
}

/** Request parameters for the {@linkcode trades} function. */
export type TradesParameters =
  | AccountTradesParameters
  | AllTradesParameters
  | SymbolTradesParameters
  | UnderlyingTradesParameters

/** Public venue trade record. */
export type Trade = {
  /** Unique trade identifier assigned by the engine. */
  trade_id: number
  /** Instrument symbol that traded. */
  symbol: string
  /** Execution price in USD. */
  price: Decimal
  /** Trade size in contracts. */
  size: Decimal
  /** Maker wallet address. */
  maker_address: Address
  /** Taker wallet address. */
  taker_address: Address
  /** Fee charged to the maker in USD. */
  maker_fee: Decimal
  /** Fee charged to the taker in USD. */
  taker_fee: Decimal
  /** Trade timestamp in milliseconds since epoch. */
  timestamp: number
  /** Timestamp when the trade was persisted. */
  created_at: string
}

/** Public venue trades response. */
export type TradesResponse = PaginatedResponse<Trade>

/**
 * Request public venue trades.
 *
 * @param config General configuration for Info API requests.
 * @param params Parameters specific to the API request.
 * @param signal {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal | AbortSignal} to cancel the request.
 * @return Public venue trades response.
 *
 * @throws {ValidationError} When the request parameters fail validation (before sending).
 * @throws {TransportError} When the transport layer throws an error.
 *
 * @example
 * ```ts
 * import { HttpTransport } from "@hypercall/sdk";
 * import { trades } from "@hypercall/sdk/api/info";
 *
 * const transport = new HttpTransport({ apiUrl: "https://api.hypercall.xyz" });
 *
 * const data = await trades({ transport }, {
 *   underlying: "BTC",
 *   limit: 50,
 *   offset: 0,
 * });
 * ```
 *
 * @see https://docs.hypercall.xyz/docs/trading/over-api/
 */
export function trades(
  config: InfoConfig,
  params: TradesParameters = {},
  signal?: AbortSignal,
): Promise<TradesResponse> {
  const request = parse(TradesRequest, params)
  const query = toQuery({
    limit: request.limit,
    offset: request.offset,
    symbol: request.symbol,
    underlying: request.underlying,
    account: request.account?.toLowerCase(),
  })

  return config.transport.request<TradesResponse>(query ? `/trades?${query}` : '/trades', {}, signal)
}
