/**
 * Hypercall EIP-712 signing helpers.
 * @module
 */

export const HYPERCALL_DOMAIN_NAME = 'Hypercall'
export const HYPERCALL_DOMAIN_VERSION = '1'
export const HYPERCALL_VERIFYING_CONTRACT = '0x0000000000000000000000000000000000000000'

export type TypedField = {
  readonly name: string
  readonly type: string
}

export type HypercallDomain = {
  readonly name: typeof HYPERCALL_DOMAIN_NAME
  readonly version: typeof HYPERCALL_DOMAIN_VERSION
  readonly chainId: number
  readonly verifyingContract: typeof HYPERCALL_VERIFYING_CONTRACT
}

export function createHypercallDomain(chainId: number): HypercallDomain {
  return {
    name: HYPERCALL_DOMAIN_NAME,
    version: HYPERCALL_DOMAIN_VERSION,
    chainId,
    verifyingContract: HYPERCALL_VERIFYING_CONTRACT,
  }
}

export const HYPERCALL_DOMAIN_FIELDS = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
] as const satisfies readonly TypedField[]

export function buildTypedData<const TPrimaryType extends string, const TMessage>(params: {
  chainId: number
  primaryType: TPrimaryType
  types: Record<TPrimaryType, readonly TypedField[]>
  message: TMessage
}) {
  return {
    domain: createHypercallDomain(params.chainId),
    types: {
      EIP712Domain: HYPERCALL_DOMAIN_FIELDS,
      ...params.types,
    },
    primaryType: params.primaryType,
    message: params.message,
  } as const
}

export const PLACE_ORDER_TYPES = {
  PlaceOrder: [
    { name: 'wallet', type: 'address' },
    { name: 'symbol', type: 'string' },
    { name: 'side', type: 'string' },
    { name: 'size', type: 'string' },
    { name: 'price', type: 'string' },
    { name: 'tif', type: 'string' },
    { name: 'clientId', type: 'string' },
    { name: 'nonce', type: 'uint64' },
  ],
} as const satisfies Record<string, readonly TypedField[]>

export const CANCEL_ORDER_TYPES = {
  CancelOrder: [
    { name: 'wallet', type: 'address' },
    { name: 'orderId', type: 'string' },
    { name: 'nonce', type: 'uint64' },
  ],
} as const satisfies Record<string, readonly TypedField[]>

export const CANCEL_ORDER_BY_CLOID_TYPES = {
  CancelOrderByClientId: [
    { name: 'wallet', type: 'address' },
    { name: 'clientId', type: 'string' },
    { name: 'nonce', type: 'uint64' },
  ],
} as const satisfies Record<string, readonly TypedField[]>

export const APPROVE_AGENT_TYPES = {
  ApproveAgent: [
    { name: 'agent', type: 'address' },
    { name: 'nonce', type: 'uint64' },
  ],
} as const satisfies Record<string, readonly TypedField[]>

export const REVOKE_AGENT_TYPES = {
  RevokeAgent: [
    { name: 'agent', type: 'address' },
    { name: 'nonce', type: 'uint64' },
  ],
} as const satisfies Record<string, readonly TypedField[]>

export const SET_MARGIN_MODE_TYPES = {
  SetMarginMode: [
    { name: 'wallet', type: 'address' },
    { name: 'marginMode', type: 'string' },
    { name: 'nonce', type: 'uint64' },
  ],
} as const satisfies Record<string, readonly TypedField[]>

export const STANDARD_MARGIN_LIQUIDATION_ORDER_TYPES = {
  StandardMarginLiquidationOrder: [
    { name: 'wallet', type: 'address' },
    { name: 'liquidatedWallet', type: 'address' },
    { name: 'requestId', type: 'string' },
    { name: 'auctionId', type: 'string' },
    { name: 'bidUsdc', type: 'string' },
    { name: 'portfolioHash', type: 'string' },
    { name: 'auctionTermsHash', type: 'string' },
    { name: 'bidIntentHash', type: 'string' },
    { name: 'auctionVersion', type: 'uint64' },
    { name: 'nonce', type: 'uint64' },
  ],
} as const satisfies Record<string, readonly TypedField[]>

export const WITHDRAW_USDC_TYPES = {
  WithdrawUsdc: [
    { name: 'wallet', type: 'address' },
    { name: 'account', type: 'address' },
    { name: 'destination', type: 'address' },
    { name: 'amount', type: 'string' },
    { name: 'nonce', type: 'uint64' },
  ],
} as const satisfies Record<string, readonly TypedField[]>

export const SET_SETTLEMENT_PAYOUT_SEEN_TYPES = {
  SetSettlementPayoutSeen: [
    { name: 'wallet', type: 'address' },
    { name: 'payoutIds', type: 'string' },
    { name: 'seen', type: 'bool' },
    { name: 'nonce', type: 'uint64' },
  ],
} as const satisfies Record<string, readonly TypedField[]>

export const PUSH_ACTION_TYPES = {
  PushAction: [
    { name: 'wallet', type: 'address' },
    { name: 'action', type: 'string' },
    { name: 'nonce', type: 'uint64' },
  ],
} as const satisfies Record<string, readonly TypedField[]>

export const SUBMIT_USERNAME_REQUEST_TYPES = {
  SubmitUsernameRequest: [
    { name: 'wallet', type: 'address' },
    { name: 'requestedUsername', type: 'string' },
    { name: 'nonce', type: 'uint64' },
  ],
} as const satisfies Record<string, readonly TypedField[]>

export const SET_USERNAME_TYPES = {
  SetUsername: [
    { name: 'wallet', type: 'address' },
    { name: 'username', type: 'string' },
    { name: 'nonce', type: 'uint64' },
  ],
} as const satisfies Record<string, readonly TypedField[]>

export const SET_PROFILE_IMAGE_TYPES = {
  SetProfileImage: [
    { name: 'wallet', type: 'address' },
    { name: 'imageSha256', type: 'string' },
    { name: 'nonce', type: 'uint64' },
  ],
} as const satisfies Record<string, readonly TypedField[]>

export const REPLACE_ORDER_TYPES = {
  ReplaceOrder: [
    { name: 'wallet', type: 'address' },
    { name: 'orderId', type: 'string' },
    { name: 'symbol', type: 'string' },
    { name: 'side', type: 'string' },
    { name: 'size', type: 'string' },
    { name: 'price', type: 'string' },
    { name: 'tif', type: 'string' },
    { name: 'clientId', type: 'string' },
    { name: 'nonce', type: 'uint64' },
  ],
} as const satisfies Record<string, readonly TypedField[]>

export const SUBMIT_AUTO_EXECUTE_RFQ_TYPES = {
  SubmitAutoExecuteRfq: [
    { name: 'rfqId', type: 'bytes32' },
    { name: 'legsHash', type: 'bytes32' },
    { name: 'limitPrice', type: 'int256' },
    { name: 'wallet', type: 'address' },
    { name: 'nonce', type: 'uint64' },
  ],
} as const satisfies Record<string, readonly TypedField[]>

export const SUBMIT_RFQ_TYPES = {
  SubmitRFQ: [
    { name: 'rfqId', type: 'bytes32' },
    { name: 'legsHash', type: 'bytes32' },
    { name: 'wallet', type: 'address' },
    { name: 'nonce', type: 'uint64' },
  ],
} as const satisfies Record<string, readonly TypedField[]>

export const ACCEPT_RFQ_QUOTE_TYPES = {
  AcceptRFQQuote: [
    { name: 'rfqId', type: 'bytes32' },
    { name: 'quoteId', type: 'bytes32' },
    { name: 'netPremium', type: 'int256' },
    { name: 'wallet', type: 'address' },
    { name: 'nonce', type: 'uint64' },
  ],
} as const satisfies Record<string, readonly TypedField[]>

export function buildApproveAgentValue(agent: string, nonce: bigint | number) {
  return {
    agent: agent.toLowerCase(),
    nonce: BigInt(nonce),
  } as const
}

export function buildRevokeAgentValue(agent: string, nonce: bigint | number) {
  return {
    agent: agent.toLowerCase(),
    nonce: BigInt(nonce),
  } as const
}

export function buildSetMarginModeValue(params: {
  wallet: string
  marginMode: 'standard' | 'portfolio'
  nonce: bigint | number
}) {
  return {
    wallet: params.wallet.toLowerCase(),
    marginMode: params.marginMode,
    nonce: BigInt(params.nonce),
  } as const
}

export function buildStandardMarginLiquidationOrderValue(params: {
  wallet: string
  liquidatedWallet: string
  requestId: string
  auctionId: string
  bidUsdc: string
  portfolioHash: string
  auctionTermsHash: string
  bidIntentHash: string
  auctionVersion: bigint | number
  nonce: bigint | number
}) {
  return {
    wallet: params.wallet.toLowerCase(),
    liquidatedWallet: params.liquidatedWallet.toLowerCase(),
    requestId: params.requestId,
    auctionId: params.auctionId,
    bidUsdc: params.bidUsdc,
    portfolioHash: params.portfolioHash,
    auctionTermsHash: params.auctionTermsHash,
    bidIntentHash: params.bidIntentHash,
    auctionVersion: BigInt(params.auctionVersion),
    nonce: BigInt(params.nonce),
  } as const
}

export function buildWithdrawUsdcValue(params: {
  wallet: string
  account: string
  destination: string
  amount: string
  nonce: bigint | number
}) {
  return {
    wallet: params.wallet.toLowerCase(),
    account: params.account.toLowerCase(),
    destination: params.destination.toLowerCase(),
    amount: params.amount,
    nonce: BigInt(params.nonce),
  } as const
}

export function buildSetSettlementPayoutSeenValue(params: {
  wallet: string
  payoutIds: string
  seen: boolean
  nonce: bigint | number
}) {
  return {
    wallet: params.wallet.toLowerCase(),
    payoutIds: params.payoutIds,
    seen: params.seen,
    nonce: BigInt(params.nonce),
  } as const
}

export function buildPushActionValue(params: {
  wallet: string
  action: string
  nonce: bigint | number
}) {
  return {
    wallet: params.wallet.toLowerCase() as `0x${string}`,
    action: params.action,
    nonce: BigInt(params.nonce),
  } as const
}

export function buildSubmitUsernameRequestValue(params: {
  wallet: string
  requestedUsername: string
  nonce: bigint | number
}) {
  return {
    wallet: params.wallet.toLowerCase(),
    requestedUsername: params.requestedUsername.trim(),
    nonce: BigInt(params.nonce),
  } as const
}

export function buildSetUsernameValue(params: {
  wallet: string
  username: string
  nonce: bigint | number
}) {
  return {
    wallet: params.wallet.toLowerCase(),
    username: params.username.trim(),
    nonce: BigInt(params.nonce),
  } as const
}

export function buildSetProfileImageValue(params: {
  wallet: string
  imageSha256: string
  nonce: bigint | number
}) {
  return {
    wallet: params.wallet.toLowerCase(),
    imageSha256: params.imageSha256.trim().toLowerCase(),
    nonce: BigInt(params.nonce),
  } as const
}

export function buildPlaceOrderValue(params: {
  wallet: string
  symbol: string
  side: 'Buy' | 'Sell'
  size: string
  price: string
  tif: 'gtc' | 'ioc' | 'fok'
  clientId?: string
  nonce: bigint | number
}) {
  return {
    wallet: params.wallet.toLowerCase(),
    symbol: params.symbol,
    side: params.side,
    size: params.size,
    price: params.price,
    tif: params.tif,
    clientId: params.clientId ?? '',
    nonce: BigInt(params.nonce),
  } as const
}

export function buildCancelOrderValue(params: {
  wallet: string
  orderId: string
  nonce: bigint | number
}) {
  return {
    wallet: params.wallet.toLowerCase(),
    orderId: params.orderId,
    nonce: BigInt(params.nonce),
  } as const
}

export function buildCancelOrderByClientIdValue(params: {
  wallet: string
  clientId: string
  nonce: bigint | number
}) {
  return {
    wallet: params.wallet.toLowerCase(),
    clientId: params.clientId,
    nonce: BigInt(params.nonce),
  } as const
}

export function buildReplaceOrderValue(params: {
  wallet: string
  orderId: string
  symbol: string
  side: 'Buy' | 'Sell'
  size: string
  price: string
  tif: 'gtc' | 'ioc' | 'fok'
  clientId?: string
  nonce: bigint | number
}) {
  return {
    wallet: params.wallet.toLowerCase(),
    orderId: params.orderId,
    symbol: params.symbol,
    side: params.side,
    size: params.size,
    price: params.price,
    tif: params.tif,
    clientId: params.clientId ?? '',
    nonce: BigInt(params.nonce),
  } as const
}

export type ReplaceOrderValue = ReturnType<typeof buildReplaceOrderValue>

export const toReplaceOrderRequestPayload = (value: ReplaceOrderValue) => ({
  wallet: value.wallet,
  order_id: Number(value.orderId),
  symbol: value.symbol,
  side: value.side,
  price: value.price,
  size: value.size,
  tif: value.tif,
  client_id: value.clientId,
  nonce: Number(value.nonce),
})

export function buildSubmitAutoExecuteRfqValue(params: {
  rfqId: `0x${string}`
  legsHash: `0x${string}`
  limitPrice: bigint
  wallet: `0x${string}` | string
  nonce: bigint | string
}) {
  return {
    rfqId: params.rfqId,
    legsHash: params.legsHash,
    limitPrice: params.limitPrice,
    wallet: (params.wallet as string).toLowerCase(),
    nonce: BigInt(params.nonce),
  } as const
}

export function buildSubmitRfqValue(params: {
  rfqId: `0x${string}`
  legsHash: `0x${string}`
  wallet: string
  nonce: bigint | number
}) {
  return {
    rfqId: params.rfqId,
    legsHash: params.legsHash,
    wallet: params.wallet.toLowerCase(),
    nonce: BigInt(params.nonce),
  } as const
}

export function buildAcceptRfqQuoteValue(params: {
  rfqId: `0x${string}`
  quoteId: `0x${string}`
  netPremium: bigint
  wallet: string
  nonce: bigint | number
}) {
  return {
    rfqId: params.rfqId,
    quoteId: params.quoteId,
    netPremium: params.netPremium,
    wallet: params.wallet.toLowerCase(),
    nonce: BigInt(params.nonce),
  } as const
}

export type PlaceOrderValue = ReturnType<typeof buildPlaceOrderValue>

export const toOrderRequestPayload = (value: PlaceOrderValue) => ({
  wallet: value.wallet,
  symbol: value.symbol,
  side: value.side,
  price: value.price,
  size: value.size,
  tif: value.tif,
  client_id: value.clientId,
  nonce: Number(value.nonce),
})

export type SignedPayloadBase = {
  wallet: string
  nonce: number
  signature: string
  signer?: string
}

/** Build the wire body used by Hypercall pre-signed write endpoints. */
export function buildSignedBody<const TPayload extends SignedPayloadBase>(payload: TPayload) {
  const { wallet, signature, nonce, signer, ...rest } = payload

  return {
    ...rest,
    wallet: wallet.toLowerCase(),
    signature,
    nonce,
    ...(signer ? { signer: signer.toLowerCase() } : {}),
  }
}
