import { Library } from 'ffi-napi';
import ref from 'ref-napi';
import refArray from 'ref-array-di';
import { getIviumDllPath } from './util';

const ArrayType = refArray(ref);
const { char, long } = ref.types;
const CharArray = ArrayType(char);

const DLL_PATH = getIviumDllPath();
console.log(DLL_PATH);

const Core = Library(DLL_PATH, {
  IV_close: [long, []],
  IV_connect: [long, [ref.refType(long)]],
  IV_MaxDevices: [long, []],
  IV_open: [long, []],
  IV_readSN: [long, [CharArray]],
});

export default Core;
