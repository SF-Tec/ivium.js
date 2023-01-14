type ScalePrefixes =
  | 'a'
  | 'f'
  | 'p'
  | 'n'
  | 'µ'
  | 'm'
  | 'k'
  | 'M'
  | 'G'
  | 'T'
  | 'P';

const prefixExponents: Record<ScalePrefixes, number> = {
  a: -18,
  f: -15,
  p: -12,
  n: -9,
  µ: -6,
  m: -3,
  k: 3,
  M: 6,
  G: 9,
  T: 12,
  P: 15,
};

const getClosestLowerEntry = (
  entrtries: [string, number][],
  value: number
): [string, number] =>
  entrtries.reduce((prev, curr) =>
    Math.abs(curr[1] - value) < Math.abs(prev[1] - value) && curr[1] <= value
      ? curr
      : prev
  );

const scaleUnits = (
  value: number,
  baseSource: string,
  fixed: number = 3
): string => {
  let scalePrefix: ScalePrefixes | '' = '';
  let multiplier = 1;
  const exponent = Math.floor(Math.log10(value));
  if (exponent >= 3 || exponent < 1) {
    const prefixEntries = Object.entries(prefixExponents);
    const [prefix, prefixExponent] = getClosestLowerEntry(
      prefixEntries,
      exponent
    );
    scalePrefix = prefix as ScalePrefixes;
    multiplier = 10 ** -prefixExponent;
  }

  return (
    parseFloat((value * multiplier).toFixed(fixed)) +
    ' ' +
    scalePrefix +
    baseSource
  );
};

export default scaleUnits;
