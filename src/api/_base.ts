import * as v from '@valibot/valibot'

export { parse, ValidationError } from '../_base.ts'

export const NonEmptyString = v.pipe(
  v.string(),
  v.trim(),
  v.minLength(1, 'Expected a non-empty string'),
)

export const WalletAddress = v.pipe(
  NonEmptyString,
  v.regex(/^0x[a-fA-F0-9]{40}$/, 'Expected an EVM wallet address'),
)

export const PositiveInteger = v.pipe(
  v.number(),
  v.integer('Expected an integer'),
  v.minValue(1, 'Expected a positive integer'),
)

export const NonNegativeInteger = v.pipe(
  v.number(),
  v.integer('Expected an integer'),
  v.minValue(0, 'Expected a non-negative integer'),
)
