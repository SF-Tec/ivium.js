import { Library } from 'ffi-napi';
import ref from 'ref-napi';
import refArray from 'ref-array-di';

const getIviumDllPath = () => {
  const architecture = process.arch === 'x64' ? '64' : '';

  return `${__dirname}\\dlls\\Ivium_remdriver${architecture}.dll`;
};

const { char, int, long } = ref.types;
const ArrayType = refArray(ref);
export const CharArray = ArrayType(char);
export const LongArray = ArrayType(long) as refArray.ArrayType<number>;

export const buildFfiLibrary = () =>
  Library(getIviumDllPath(), {
    IV_close: [int, []],
    IV_connect: [int, [LongArray]],
    IV_MaxDevices: [int, []],
    IV_open: [int, []],
    IV_readSN: [int, [CharArray]],
    IV_selectdevice: [int, [LongArray]],
    IV_setconnectionmode: [int, [LongArray]],
  });
