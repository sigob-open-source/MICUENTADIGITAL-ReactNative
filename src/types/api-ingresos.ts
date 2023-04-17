type PaginatedResult<T> = {
  count: number;
  next: string | null,
  previous: string | null,
  results: T[]
};

type DetailResponse = {
  detail: string;
};

type NormalizedAPIError = {
  message: string;
  fields?: Record<string, string | undefined>;
};

type MutationResult<TData> = {
  success: true;
  result: TData;
  errors: null;
} | {
  success: false;
  result: null;
  errors: NormalizedAPIError;
};

export type {
  PaginatedResult,
  NormalizedAPIError,
  MutationResult,
  DetailResponse,
};
