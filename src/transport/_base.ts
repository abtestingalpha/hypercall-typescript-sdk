import { HypercallError } from '../_base.ts'

/** Thrown when a transport layer error occurs. */
export class TransportError extends HypercallError {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'TransportError'
  }
}

export interface IRequestTransport {
  request<TResponse = unknown>(
    path: string,
    init?: RequestInit,
  ): Promise<TResponse>
}
