import * as v from '@valibot/valibot'

import { HypercallError } from '../_base.ts'

/** Thrown when an SDK method receives invalid input. */
export class SchemaError extends HypercallError {
  readonly issues: unknown

  constructor(message: string, options?: { issues?: unknown; cause?: unknown }) {
    super(message, { cause: options?.cause })
    this.name = 'SchemaError'
    this.issues = options?.issues
  }
}

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

export function parser<const TSchema extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>(schema: TSchema) {
  return (input: unknown): v.InferOutput<TSchema> => {
    const result = v.safeParse(schema, input)
    if (!result.success) {
      throw new SchemaError('Schema validation failed', {
        issues: result.issues,
      })
    }
    return result.output
  }
}
