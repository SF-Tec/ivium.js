import { Library } from 'ffi-napi';
import ref, { Pointer } from 'ref-napi';
import refArray from 'ref-array-di';

const getIviumDllPath = () => {
  const architecture = process.arch === 'x64' ? '64' : '';

  return `${__dirname}\\dlls\\Ivium_remdriver${architecture}.dll`;
};

export const { char, CString, double, int, long } = ref.types;
const ArrayType = refArray(ref);
export const CharArray = ArrayType(char);
export const DoubleArray = ArrayType(double);
export const LongArray = ArrayType(long) as refArray.ArrayType<number>;
export const CharPtr = ref.refType(char);
export const DoublePtr = ref.refType(double);
export const LongPtr = ref.refType(long);

export const buildCharArray = (text: string) => {
  return ref.allocCString(text) as unknown as Pointer<number>;
};

// create char array from the text "hello" with the ref-array-di package

function buildPointer(refType: ref.Type, value?: number | string) {
  return ref.alloc(refType, value) as unknown as Pointer<number>;
}

export function buildNumericPointer(refType: ref.Type, value?: number) {
  return buildPointer(refType, value) as ref.Pointer<number>;
}

export function buildCharPointer(value?: string) {
  return buildPointer(char, value);
}

export const buildFfiLibrary = () =>
  Library(getIviumDllPath(), {
    /* GENERAL */
    IV_open: [int, []],
    IV_close: [int, []],
    IV_MaxDevices: [int, []],
    IV_selectdevice: [int, [LongArray]],
    IV_getdevicestatus: [int, []],
    IV_readSN: [int, [CharArray]],
    IV_connect: [int, [LongArray]],
    IV_VersionHost: [int, [LongArray]],
    IV_VersionDll: [int, []],
    IV_VersionCheck: [int, []],
    IV_HostHandle: [int, []],
    IV_VersionDllFile: [int, []],
    IV_VersionDllFileStr: [int, []],
    IV_SelectChannel: [int, [LongArray]],

    /* DIRECT MODE */
    IV_getcellstatus: [int, [LongPtr]],
    IV_setconnectionmode: [int, [LongPtr]],
    IV_setcellon: [int, [LongPtr]],
    IV_setpotential: [int, [DoublePtr]],
    IV_setpotentialWE2: [int, [DoublePtr]],
    IV_setcurrent: [int, [DoublePtr]],
    IV_getpotential: [int, [DoublePtr]],
    IV_setcurrentrange: [int, [LongPtr]],
    IV_setcurrentrangeWE2: [int, [LongPtr]],
    IV_getcurrent: [int, [DoublePtr]],
    IV_getcurrentWE2: [int, [DoublePtr]],
    IV_setfilter: [int, [LongPtr]],
    IV_setstability: [int, [LongPtr]],
    IV_setbistatmode: [int, [LongPtr]],
    IV_setdac: [int, [LongPtr, DoublePtr]],
    IV_getadc: [int, [LongPtr, DoublePtr]],
    IV_setmuxchannel: [int, [LongPtr]],
    IV_setdigout: [int, [LongPtr]],
    IV_getdigin: [int, [LongPtr]],
    IV_setfrequency: [int, [DoublePtr]],
    IV_setamplitude: [int, [DoublePtr]],
    IV_getcurrenttrace: [int, [LongPtr, DoublePtr, DoublePtr]],
    IV_getcurrentWE2trace: [int, [LongPtr, DoublePtr, DoublePtr]],
    IV_getpotentialtrace: [int, [LongPtr, DoublePtr, DoublePtr]],

    /* WE32 */
    IV_we32setchannel: [int, [LongPtr]],
    IV_we32setoffset: [int, [LongPtr, DoublePtr]],
    IV_we32setoffsets: [int, [LongPtr, DoublePtr]],
    IV_we32getoffsets: [int, [LongPtr, DoublePtr]],
    IV_we32readcurrents: [int, [DoublePtr]],

    /* METHOD MODE */
    IV_readmethod: [int, [CString]],
    IV_savemethod: [int, [CString]],
    IV_startmethod: [int, [CString]],
    IV_abort: [int, []],
    IV_savedata: [int, [CString]],
    IV_setmethodparameter: [int, [CString, CString]],
    IV_Ndatapoints: [int, [LongArray]],
    IV_getdata: [int, [LongPtr, DoublePtr, DoublePtr, DoublePtr]],
    IV_getdatafromline: [
      int,
      [LongPtr, LongPtr, DoublePtr, DoublePtr, DoublePtr],
    ],

    /* EXTRA */
    IV_getDbFileName: [int, [CharArray]],
  });
