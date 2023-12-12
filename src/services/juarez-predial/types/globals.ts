interface APIMessage {
  detail: string;
}

type APIBadRequestResponse<F extends string> = Record<F, string[]>;

interface GatedEndpointOptions {
  accessToken: string;
}

export type {
  APIBadRequestResponse,
  APIMessage,
  GatedEndpointOptions,
};
