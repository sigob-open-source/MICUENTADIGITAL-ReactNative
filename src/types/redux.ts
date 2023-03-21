type Action<T = unknown> = {
  type: string;
  payload: T
};

type ActionHandler<State> = Record<string, (state: State, action?: Action) => State>;

type GenericDispatch = (props: unknown) => void;

export type {
  Action,
  ActionHandler,
  GenericDispatch,
};
