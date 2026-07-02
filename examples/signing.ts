import {
  ACCEPT_RFQ_QUOTE_TYPES,
  APPROVE_AGENT_TYPES,
  buildAcceptRfqQuoteValue,
  buildApproveAgentValue,
  buildCancelOrderByClientIdValue,
  buildCancelOrderValue,
  buildPlaceOrderValue,
  buildReplaceOrderValue,
  buildRevokeAgentValue,
  buildSetMarginModeValue,
  buildSetSettlementPayoutSeenValue,
  buildStandardMarginLiquidationOrderValue,
  buildSubmitAutoExecuteRfqValue,
  buildSubmitRfqValue,
  buildTypedData,
  buildWithdrawUsdcValue,
  CANCEL_ORDER_BY_CLOID_TYPES,
  CANCEL_ORDER_TYPES,
  PLACE_ORDER_TYPES,
  REPLACE_ORDER_TYPES,
  REVOKE_AGENT_TYPES,
  SET_MARGIN_MODE_TYPES,
  SET_SETTLEMENT_PAYOUT_SEEN_TYPES,
  STANDARD_MARGIN_LIQUIDATION_ORDER_TYPES,
  SUBMIT_AUTO_EXECUTE_RFQ_TYPES,
  SUBMIT_RFQ_TYPES,
  WITHDRAW_USDC_TYPES,
} from "@hypercall/sdk/signing";

const wallet = "0xe55b5e5e38f73c30aa367d310d6247f3f9a5e86e";
const agent = "0xab7bab0e4c09ff447863f507c16090a9a02792d2";
const chainId = 998;

const approveAgentTypedData = buildTypedData({
  chainId,
  primaryType: "ApproveAgent",
  types: APPROVE_AGENT_TYPES,
  message: buildApproveAgentValue(agent, 1),
});

const revokeAgentTypedData = buildTypedData({
  chainId,
  primaryType: "RevokeAgent",
  types: REVOKE_AGENT_TYPES,
  message: buildRevokeAgentValue(agent, 2),
});

const placeOrderTypedData = buildTypedData({
  chainId,
  primaryType: "PlaceOrder",
  types: PLACE_ORDER_TYPES,
  message: buildPlaceOrderValue({
    wallet,
    symbol: "BTC-30JUN26-100000-C",
    side: "Buy",
    size: "0.1",
    price: "100",
    tif: "gtc",
    route: "book_only",
    clientId: "client-123",
    nonce: 3,
  }),
});

const replaceOrderTypedData = buildTypedData({
  chainId,
  primaryType: "ReplaceOrder",
  types: REPLACE_ORDER_TYPES,
  message: buildReplaceOrderValue({
    wallet,
    orderId: "123",
    symbol: "BTC-30JUN26-100000-C",
    side: "Sell",
    size: "0.1",
    price: "101",
    tif: "ioc",
    clientId: "client-125",
    nonce: 5,
  }),
});

const cancelOrderTypedData = buildTypedData({
  chainId,
  primaryType: "CancelOrder",
  types: CANCEL_ORDER_TYPES,
  message: buildCancelOrderValue({
    wallet,
    orderId: "123",
    nonce: 6,
  }),
});

const cancelOrderByClientIdTypedData = buildTypedData({
  chainId,
  primaryType: "CancelOrderByClientId",
  types: CANCEL_ORDER_BY_CLOID_TYPES,
  message: buildCancelOrderByClientIdValue({
    wallet,
    clientId: "client-123",
    nonce: 7,
  }),
});

const setMarginModeTypedData = buildTypedData({
  chainId,
  primaryType: "SetMarginMode",
  types: SET_MARGIN_MODE_TYPES,
  message: buildSetMarginModeValue({
    wallet,
    marginMode: "portfolio",
    nonce: 8,
  }),
});

const setSettlementPayoutSeenTypedData = buildTypedData({
  chainId,
  primaryType: "SetSettlementPayoutSeen",
  types: SET_SETTLEMENT_PAYOUT_SEEN_TYPES,
  message: buildSetSettlementPayoutSeenValue({
    wallet,
    ids: [1, 2, 3],
    nonce: 9,
  }),
});

const submitRfqTypedData = buildTypedData({
  chainId,
  primaryType: "SubmitRFQ",
  types: SUBMIT_RFQ_TYPES,
  message: buildSubmitRfqValue({
    rfqId: "0x1111111111111111111111111111111111111111111111111111111111111111",
    legsHash: "0x2222222222222222222222222222222222222222222222222222222222222222",
    wallet,
    nonce: 10,
  }),
});

const submitAutoExecuteRfqTypedData = buildTypedData({
  chainId,
  primaryType: "SubmitAutoExecuteRfq",
  types: SUBMIT_AUTO_EXECUTE_RFQ_TYPES,
  message: buildSubmitAutoExecuteRfqValue({
    rfqId: "0x1111111111111111111111111111111111111111111111111111111111111111",
    legsHash: "0x2222222222222222222222222222222222222222222222222222222222222222",
    limitPrice: -10_000n,
    wallet,
    nonce: "11",
  }),
});

const acceptRfqQuoteTypedData = buildTypedData({
  chainId,
  primaryType: "AcceptRFQQuote",
  types: ACCEPT_RFQ_QUOTE_TYPES,
  message: buildAcceptRfqQuoteValue({
    rfqId: "0x1111111111111111111111111111111111111111111111111111111111111111",
    quoteId: "0x3333333333333333333333333333333333333333333333333333333333333333",
    netPremium: -10_000n,
    wallet,
    nonce: 12,
  }),
});

const liquidationTypedData = buildTypedData({
  chainId,
  primaryType: "StandardMarginLiquidationOrder",
  types: STANDARD_MARGIN_LIQUIDATION_ORDER_TYPES,
  message: buildStandardMarginLiquidationOrderValue({
    wallet,
    liquidatedWallet: agent,
    requestId: "00000000-0000-0000-0000-000000000000",
    auctionId: "auction-1",
    bidUsdc: "100",
    portfolioHash: "0xportfolio",
    auctionTermsHash: "0xterms",
    bidIntentHash: "intent-1",
    auctionVersion: 1,
    nonce: 13,
  }),
});

const withdrawUsdcTypedData = buildTypedData({
  chainId,
  primaryType: "WithdrawUsdc",
  types: WITHDRAW_USDC_TYPES,
  message: buildWithdrawUsdcValue({
    wallet,
    account: wallet,
    destination: wallet,
    amount: "100",
    nonce: 14,
  }),
});

console.log({
  approveAgent: approveAgentTypedData.primaryType,
  revokeAgent: revokeAgentTypedData.primaryType,
  placeOrderFields: placeOrderTypedData.types.PlaceOrder.map((field) => field.name),
  placeOrderRoute: placeOrderTypedData.message.route,
  replaceOrder: replaceOrderTypedData.primaryType,
  cancelOrder: cancelOrderTypedData.primaryType,
  cancelOrderByClientId: cancelOrderByClientIdTypedData.primaryType,
  setMarginMode: setMarginModeTypedData.primaryType,
  setSettlementPayoutSeen: setSettlementPayoutSeenTypedData.primaryType,
  submitRfq: submitRfqTypedData.primaryType,
  submitAutoExecuteRfq: submitAutoExecuteRfqTypedData.primaryType,
  acceptRfqQuote: acceptRfqQuoteTypedData.primaryType,
  liquidation: liquidationTypedData.primaryType,
  withdrawUsdc: withdrawUsdcTypedData.primaryType,
});
