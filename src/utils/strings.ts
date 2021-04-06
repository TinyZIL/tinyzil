import BigNumber from 'bignumber.js'

export const BIG_ZERO = new BigNumber(0);

export const parseBN = (input?: string | BigNumber | number, defaultValue?: BigNumber) => {
  if (!input && input !== 0) return defaultValue;
  const result = BigNumber.isBigNumber(input) ? input : new BigNumber(input);
  if (!result.isFinite() || result.isNaN())
    return defaultValue;

  return result;
};

export const bnOrZero = (input?: string | BigNumber | number, defaultValue: BigNumber = BIG_ZERO) => {
  return parseBN(input, defaultValue)!;
};