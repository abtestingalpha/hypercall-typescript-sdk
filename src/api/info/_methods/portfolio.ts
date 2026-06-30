import * as v from '@valibot/valibot'

import { WalletAddress, parser } from '../../_base.ts'
import { toQuery, type InfoConfig } from './_base/mod.ts'

// -------------------- Schemas --------------------

/** Request portfolio for a wallet. */
export const PortfolioRequest = v.pipe(
  v.object({
    /** Wallet address. */
    wallet: v.pipe(WalletAddress, v.description('Wallet address.')),
  }),
  v.description('Request portfolio for a wallet.'),
)

export type PortfolioParameters = v.InferInput<typeof PortfolioRequest>

/** Portfolio response. */
export type PortfolioResponse = unknown

/** Request portfolio for a wallet. */
export function portfolio<TResponse = PortfolioResponse>(
  config: InfoConfig,
  params: PortfolioParameters,
  signal?: AbortSignal,
): Promise<TResponse> {
  const request = parser(PortfolioRequest)(params)
  const query = toQuery({ wallet: request.wallet.toLowerCase() })

  return config.transport.request(`/portfolio?${query}`, { signal })
}
