# Hypercall TypeScript SDK

TypeScript SDK scaffold for Hypercall API consumers.

The source layout follows the current `@nktkas/hyperliquid` repository style:

- `deno.json` exports source `.ts` entrypoints.
- Source files import other source files with `.ts` extensions.
- Domain clients live under `src/api/<domain>/client.ts`.
- Low-level tree-shakeable methods live under `src/api/<domain>/_methods/`.

For local Next.js dogfooding, `package.json` builds `dist/` with JavaScript imports rewritten from `.ts` to `.js`.

## Local Development

```bash
corepack pnpm install
corepack pnpm dev
```

From the frontend repo, link this package while developing:

```bash
cd /Users/abtestingalpha/Desktop/hypertheta/frontend
pnpm add @hypercall/sdk@link:/Users/abtestingalpha/Desktop/hypercall-typescript-sdk
```

Then import it normally:

```ts
import { HttpTransport, InfoClient } from '@hypercall/sdk'

const transport = new HttpTransport()
const info = new InfoClient({ transport })
const markets = await info.markets()
```

Low-level method imports:

```ts
import { HttpTransport } from '@hypercall/sdk'
import { markets } from '@hypercall/sdk/api/info'

const transport = new HttpTransport()
const data = await markets({ transport })
```

Do not commit a frontend `link:` dependency. Switch the frontend to a GitHub commit or package version before a dogfood PR.
