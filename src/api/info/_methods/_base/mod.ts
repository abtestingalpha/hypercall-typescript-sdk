import type { IRequestTransport } from '../../../../transport/_base.ts'

export interface InfoConfig {
  transport: IRequestTransport
}

export function toQuery(values: Record<string, string | number | undefined>): string {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined) {
      params.set(key, String(value))
    }
  }

  return params.toString()
}
