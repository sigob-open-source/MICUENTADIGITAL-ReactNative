type PaginatedResult<T> = {
  'count': number;
  'next': string | null,
  'previous': string | null,
  results: T[]
};

type NormalizedAPIError = {
  message: string;
  fields?: Record<string, string | undefined>;
};
type UpdateResult = [false, NormalizedAPIError] | [true, null];

export type {
  PaginatedResult,
  NormalizedAPIError,
  UpdateResult,
};
