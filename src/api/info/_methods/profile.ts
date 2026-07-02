import * as v from "@valibot/valibot";

import { NonEmptyString, NonNegativeInteger, parse, PositiveInteger, WalletAddress } from "../../_base.ts";
import type { Address, Decimal, PaginatedResponse } from "./_base/_schemas.ts";
import { type InfoConfig, toQuery } from "./_base/mod.ts";
import type { Fill } from "./fills.ts";

// -------------------- Schemas --------------------

/** Request profile stats for a wallet. */
export const ProfileRequest = v.pipe(
  v.object({
    /** Wallet address. */
    wallet: v.pipe(WalletAddress, v.description("Wallet address.")),
  }),
  v.description("Request profile stats for a wallet."),
);
export type ProfileRequest = v.InferOutput<typeof ProfileRequest>;

/** Request parameters for the {@linkcode profile} function. */
export type ProfileParameters = v.InferInput<typeof ProfileRequest>;

/** Request profile trade history for a wallet. */
export const ProfileTradesRequest = v.pipe(
  v.object({
    /** Wallet address. */
    wallet: v.pipe(WalletAddress, v.description("Wallet address.")),
    /** Maximum rows to return. */
    limit: v.pipe(v.optional(PositiveInteger), v.description("Limit.")),
    /** Rows to skip. */
    offset: v.pipe(v.optional(NonNegativeInteger), v.description("Offset.")),
    /** Optional competition filter. */
    competition_id: v.pipe(v.optional(PositiveInteger), v.description("Competition ID.")),
    /** Optional lower timestamp bound in milliseconds. */
    from_ts_ms: v.pipe(v.optional(NonNegativeInteger), v.description("From timestamp in milliseconds.")),
    /** Optional upper timestamp bound in milliseconds. */
    to_ts_ms: v.pipe(v.optional(NonNegativeInteger), v.description("To timestamp in milliseconds.")),
    /** Optional instrument symbol filter. */
    symbol: v.pipe(v.optional(NonEmptyString), v.description("Instrument symbol filter.")),
  }),
  v.description("Request profile trade history for a wallet."),
);
export type ProfileTradesRequest = v.InferOutput<typeof ProfileTradesRequest>;

/** Request parameters for the {@linkcode profileTrades} function. */
export type ProfileTradesParameters = v.InferInput<typeof ProfileTradesRequest>;

/** Request realized PnL by symbol for a wallet. */
export const ProfileRealizedPnlRequest = v.pipe(
  v.object({
    /** Wallet address. */
    wallet: v.pipe(WalletAddress, v.description("Wallet address.")),
    /** Optional competition filter. */
    competition_id: v.pipe(v.optional(PositiveInteger), v.description("Competition ID.")),
  }),
  v.description("Request realized PnL by symbol for a wallet."),
);
export type ProfileRealizedPnlRequest = v.InferOutput<typeof ProfileRealizedPnlRequest>;

/** Request parameters for the {@linkcode profileRealizedPnl} function. */
export type ProfileRealizedPnlParameters = v.InferInput<typeof ProfileRealizedPnlRequest>;

/** Medal code used by profile and competition summaries. */
export type MedalCode = 1 | 2 | 3 | null;

/** Margin statistics shown on a user's profile. */
export type ProfileMarginStats = {
  /** Margin currently locked in positions in USD. */
  in_use: Decimal;
  /** Free margin available for new trades in USD. */
  available: Decimal;
  /** Total account equity in USD. */
  total: Decimal;
  /** Lifetime deposit total in USD. */
  deposits: Decimal;
  /** Lifetime withdrawal total in USD. */
  withdraws: Decimal;
};

/** PnL statistics shown on a user's profile. */
export type ProfilePnlStats = {
  /** Current mark-to-market unrealized PnL in USD. */
  unrealized: Decimal;
  /** Realized PnL over the last 24 hours in USD. */
  pnl_24h: Decimal;
  /** Lifetime cumulative realized PnL in USD. */
  lifetime_realized: Decimal;
};

/** Summary of a user's rank in a specific competition, shown on their profile. */
export type ProfileCompetitionRankSummary = {
  /** Competition identifier. */
  competition_id: number;
  /** Competition display name. */
  competition_name: string;
  /** Competition lifecycle state. */
  competition_state: "pre" | "active" | "post";
  /** User's rank in this competition. */
  rank: number;
  /** User's realized PnL in this competition in USD. */
  pnl: Decimal;
  /** User's traded volume in this competition in USD. */
  volume: Decimal;
  /** User's capital efficiency in this competition. */
  efficiency: Decimal;
  /** Medal tier, if awarded. */
  medal: MedalCode;
};

/** Platform-wide medals earned by a user across all competitions. */
export type ProfileMetricMedals = {
  /** Best PnL medal tier. */
  pnl: MedalCode;
  /** Best volume medal tier. */
  volume: MedalCode;
  /** Best efficiency medal tier. */
  efficiency: MedalCode;
};

/** Aggregated profile data for a single user. */
export type ProfileData = {
  /** User's wallet address. */
  wallet: Address;
  /** Display username. */
  username: string;
  /** Moderated profile image URL, if set. */
  profile_image_url?: string | null;
  /** Timestamp when the account was first observed, in milliseconds since epoch. */
  account_first_seen_ts_ms: number | null;
  /** Number of days since the account was first seen. */
  account_age_days: number | null;
  /** Margin statistics. */
  margin: ProfileMarginStats;
  /** PnL statistics. */
  pnl: ProfilePnlStats;
  /** Best overall medal tier across all competitions. */
  medal: MedalCode;
  /** Per-metric best medals across all competitions. */
  platform_medals: ProfileMetricMedals;
  /** Rank in the currently active competition, if participating. */
  active_competition_rank?: ProfileCompetitionRankSummary | null;
};

/** Profile response. */
export type ProfileResponse = {
  /** Whether the request succeeded. */
  success: boolean;
  /** Profile data, present on success. */
  data: ProfileData;
};

/** One profile trade fill from the wallet's perspective. */
export type ProfileTrade = Fill;

/** Profile trade history response. */
export type ProfileTradesResponse = PaginatedResponse<ProfileTrade>;

/** Realized PnL row for one symbol. */
export type RealizedPnlRow = {
  /** Instrument symbol. */
  symbol: string;
  /** Realized PnL in USD. */
  realized_pnl: Decimal;
  /** Number of events included in the realized PnL. */
  event_count: number;
};

/** Per-symbol realized PnL response. */
export type RealizedPnlResponse = {
  /** Whether the request succeeded. */
  success: boolean;
  /** Per-symbol realized PnL rows. */
  data: RealizedPnlRow[];
};

/**
 * Request profile stats for a wallet.
 *
 * @param config General configuration for Info API requests.
 * @param params Parameters specific to the API request.
 * @param signal {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal | AbortSignal} to cancel the request.
 * @return Profile response.
 *
 * @throws {ValidationError} When the request parameters fail validation (before sending).
 * @throws {TransportError} When the transport layer throws an error.
 *
 * @example
 * ```ts
 * import { HttpTransport } from "@hypercall/sdk";
 * import { profile } from "@hypercall/sdk/api/info";
 *
 * const transport = new HttpTransport({ apiUrl: "https://api.hypercall.xyz" });
 *
 * const data = await profile({ transport }, {
 *   wallet: "0x0000000000000000000000000000000000000000",
 * });
 * ```
 *
 * @see https://docs.hypercall.xyz/docs/trading/over-api/
 */
export function profile(
  config: InfoConfig,
  params: ProfileParameters,
  signal?: AbortSignal,
): Promise<ProfileResponse> {
  const request = parse(ProfileRequest, params);
  const query = toQuery({ wallet: request.wallet.toLowerCase() });

  return config.transport.request<ProfileResponse>(`/profile?${query}`, {}, signal);
}

/**
 * Request profile trade history for a wallet.
 *
 * @param config General configuration for Info API requests.
 * @param params Parameters specific to the API request.
 * @param signal {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal | AbortSignal} to cancel the request.
 * @return Profile trade history response.
 *
 * @throws {ValidationError} When the request parameters fail validation (before sending).
 * @throws {TransportError} When the transport layer throws an error.
 *
 * @example
 * ```ts
 * import { HttpTransport } from "@hypercall/sdk";
 * import { profileTrades } from "@hypercall/sdk/api/info";
 *
 * const transport = new HttpTransport({ apiUrl: "https://api.hypercall.xyz" });
 *
 * const data = await profileTrades({ transport }, {
 *   wallet: "0x0000000000000000000000000000000000000000",
 *   limit: 25,
 *   offset: 0,
 * });
 * ```
 *
 * @see https://docs.hypercall.xyz/docs/trading/over-api/
 */
export function profileTrades(
  config: InfoConfig,
  params: ProfileTradesParameters,
  signal?: AbortSignal,
): Promise<ProfileTradesResponse> {
  const request = parse(ProfileTradesRequest, params);
  const query = toQuery({
    wallet: request.wallet.toLowerCase(),
    limit: request.limit,
    offset: request.offset,
    competition_id: request.competition_id,
    from_ts_ms: request.from_ts_ms,
    to_ts_ms: request.to_ts_ms,
    symbol: request.symbol,
  });

  return config.transport.request<ProfileTradesResponse>(`/profile/trades?${query}`, {}, signal);
}

/**
 * Request realized PnL by symbol for a wallet.
 *
 * @param config General configuration for Info API requests.
 * @param params Parameters specific to the API request.
 * @param signal {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal | AbortSignal} to cancel the request.
 * @return Realized PnL by symbol response.
 *
 * @throws {ValidationError} When the request parameters fail validation (before sending).
 * @throws {TransportError} When the transport layer throws an error.
 *
 * @example
 * ```ts
 * import { HttpTransport } from "@hypercall/sdk";
 * import { profileRealizedPnl } from "@hypercall/sdk/api/info";
 *
 * const transport = new HttpTransport({ apiUrl: "https://api.hypercall.xyz" });
 *
 * const data = await profileRealizedPnl({ transport }, {
 *   wallet: "0x0000000000000000000000000000000000000000",
 * });
 * ```
 *
 * @see https://docs.hypercall.xyz/docs/trading/over-api/
 */
export function profileRealizedPnl(
  config: InfoConfig,
  params: ProfileRealizedPnlParameters,
  signal?: AbortSignal,
): Promise<RealizedPnlResponse> {
  const request = parse(ProfileRealizedPnlRequest, params);
  const query = toQuery({
    wallet: request.wallet.toLowerCase(),
    competition_id: request.competition_id,
  });

  return config.transport.request<RealizedPnlResponse>(`/profile/realized-pnl?${query}`, {}, signal);
}
