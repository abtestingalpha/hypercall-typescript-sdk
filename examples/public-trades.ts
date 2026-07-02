import { HttpTransport, InfoClient, type Trade } from "@hypercall/sdk";

const transport = new HttpTransport({ apiUrl: "https://api.hypercall.xyz" });
const info = new InfoClient({ transport });

const recentTrades = await info.trades({ limit: 10, offset: 0 });
const latestTrade: Trade | undefined = recentTrades.data[0];

const symbolTrades = latestTrade ? await info.trades({ symbol: latestTrade.symbol, limit: 10 }) : undefined;

const underlyingTrades = await info.trades({
  underlying: "BTC",
  limit: 10,
  offset: 0,
});

const account = latestTrade?.taker_address ?? latestTrade?.maker_address;
const accountTrades = account ? await info.trades({ account, limit: 10, offset: 0 }) : undefined;

console.log({
  latestTradeId: latestTrade?.trade_id,
  latestSymbol: latestTrade?.symbol,
  latestPrice: latestTrade?.price,
  symbolTradeCount: symbolTrades?.data.length,
  underlyingTradeCount: underlyingTrades.data.length,
  accountTradeCount: accountTrades?.data.length,
});
