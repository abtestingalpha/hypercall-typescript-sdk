import { HypercallError } from '../_base.ts'

/** Thrown when a transport layer error occurs. */
export class TransportError extends HypercallError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'TransportError'
  }
}

/** Common request transport interface shared by API clients and low-level methods. */
export interface IRequestTransport {
  /**
   * Execute a request against a Hypercall API path.
   *
   * @param path REST path, including any query string.
   * @param init Request options for this call.
   * @param signal {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal | AbortSignal} to cancel the request.
   */
  request<TResponse = unknown>(
    path: string,
    init?: RequestInit,
    signal?: AbortSignal,
  ): Promise<TResponse>
}
