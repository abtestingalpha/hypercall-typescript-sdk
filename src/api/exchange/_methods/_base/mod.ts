import type { IRequestTransport } from '../../../../transport/_base.ts'
export { buildSignedBody, type SignedPayloadBase } from '../../../../signing/mod.ts'

/** General configuration for Hypercall Exchange API requests. */
export interface ExchangeConfig {
  /** Transport used to execute requests. */
  transport: IRequestTransport
}

/** Common options for Exchange API requests. */
export interface ExchangeRequestOptions {
  /** {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal | AbortSignal} to cancel a request. */
  signal?: AbortSignal
}
