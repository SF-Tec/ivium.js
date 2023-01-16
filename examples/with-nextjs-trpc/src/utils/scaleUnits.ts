const prefixExponents = {
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

type ScalePrefixes = keyof typeof prefixExponents;

const getClosestLowerValueIndex = (
  allValues: number[],
  value: number
): number => {
  const closestLowerValue = allValues.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) && curr <= value
      ? curr
      : prev
  );

  return allValues.indexOf(closestLowerValue);
};

const scaleUnits = (value: number, baseUnit: string, fixed = 3): string => {
  let scalePrefix: ScalePrefixes | '' = '';
  let multiplier = 1;
  const exponent = Math.floor(Math.log10(value));

  if (exponent < 1 || exponent >= 3) {
    const prefixEntries = Object.entries(prefixExponents);

    const closestLowerPrefixIndex = getClosestLowerValueIndex(
      Object.values(prefixExponents),
      exponent
    );

    const closestLowerPrefixEntry = prefixEntries[closestLowerPrefixIndex];

    scalePrefix = closestLowerPrefixEntry[0] as ScalePrefixes;
    multiplier = 10 ** -closestLowerPrefixEntry[1];
  }

  return (
    parseFloat((value * multiplier).toFixed(fixed)) +
    ' ' +
    scalePrefix +
    baseUnit
  );
};

export default scaleUnits;
