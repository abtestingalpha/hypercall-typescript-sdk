import { TransportError, type IRequestTransport } from '../_base.ts'

export type FetchLike = (
  input: string | URL | Request,
  init?: RequestInit,
) => Promise<Response>

export interface HttpTransportServerConfig {
  api: string
}

export interface HttpTransportOptions {
  isTestnet?: boolean
  timeout?: number | false
  server?: {
    mainnet?: Partial<HttpTransportServerConfig>
    testnet?: Partial<HttpTransportServerConfig>
  }
  fetch?: FetchLike
  fetchOptions?: RequestInit
  onRequest?: (request: Request) => Request | Promise<Request>
  onResponse?: (response: Response) => Response | Promise<Response>
  onError?: (error: unknown) => Error | Promise<Error>
}

/** Error thrown when an HTTP request fails. */
export class HttpRequestError extends TransportError {
  readonly response?: Response
  readonly body?: string

  constructor(args?: { response?: Response; body?: string }, options?: ErrorOptions) {
    const { response, body } = args ?? {}
    let message: string

    if (response) {
      message = `${response.status} ${response.statusText}`.trim()
      if (body) {
        message += ` - ${body}`
      }
    } else {
      message = `Unknown error while making an HTTP request: ${options?.cause}`
    }

    super(message, options)
    this.name = 'HttpRequestError'
    this.response = response
    this.body = body
  }
}

/** HTTP implementation of the REST transport interface. */
export class HttpTransport implements IRequestTransport {
  readonly isTestnet: boolean
  readonly timeout: number | false
  readonly server: {
    mainnet: HttpTransportServerConfig
    testnet: HttpTransportServerConfig
  }

  private readonly fetchImpl: FetchLike
  private readonly fetchOptions: RequestInit
  private readonly onRequest?: HttpTransportOptions['onRequest']
  private readonly onResponse?: HttpTransportOptions['onResponse']
  private readonly onError?: HttpTransportOptions['onError']

  constructor(options: HttpTransportOptions = {}) {
    this.isTestnet = options.isTestnet ?? false
    this.timeout = options.timeout === undefined ? 10_000 : options.timeout
    this.server = {
      mainnet: {
        api: options.server?.mainnet?.api ?? 'https://api.hypercall.xyz',
      },
      testnet: {
        api: options.server?.testnet?.api ?? 'https://staging-api.cortex-dev.com',
      },
    }
    this.fetchImpl = options.fetch ?? globalThis.fetch
    this.fetchOptions = options.fetchOptions ?? {}
    this.onRequest = options.onRequest
    this.onResponse = options.onResponse
    this.onError = options.onError

    if (!this.fetchImpl) {
      throw new HttpRequestError(undefined, {
        cause: new Error('No fetch implementation available'),
      })
    }
  }

  async request<TResponse = unknown>(
    path: string,
    init: RequestInit = {},
  ): Promise<TResponse> {
    try {
      const url = new URL(path, this.server[this.isTestnet ? 'testnet' : 'mainnet'].api)
      const requestInit = mergeRequestInit(
        {
          headers: {
            accept: 'application/json',
          },
          signal: this.timeout === false ? undefined : AbortSignal.timeout(this.timeout),
        },
        this.fetchOptions,
        init,
      )

      let request = new Request(url, requestInit)

      if (this.onRequest) {
        request = await this.onRequest(request)
      }

      let response = await this.fetchImpl(request).catch(async (error) => {
        if (this.onError) {
          throw await this.onError(error)
        }
        throw error
      })

      if (this.onResponse) {
        response = await this.onResponse(response)
      }

      const text = await response.text()
      const body = text ? parseJson(text) : null

      if (!response.ok) {
        throw new HttpRequestError({ response, body: text })
      }

      return body as TResponse
    } catch (error) {
      if (error instanceof TransportError) {
        throw error
      }
      throw new HttpRequestError(undefined, { cause: error })
    }
  }
}

function parseJson(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch (error) {
    throw new HttpRequestError(undefined, { cause: error })
  }
}

function mergeHeadersInit(...inits: Array<HeadersInit | undefined>): Headers {
  const merged = new Headers()

  for (const headers of inits) {
    if (!headers) {
      continue
    }

    new Headers(headers).forEach((value, key) => {
      merged.set(key, value)
    })
  }

  return merged
}

function mergeRequestInit(...inits: RequestInit[]): RequestInit {
  const merged = inits.reduce<RequestInit>((acc, init) => {
    return { ...acc, ...init }
  }, {})

  merged.headers = mergeHeadersInit(...inits.map((init) => init.headers))

  const signals = inits
    .map((init) => init.signal)
    .filter((signal): signal is AbortSignal => signal instanceof AbortSignal)

  if (signals.length === 1) {
    merged.signal = signals[0]
  } else if (signals.length > 1) {
    merged.signal = AbortSignal.any(signals)
  }

  return merged
}
