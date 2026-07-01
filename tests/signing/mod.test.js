import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import {
  ACCEPT_RFQ_QUOTE_TYPES,
  APPROVE_AGENT_TYPES,
  HYPERCALL_DOMAIN_FIELDS,
  HYPERCALL_VERIFYING_CONTRACT,
  PLACE_ORDER_TYPES,
  buildAcceptRfqQuoteValue,
  buildApproveAgentValue,
  buildPlaceOrderValue,
  buildSetProfileImageValue,
  buildSignedBody,
  buildSubmitRfqValue,
  buildTypedData,
  createHypercallDomain,
} from '../../dist/signing/mod.js'

const WALLET = '0xE55B5E5E38F73C30AA367D310D6247F3F9A5E86E'
const LOWER_WALLET = WALLET.toLowerCase()
const AGENT = '0xAB7Bab0e4c09Ff447863f507C16090A9A02792d2'
const LOWER_AGENT = AGENT.toLowerCase()

describe('signing helpers', () => {
  test('exposes the Hypercall EIP-712 domain fields', () => {
    assert.deepEqual(createHypercallDomain(999), {
      name: 'Hypercall',
      version: '1',
      chainId: 999,
      verifyingContract: HYPERCALL_VERIFYING_CONTRACT,
    })
    assert.deepEqual(HYPERCALL_DOMAIN_FIELDS, [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ])
  })

  test('buildTypedData matches the frontend EIP-712 envelope shape', () => {
    const message = buildApproveAgentValue(AGENT, 42)
    const typedData = buildTypedData({
      chainId: 998,
      primaryType: 'ApproveAgent',
      types: APPROVE_AGENT_TYPES,
      message,
    })

    assert.deepEqual(typedData, {
      domain: {
        name: 'Hypercall',
        version: '1',
        chainId: 998,
        verifyingContract: HYPERCALL_VERIFYING_CONTRACT,
      },
      types: {
        EIP712Domain: HYPERCALL_DOMAIN_FIELDS,
        ApproveAgent: [
          { name: 'agent', type: 'address' },
          { name: 'nonce', type: 'uint64' },
        ],
      },
      primaryType: 'ApproveAgent',
      message: {
        agent: LOWER_AGENT,
        nonce: 42n,
      },
    })
  })

  test('exports typed-data maps used by current write actions', () => {
    assert.deepEqual(PLACE_ORDER_TYPES.PlaceOrder, [
      { name: 'wallet', type: 'address' },
      { name: 'symbol', type: 'string' },
      { name: 'side', type: 'string' },
      { name: 'size', type: 'string' },
      { name: 'price', type: 'string' },
      { name: 'tif', type: 'string' },
      { name: 'clientId', type: 'string' },
      { name: 'nonce', type: 'uint64' },
    ])
    assert.deepEqual(ACCEPT_RFQ_QUOTE_TYPES.AcceptRFQQuote, [
      { name: 'rfqId', type: 'bytes32' },
      { name: 'quoteId', type: 'bytes32' },
      { name: 'netPremium', type: 'int256' },
      { name: 'wallet', type: 'address' },
      { name: 'nonce', type: 'uint64' },
    ])
  })

  test('normalizes typed-data values the same way as the frontend helpers', () => {
    assert.deepEqual(buildPlaceOrderValue({
      wallet: WALLET,
      symbol: 'BTC-260626-100000-C',
      side: 'Buy',
      size: '1',
      price: '2.5',
      tif: 'gtc',
      nonce: 7,
    }), {
      wallet: LOWER_WALLET,
      symbol: 'BTC-260626-100000-C',
      side: 'Buy',
      size: '1',
      price: '2.5',
      tif: 'gtc',
      clientId: '',
      nonce: 7n,
    })

    assert.deepEqual(buildSubmitRfqValue({
      rfqId: '0x1111111111111111111111111111111111111111111111111111111111111111',
      legsHash: '0x2222222222222222222222222222222222222222222222222222222222222222',
      wallet: WALLET,
      nonce: 8,
    }), {
      rfqId: '0x1111111111111111111111111111111111111111111111111111111111111111',
      legsHash: '0x2222222222222222222222222222222222222222222222222222222222222222',
      wallet: LOWER_WALLET,
      nonce: 8n,
    })

    assert.deepEqual(buildAcceptRfqQuoteValue({
      rfqId: '0x1111111111111111111111111111111111111111111111111111111111111111',
      quoteId: '0x3333333333333333333333333333333333333333333333333333333333333333',
      netPremium: -12n,
      wallet: WALLET,
      nonce: 9,
    }), {
      rfqId: '0x1111111111111111111111111111111111111111111111111111111111111111',
      quoteId: '0x3333333333333333333333333333333333333333333333333333333333333333',
      netPremium: -12n,
      wallet: LOWER_WALLET,
      nonce: 9n,
    })

    assert.deepEqual(buildSetProfileImageValue({
      wallet: WALLET,
      imageSha256: ' ABCD ',
      nonce: 10,
    }), {
      wallet: LOWER_WALLET,
      imageSha256: 'abcd',
      nonce: 10n,
    })
  })

  test('buildSignedBody lowercases wallet and signer for pre-signed requests', () => {
    assert.deepEqual(buildSignedBody({
      wallet: WALLET,
      signer: AGENT,
      nonce: 11,
      signature: '0xsignature',
      ids: [1, 2],
    }), {
      ids: [1, 2],
      wallet: LOWER_WALLET,
      signature: '0xsignature',
      nonce: 11,
      signer: LOWER_AGENT,
    })
  })
})
