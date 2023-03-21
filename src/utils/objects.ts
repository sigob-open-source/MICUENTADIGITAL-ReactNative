type ObjectWithUndefinedProperties = Record<string, unknown>;

function removeUndefinedProperties<T extends ObjectWithUndefinedProperties>(obj: T): T {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    // eslint-disable-next-line no-undefined
    if (value !== undefined) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      acc[key] = value;
    }
    return acc;
  }, {} as T);
}

export {
  removeUndefinedProperties,
};
