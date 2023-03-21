// Types & Interfaces
interface LogEvent extends Record<string, unknown> {
  event: string;
  key?: string;
  /** file name */
  source: string;
}

interface ErrorLogEvent extends LogEvent {
  error?: Error;
  message: string;
}

function makeLoggerEvent<T>(fn: (...params: unknown[]) => void) {
  const log = (event: T) => {
    if (__DEV__) {
      fn(event);
    }
  };

  return log;
}

const Logger = {
  log: makeLoggerEvent<LogEvent>(console.log),
  info: makeLoggerEvent<LogEvent>(console.info),
  warn: makeLoggerEvent<LogEvent>(console.warn),
  error: makeLoggerEvent<ErrorLogEvent>(console.error),
};

export default Logger;
