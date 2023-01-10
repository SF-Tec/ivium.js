export function executeIviumMethod<T>(method: () => T) {
  try {
    const result = method();

    return {
      success: true,
      result,
    };
  } catch (e) {
    console.log(e);

    return {
      success: false,
      result: null,
    };
  }
}
