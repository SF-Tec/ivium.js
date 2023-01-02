/**
 * A tuple that represents the result of an Ivium function call. The first element is a number indicating the result code, and the second element is the actual result of the function.
 * @template T The type of the actual result of the function. Can be a string or a number (default is number).
 */
export type IviumResult<T extends string | number | number[]> = [number, T];
