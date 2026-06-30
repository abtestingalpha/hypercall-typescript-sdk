/**
 * Hypercall API TypeScript SDK.
 *
 * The main entrypoint exports:
 * - Transports: {@link HttpTransport}
 * - Clients: {@link InfoClient}
 *
 * For tree-shakeable, low-level access you can import request methods directly from:
 * - `@hypercall/sdk/api/info`
 *
 * @example Quick start
 * ```ts
 * import { HttpTransport, InfoClient } from "@hypercall/sdk";
 *
 * const transport = new HttpTransport();
 * const info = new InfoClient({ transport });
 *
 * const markets = await info.markets();
 * console.log(markets);
 * ```
 *
 * @module
 */

export { HypercallError } from './_base.ts'
export { SchemaError } from './api/_base.ts'
export * from './transport/mod.ts'
export * from './api/info/client.ts'
