import type { IRequestTransport } from "../../../../transport/_base.ts";

/** General configuration for Hypercall Info API requests. */
export interface InfoConfig {
  /** Transport used to execute requests. */
  transport: IRequestTransport;
}

export function toQuery(values: Record<string, boolean | number | string | undefined>): string {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  }

  return params.toString();
}
