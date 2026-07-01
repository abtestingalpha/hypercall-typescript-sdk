/**
 * Client for the Hypercall Exchange API.
 * @module
 */

import type { ExchangeConfig } from './_methods/_base/mod.ts'
import {
  approveAgent,
  type ApproveAgentOptions,
  type ApproveAgentParameters,
  type ApproveAgentResponse,
} from './_methods/approveAgent.ts'
import {
  bulkCancelOrders,
  type BulkCancelOrdersOptions,
  type BulkCancelOrdersParameters,
  type BulkCancelOrdersResponse,
} from './_methods/bulkCancelOrders.ts'
import {
  cancelOrder,
  type CancelOrderOptions,
  type CancelOrderParameters,
  type CancelOrderResponse,
} from './_methods/cancelOrder.ts'
import {
  cancelOrderByClientId,
  type CancelOrderByClientIdOptions,
  type CancelOrderByClientIdParameters,
  type CancelOrderByClientIdResponse,
} from './_methods/cancelOrderByClientId.ts'
import {
  placeOrder,
  type PlaceOrderOptions,
  type PlaceOrderParameters,
  type PlaceOrderResponse,
} from './_methods/placeOrder.ts'
import {
  replaceOrder,
  type ReplaceOrderOptions,
  type ReplaceOrderParameters,
  type ReplaceOrderResponse,
} from './_methods/replaceOrder.ts'
import {
  revokeAgent,
  type RevokeAgentOptions,
  type RevokeAgentParameters,
  type RevokeAgentResponse,
} from './_methods/revokeAgent.ts'
import {
  setMarginMode,
  type SetMarginModeOptions,
  type SetMarginModeParameters,
  type SetMarginModeResponse,
} from './_methods/setMarginMode.ts'
import {
  setSettlementPayoutsSeen,
  type SetSettlementPayoutsSeenOptions,
  type SetSettlementPayoutsSeenParameters,
  type SetSettlementPayoutsSeenResponse,
} from './_methods/setSettlementPayoutsSeen.ts'

/** A client for interacting with signed Hypercall Exchange API methods. */
export class ExchangeClient<C extends ExchangeConfig = ExchangeConfig> {
  config_: C

  constructor(config: C) {
    this.config_ = config
  }

  /**
   * Approve an agent wallet using a pre-signed Hypercall EIP-712 payload.
   *
   * Signing: pre-signed EIP-712 `ApproveAgent` payload.
   *
   * @param params Pre-signed parameters specific to the API request.
   * @param opts Request execution options.
   * @return Agent approval response.
   *
   * @throws {ValidationError} When the request parameters fail validation (before sending).
   * @throws {TransportError} When the transport layer throws an error.
   *
   * @example
   * ```ts
   * import { ExchangeClient, HttpTransport } from "@hypercall/sdk";
   *
   * const transport = new HttpTransport({ apiUrl: "https://api.hypercall.xyz" });
   * const client = new ExchangeClient({ transport });
   *
   * const data = await client.approveAgent({
   *   agent: "0x0000000000000000000000000000000000000000",
   *   nonce: 1,
   *   signature: "0x...",
   * });
   * ```
   *
   * @see https://docs.hypercall.xyz/docs/trading/over-api/
   */
  approveAgent(params: ApproveAgentParameters, opts?: ApproveAgentOptions): Promise<ApproveAgentResponse> {
    return approveAgent(this.config_, params, opts)
  }

  /**
   * Cancel an order by order ID using a pre-signed Hypercall EIP-712 payload.
   *
   * Signing: pre-signed EIP-712 `CancelOrder` payload.
   *
   * @param params Pre-signed parameters specific to the API request.
   * @param opts Request execution options.
   * @return Cancel order response.
   *
   * @throws {ValidationError} When the request parameters fail validation (before sending).
   * @throws {TransportError} When the transport layer throws an error.
   *
   * @example
   * ```ts
   * import { ExchangeClient, HttpTransport } from "@hypercall/sdk";
   *
   * const transport = new HttpTransport({ apiUrl: "https://api.hypercall.xyz" });
   * const client = new ExchangeClient({ transport });
   *
   * const data = await client.cancelOrder({
   *   wallet: "0x0000000000000000000000000000000000000000",
   *   order_id: 123,
   *   nonce: 1,
   *   signature: "0x...",
   * });
   * ```
   *
   * @see https://docs.hypercall.xyz/docs/trading/over-api/
   */
  cancelOrder(params: CancelOrderParameters, opts?: CancelOrderOptions): Promise<CancelOrderResponse> {
    return cancelOrder(this.config_, params, opts)
  }

  /**
   * Cancel an order by client ID using a pre-signed Hypercall EIP-712 payload.
   *
   * Signing: pre-signed EIP-712 `CancelOrderByClientId` payload.
   *
   * @param params Pre-signed parameters specific to the API request.
   * @param opts Request execution options.
   * @return Cancel order response.
   *
   * @throws {ValidationError} When the request parameters fail validation (before sending).
   * @throws {TransportError} When the transport layer throws an error.
   *
   * @example
   * ```ts
   * import { ExchangeClient, HttpTransport } from "@hypercall/sdk";
   *
   * const transport = new HttpTransport({ apiUrl: "https://api.hypercall.xyz" });
   * const client = new ExchangeClient({ transport });
   *
   * const data = await client.cancelOrderByClientId({
   *   wallet: "0x0000000000000000000000000000000000000000",
   *   client_id: "0x...",
   *   nonce: 1,
   *   signature: "0x...",
   * });
   * ```
   *
   * @see https://docs.hypercall.xyz/docs/trading/over-api/
   */
  cancelOrderByClientId(
    params: CancelOrderByClientIdParameters,
    opts?: CancelOrderByClientIdOptions,
  ): Promise<CancelOrderByClientIdResponse> {
    return cancelOrderByClientId(this.config_, params, opts)
  }

  /**
   * Cancel multiple orders by order ID using pre-signed Hypercall EIP-712 payloads.
   *
   * Signing: pre-signed EIP-712 `CancelOrder` payloads.
   *
   * @param params Pre-signed parameters specific to the API request.
   * @param opts Request execution options.
   * @return Bulk cancel response.
   *
   * @throws {ValidationError} When the request parameters fail validation (before sending).
   * @throws {TransportError} When the transport layer throws an error.
   *
   * @example
   * ```ts
   * import { ExchangeClient, HttpTransport } from "@hypercall/sdk";
   *
   * const transport = new HttpTransport({ apiUrl: "https://api.hypercall.xyz" });
   * const client = new ExchangeClient({ transport });
   *
   * const data = await client.bulkCancelOrders({
   *   cancels: [{
   *     wallet: "0x0000000000000000000000000000000000000000",
   *     order_id: 123,
   *     nonce: 1,
   *     signature: "0x...",
   *   }],
   * });
   * ```
   *
   * @see https://docs.hypercall.xyz/docs/trading/over-api/
   */
  bulkCancelOrders(
    params: BulkCancelOrdersParameters,
    opts?: BulkCancelOrdersOptions,
  ): Promise<BulkCancelOrdersResponse> {
    return bulkCancelOrders(this.config_, params, opts)
  }

  /**
   * Place an order using a pre-signed Hypercall EIP-712 payload.
   *
   * Signing: pre-signed EIP-712 `PlaceOrder` payload.
   *
   * @param params Pre-signed parameters specific to the API request.
   * @param opts Request execution options.
   * @return Order update response.
   *
   * @throws {ValidationError} When the request parameters fail validation (before sending).
   * @throws {TransportError} When the transport layer throws an error.
   *
   * @example
   * ```ts
   * import { ExchangeClient, HttpTransport } from "@hypercall/sdk";
   *
   * const transport = new HttpTransport({ apiUrl: "https://api.hypercall.xyz" });
   * const client = new ExchangeClient({ transport });
   *
   * const data = await client.placeOrder({
   *   wallet: "0x0000000000000000000000000000000000000000",
   *   symbol: "BTC-30JUN26-100000-C",
   *   side: "Buy",
   *   size: "0.1",
   *   price: "100",
   *   tif: "gtc",
   *   client_id: "client-123",
   *   nonce: 1,
   *   signature: "0x...",
   * });
   * ```
   *
   * @see https://docs.hypercall.xyz/docs/trading/over-api/
   */
  placeOrder(params: PlaceOrderParameters, opts?: PlaceOrderOptions): Promise<PlaceOrderResponse> {
    return placeOrder(this.config_, params, opts)
  }

  /**
   * Replace an order using a pre-signed Hypercall EIP-712 payload.
   *
   * Signing: pre-signed EIP-712 `ReplaceOrder` payload.
   *
   * @param params Pre-signed parameters specific to the API request.
   * @param opts Request execution options.
   * @return Order update response for the replacement.
   *
   * @throws {ValidationError} When the request parameters fail validation (before sending).
   * @throws {TransportError} When the transport layer throws an error.
   *
   * @example
   * ```ts
   * import { ExchangeClient, HttpTransport } from "@hypercall/sdk";
   *
   * const transport = new HttpTransport({ apiUrl: "https://api.hypercall.xyz" });
   * const client = new ExchangeClient({ transport });
   *
   * const data = await client.replaceOrder({
   *   wallet: "0x0000000000000000000000000000000000000000",
   *   order_id: 123,
   *   symbol: "BTC-30JUN26-100000-C",
   *   side: "Buy",
   *   size: "0.1",
   *   price: "101",
   *   tif: "gtc",
   *   client_id: "client-124",
   *   nonce: 2,
   *   signature: "0x...",
   * });
   * ```
   *
   * @see https://docs.hypercall.xyz/docs/trading/over-api/
   */
  replaceOrder(params: ReplaceOrderParameters, opts?: ReplaceOrderOptions): Promise<ReplaceOrderResponse> {
    return replaceOrder(this.config_, params, opts)
  }

  /**
   * Set account margin mode using a pre-signed Hypercall EIP-712 payload.
   *
   * Signing: pre-signed EIP-712 `SetMarginMode` payload.
   *
   * @param params Pre-signed parameters specific to the API request.
   * @param opts Request execution options.
   * @return Margin mode update response.
   *
   * @throws {ValidationError} When the request parameters fail validation (before sending).
   * @throws {TransportError} When the transport layer throws an error.
   *
   * @example
   * ```ts
   * import { ExchangeClient, HttpTransport } from "@hypercall/sdk";
   *
   * const transport = new HttpTransport({ apiUrl: "https://api.hypercall.xyz" });
   * const client = new ExchangeClient({ transport });
   *
   * const data = await client.setMarginMode({
   *   wallet: "0x0000000000000000000000000000000000000000",
   *   margin_mode: "standard",
   *   nonce: 1,
   *   signature: "0x...",
   * });
   * ```
   *
   * @see https://docs.hypercall.xyz/docs/trading/over-api/
   */
  setMarginMode(params: SetMarginModeParameters, opts?: SetMarginModeOptions): Promise<SetMarginModeResponse> {
    return setMarginMode(this.config_, params, opts)
  }

  /**
   * Revoke an agent wallet using a pre-signed Hypercall EIP-712 payload.
   *
   * Signing: pre-signed EIP-712 `RevokeAgent` payload.
   *
   * @param params Pre-signed parameters specific to the API request.
   * @param opts Request execution options.
   * @return Agent revocation response.
   *
   * @throws {ValidationError} When the request parameters fail validation (before sending).
   * @throws {TransportError} When the transport layer throws an error.
   *
   * @example
   * ```ts
   * import { ExchangeClient, HttpTransport } from "@hypercall/sdk";
   *
   * const transport = new HttpTransport({ apiUrl: "https://api.hypercall.xyz" });
   * const client = new ExchangeClient({ transport });
   *
   * const data = await client.revokeAgent({
   *   agent: "0x0000000000000000000000000000000000000000",
   *   nonce: 1,
   *   signature: "0x...",
   * });
   * ```
   *
   * @see https://docs.hypercall.xyz/docs/trading/over-api/
   */
  revokeAgent(params: RevokeAgentParameters, opts?: RevokeAgentOptions): Promise<RevokeAgentResponse> {
    return revokeAgent(this.config_, params, opts)
  }

  /**
   * Mark settlement payouts as seen using a pre-signed Hypercall EIP-712 payload.
   *
   * Signing: pre-signed EIP-712 payload.
   *
   * @param params Pre-signed parameters specific to the API request.
   * @param opts Request execution options.
   * @return Settlement payout seen mutation response.
   *
   * @throws {ValidationError} When the request parameters fail validation (before sending).
   * @throws {TransportError} When the transport layer throws an error.
   *
   * @example
   * ```ts
   * import { ExchangeClient, HttpTransport } from "@hypercall/sdk";
   *
   * const transport = new HttpTransport({ apiUrl: "https://api.hypercall.xyz" });
   * const client = new ExchangeClient({ transport });
   *
   * const data = await client.setSettlementPayoutsSeen({
   *   wallet: "0x0000000000000000000000000000000000000000",
   *   ids: [123],
   *   nonce: 1,
   *   signature: "0x...",
   * });
   * ```
   *
   * @see https://docs.hypercall.xyz/docs/trading/over-api/
   */
  setSettlementPayoutsSeen(
    params: SetSettlementPayoutsSeenParameters,
    opts?: SetSettlementPayoutsSeenOptions,
  ): Promise<SetSettlementPayoutsSeenResponse> {
    return setSettlementPayoutsSeen(this.config_, params, opts)
  }
}

export type { ExchangeConfig, ExchangeRequestOptions } from './_methods/_base/mod.ts'
export type { OrderUpdateInfo, OrderUpdateMessage } from './_methods/_base/order.ts'
export type {
  ApproveAgentOptions,
  ApproveAgentParameters,
  ApproveAgentRequest,
  ApproveAgentResponse,
} from './_methods/approveAgent.ts'
export type {
  BulkCancelOrderResult,
  BulkCancelOrdersOptions,
  BulkCancelOrdersParameters,
  BulkCancelOrdersRequest,
  BulkCancelOrdersResponse,
} from './_methods/bulkCancelOrders.ts'
export type {
  CancelOrderOptions,
  CancelOrderParameters,
  CancelOrderRequest,
  CancelOrderResponse,
} from './_methods/cancelOrder.ts'
export type {
  CancelOrderByClientIdOptions,
  CancelOrderByClientIdParameters,
  CancelOrderByClientIdRequest,
  CancelOrderByClientIdResponse,
} from './_methods/cancelOrderByClientId.ts'
export type {
  PlaceOrderOptions,
  PlaceOrderParameters,
  PlaceOrderRequest,
  PlaceOrderResponse,
} from './_methods/placeOrder.ts'
export type {
  ReplaceOrderOptions,
  ReplaceOrderParameters,
  ReplaceOrderRequest,
  ReplaceOrderResponse,
} from './_methods/replaceOrder.ts'
export type {
  MarginModeResponse,
  MarginModeSelection,
  SetMarginModeOptions,
  SetMarginModeParameters,
  SetMarginModeRequest,
  SetMarginModeResponse,
} from './_methods/setMarginMode.ts'
export type {
  RevokeAgentOptions,
  RevokeAgentParameters,
  RevokeAgentRequest,
  RevokeAgentResponse,
} from './_methods/revokeAgent.ts'
export type {
  SetSettlementPayoutsSeenOptions,
  SetSettlementPayoutsSeenParameters,
  SetSettlementPayoutsSeenRequest,
  SetSettlementPayoutsSeenResponse,
} from './_methods/setSettlementPayoutsSeen.ts'
