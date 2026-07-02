import * as v from "@valibot/valibot";

// -------------------- Schemas --------------------

/** Order side accepted by Hypercall order write endpoints. */
export const OrderSide = v.picklist(["Buy", "Sell"]);
export type OrderSide = v.InferOutput<typeof OrderSide>;

/** Time in force accepted by Hypercall order write endpoints. */
export const TimeInForce = v.picklist(["gtc", "ioc", "fok"]);
export type TimeInForce = v.InferOutput<typeof TimeInForce>;

/** Route preference accepted by Hypercall order placement. */
export const OrderRoute = v.picklist(["best_execution", "book_only", "rfq_only"]);
export type OrderRoute = v.InferOutput<typeof OrderRoute>;

// -------------------- Response Types --------------------

/** Order update info returned by write endpoints. */
export type OrderUpdateInfo = {
  symbol: string;
  price: string;
  size: string;
  side: "Buy" | "Sell" | "buy" | "sell";
  tif: string;
  client_id: string;
  order_id: number;
  is_perp: boolean | null;
  underlying: string | null;
  reduce_only: boolean | null;
  nonce: number | null;
  signature: string | null;
};

/** Order update message returned by write endpoints. */
export type OrderUpdateMessage = {
  timestamp: number;
  info: OrderUpdateInfo;
  status: string;
  reason: string | null;
  filled_size: string;
  order_id: number;
  wallet_address: string;
  request?: {
    symbol: string;
    price: string;
    size: string;
    side: "Buy" | "Sell";
    tif: "GTC" | "IOC" | "FOK";
  };
};
