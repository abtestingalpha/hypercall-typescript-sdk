/** AbortSignal wiring helpers shared by transports. */

/** Aborts `target` with a TimeoutError after `ms`; `null` disables the timeout. */
export function scheduleTimeout(
  target: AbortController,
  ms: number | null,
): { reason: Error; cancel: () => void } {
  const reason = new DOMException('Signal timed out.', 'TimeoutError')
  const timeoutId = ms !== null && Number.isFinite(ms)
    ? setTimeout(() => target.abort(reason), ms)
    : undefined

  return { reason, cancel: () => clearTimeout(timeoutId) }
}

/** Relays abort events from `sources` into `target` and returns a detach function. */
export function relay(
  sources: Array<AbortSignal | null | undefined>,
  target: AbortController,
): () => void {
  const detach = new AbortController()

  for (const source of sources) {
    if (!source) {
      continue
    }
    if (source.aborted) {
      target.abort(source.reason)
      break
    }
    source.addEventListener('abort', () => target.abort(source.reason), {
      once: true,
      signal: detach.signal,
    })
  }

  return () => detach.abort()
}
