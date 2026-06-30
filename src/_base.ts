/** Base error class for all SDK errors. */
export class HypercallError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options)
    this.name = 'HypercallError'
  }
}
