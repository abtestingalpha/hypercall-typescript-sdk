import * as v from "@valibot/valibot";

/** Base error class for all SDK errors. */
export class HypercallError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "HypercallError";
  }
}

/** Thrown when an SDK method receives invalid input. */
export class ValidationError extends HypercallError {
  override cause: v.ValiError<v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>;

  constructor(
    message: string,
    options: { cause: v.ValiError<v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>> },
  ) {
    super(message, options);
    this.name = "ValidationError";
    this.cause = options.cause;
  }
}

/** Parse an SDK input value or throw a summarized validation error. */
export function parse<const TSchema extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>(
  schema: TSchema,
  input: unknown,
): v.InferOutput<TSchema> {
  try {
    return v.parse(schema, input);
  } catch (error) {
    const valiError = error as v.ValiError<typeof schema>;
    throw new ValidationError(v.summarize(valiError.issues), { cause: valiError });
  }
}
