/**
 * Client for the Hypercall Info API endpoint.
 * @module
 */

import type { InfoConfig } from './_methods/_base/mod.ts'

import { exchangeInfo, type ExchangeInfoResponse } from './_methods/exchangeInfo.ts'
import { fills, type FillsParameters, type FillsResponse } from './_methods/fills.ts'
import { instruments, type InstrumentsParameters, type InstrumentsResponse } from './_methods/instruments.ts'
import { markets, type MarketsResponse } from './_methods/markets.ts'
import {
  optionSummaries,
  type OptionSummariesParameters,
  type OptionSummariesResponse,
} from './_methods/optionSummaries.ts'
import { orderbook, type OrderbookParameters, type OrderbookResponse } from './_methods/orderbook.ts'
import { orders, type OrdersParameters, type OrdersResponse } from './_methods/orders.ts'
import { portfolio, type PortfolioParameters, type PortfolioResponse } from './_methods/portfolio.ts'

/** A client for interacting with the Hypercall Info API. */
export class InfoClient {
  readonly transport: InfoConfig['transport']

  constructor(args: InfoConfig) {
    this.transport = args.transport
  }

  /** Request listed markets. */
  markets<TResponse = MarketsResponse>(signal?: AbortSignal): Promise<TResponse> {
    return markets<TResponse>(this, signal)
  }

  /** Request exchange metadata. */
  exchangeInfo<TResponse = ExchangeInfoResponse>(signal?: AbortSignal): Promise<TResponse> {
    return exchangeInfo<TResponse>(this, signal)
  }

  /** Request instruments for a currency. */
  instruments<TResponse = InstrumentsResponse>(
    params: InstrumentsParameters,
    signal?: AbortSignal,
  ): Promise<TResponse> {
    return instruments<TResponse>(this, params, signal)
  }

  /** Request option summaries for a currency. */
  optionSummaries<TResponse = OptionSummariesResponse>(
    params: OptionSummariesParameters,
    signal?: AbortSignal,
  ): Promise<TResponse> {
    return optionSummaries<TResponse>(this, params, signal)
  }

  /** Request orderbook for an instrument. */
  orderbook<TResponse = OrderbookResponse>(
    params: OrderbookParameters,
    signal?: AbortSignal,
  ): Promise<TResponse> {
    return orderbook<TResponse>(this, params, signal)
  }

  /** Request portfolio for a wallet. */
  portfolio<TResponse = PortfolioResponse>(
    params: PortfolioParameters,
    signal?: AbortSignal,
  ): Promise<TResponse> {
    return portfolio<TResponse>(this, params, signal)
  }

  /** Request orders for a wallet. */
  orders<TResponse = OrdersResponse>(
    params: OrdersParameters,
    signal?: AbortSignal,
  ): Promise<TResponse> {
    return orders<TResponse>(this, params, signal)
  }

  /** Request fills for a wallet. */
  fills<TResponse = FillsResponse>(
    params: FillsParameters,
    signal?: AbortSignal,
  ): Promise<TResponse> {
    return fills<TResponse>(this, params, signal)
  }
}
