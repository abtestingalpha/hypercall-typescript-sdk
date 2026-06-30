import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { InfoClient, ValidationError } from '../../../dist/mod.js'

const WALLET = '0xE55B5E5E38F73C30AA367D310D6247F3F9A5E86E'
const LOWER_WALLET = WALLET.toLowerCase()

class MockTransport {
  calls = []
  response

  constructor(response = { ok: true }) {
    this.response = response
  }

  request(path, init = {}, signal) {
    this.calls.push({ path, init, signal })
    return Promise.resolve(this.response)
  }
}

function createClient(response) {
  const transport = new MockTransport(response)
  return {
    client: new InfoClient({ transport }),
    transport,
  }
}

describe('InfoClient', () => {
  const cases = [
    {
      name: 'markets',
      call: (client, signal) => client.markets(signal),
      path: '/markets',
    },
    {
      name: 'markets without instruments',
      call: (client, signal) => client.markets({ include_instruments: false }, signal),
      path: '/markets?include_instruments=false',
    },
    {
      name: 'exchangeInfo',
      call: (client, signal) => client.exchangeInfo(signal),
      path: '/exchange-info',
    },
    {
      name: 'instruments',
      call: (client, signal) => client.instruments({ currency: 'SPCX' }, signal),
      path: '/instruments?currency=SPCX&kind=option',
    },
    {
      name: 'optionSummaries',
      call: (client, signal) => client.optionSummaries({ currency: 'SPCX', expiry: 1782432000 }, signal),
      path: '/options-summary?currency=SPCX&kind=option&expiry=1782432000',
    },
    {
      name: 'orderbook',
      call: (client, signal) => client.orderbook({ instrumentId: 123, depth: 20 }, signal),
      path: '/orderbook?instrument_id=123&depth=20',
    },
    {
      name: 'portfolio',
      call: (client, signal) => client.portfolio({ wallet: WALLET }, signal),
      path: `/portfolio?wallet=${LOWER_WALLET}`,
    },
    {
      name: 'orders',
      call: (client, signal) => client.orders({ wallet: WALLET, limit: 25, offset: 0, status: 'open' }, signal),
      path: `/orders?wallet=${LOWER_WALLET}&limit=25&offset=0&status=open`,
    },
    {
      name: 'fills',
      call: (client, signal) => client.fills({ wallet: WALLET, limit: 25, offset: 0 }, signal),
      path: `/fills?wallet=${LOWER_WALLET}&limit=25&offset=0`,
    },
    {
      name: 'historicalPnl',
      call: (client, signal) =>
        client.historicalPnl({
          wallet: WALLET,
          interval: '1h',
          limit: 24,
          includeAttribution: true,
        }, signal),
      path: `/historical-pnl?wallet=${LOWER_WALLET}&interval=1h&limit=24&include_attribution=true`,
    },
    {
      name: 'liquidationStatus',
      call: (client, signal) => client.liquidationStatus({ wallet: WALLET }, signal),
      path: `/liquidation/status?wallet=${LOWER_WALLET}`,
    },
    {
      name: 'liquidationHistory',
      call: (client, signal) => client.liquidationHistory({ wallet: WALLET, limit: 20, offset: 0 }, signal),
      path: `/liquidation/history?wallet=${LOWER_WALLET}&limit=20&offset=0`,
    },
    {
      name: 'liquidations',
      call: (client, signal) =>
        client.liquidations({
          limit: 10,
          wallet: WALLET,
          status: 'in_liquidation',
          state: 'pre_liquidation',
          marginMode: 'standard',
          liquidationMode: 'full',
        }, signal),
      path:
        `/liquidations?limit=10&wallet=${LOWER_WALLET}&status=in_liquidation&state=pre_liquidation&margin_mode=standard&liquidation_mode=full`,
    },
    {
      name: 'settlementPayouts',
      call: (client, signal) =>
        client.settlementPayouts({
          wallet: WALLET,
          limit: 25,
          offset: 0,
          symbol: 'SPCX-20261231-10-C',
          ledgerApplied: false,
        }, signal),
      path:
        `/settlement-payouts?wallet=${LOWER_WALLET}&limit=25&offset=0&symbol=SPCX-20261231-10-C&ledger_applied=false`,
    },
    {
      name: 'authorizedAgents',
      call: (client, signal) => client.authorizedAgents({ wallet: WALLET }, signal),
      path: `/authorized-agents?wallet=${LOWER_WALLET}`,
    },
    {
      name: 'directiveStatus',
      call: (client, signal) => client.directiveStatus({ directiveId: 'directive 1?' }, signal),
      path: '/v1/directives/directive%201%3F',
      init: { cache: 'no-store' },
    },
    {
      name: 'withdrawalHistory',
      call: (client, signal) => client.withdrawalHistory({ wallet: WALLET, limit: 5 }, signal),
      path: `/v1/withdrawals?wallet=${LOWER_WALLET}&limit=5`,
      init: { cache: 'no-store' },
    },
    {
      name: 'rfqStatus',
      call: (client, signal) => client.rfqStatus({ rfqId: 'rfq/id?' }, signal),
      path: '/rfq/rfq%2Fid%3F',
    },
    {
      name: 'historicalTheos',
      call: (client, signal) =>
        client.historicalTheos({
          instrumentName: 'SPCX-20261231-10-C',
          interval: '1h',
          limit: 48,
        }, signal),
      path: '/historical-theos?instrument_name=SPCX-20261231-10-C&interval=1h&limit=48',
    },
    {
      name: 'historicalTheosBatch',
      call: (client, signal) =>
        client.historicalTheosBatch({
          instrumentNames: ['SPCX-20261231-10-C', 'SPCX-20261231-12-C'],
          interval: '1h',
          limit: 48,
        }, signal),
      path:
        '/historical-theos/batch?instrument_names=SPCX-20261231-10-C%2CSPCX-20261231-12-C&interval=1h&limit=48',
    },
  ]

  for (const testCase of cases) {
    test(`${testCase.name} sends the expected request`, async () => {
      const response = { method: testCase.name }
      const { client, transport } = createClient(response)
      const controller = new AbortController()

      const result = await testCase.call(client, controller.signal)

      assert.equal(result, response)
      assert.deepEqual(transport.calls, [
        {
          path: testCase.path,
          init: testCase.init ?? {},
          signal: controller.signal,
        },
      ])
    })
  }

  test('validates parameters before sending a request', async () => {
    const { client, transport } = createClient()

    assert.throws(
      () => client.portfolio({ wallet: 'not-a-wallet' }),
      ValidationError,
    )

    assert.deepEqual(transport.calls, [])
  })
})
