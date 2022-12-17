import { Library } from 'ffi-napi';
import ref from 'ref-napi';
import refArray from 'ref-array-di';

const getIviumDllPath = () => {
  const architecture = process.arch === 'x64' ? '64' : '';

  return `${__dirname}\\dlls\\Ivium_remdriver${architecture}.dll`;
};

const { char, double, int, long } = ref.types;
const ArrayType = refArray(ref);
export const CharArray = ArrayType(char);
export const DoubleArray = ArrayType(double);
export const LongArray = ArrayType(long) as refArray.ArrayType<number>;

export const buildCharArray = (text: string) => {
  const buffer = Buffer.from(text, 'ascii');

  return new CharArray(buffer);
};

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
    IV_getcellstatus: [int, [LongArray]],
    IV_setconnectionmode: [int, [LongArray]],
    IV_setcellon: [int, [LongArray]],
    IV_setpotential: [int, [DoubleArray]],
    IV_setpotentialWE2: [int, [DoubleArray]],
    IV_setcurrent: [int, [DoubleArray]],
    IV_getpotential: [int, [DoubleArray]],
    IV_setcurrentrange: [int, [LongArray]],
    IV_setcurrentrangeWE2: [int, [LongArray]],
    IV_getcurrent: [int, [DoubleArray]],
    IV_getcurrentWE2: [int, [DoubleArray]],
    IV_setfilter: [int, [LongArray]],
    IV_setstability: [int, [LongArray]],
    IV_setbistatmode: [int, [LongArray]],
    IV_setdac: [int, [LongArray, DoubleArray]],
    IV_getadc: [int, [LongArray, DoubleArray]],
    IV_setmuxchannel: [int, [LongArray]],
    IV_setdigout: [int, [LongArray]],
    IV_getdigin: [int, [LongArray]],
    IV_setfrequency: [int, [LongArray, DoubleArray]],
    IV_setamplitude: [int, [LongArray, DoubleArray]],
    IV_getcurrenttrace: [int, [LongArray, DoubleArray, DoubleArray]],
    IV_getcurrentWE2trace: [int, [LongArray, DoubleArray, DoubleArray]],
    IV_getpotentialtrace: [int, [LongArray, DoubleArray, DoubleArray]],

    /* WE32 */
    IV_we32setchannel: [int, [LongArray]],
    IV_we32setoffset: [int, [LongArray, DoubleArray]],
    IV_we32setoffsets: [int, [LongArray, DoubleArray]],
    IV_we32getoffsets: [int, [LongArray, DoubleArray]],
    IV_we32readcurrents: [int, [DoubleArray]],

    /* METHOD MODE */
    IV_readmethod: [int, [CharArray]],
    IV_savemethod: [int, [CharArray]],
    IV_startmethod: [int, [CharArray]],
    IV_abort: [int, []],
    IV_savedata: [int, [CharArray]],
    IV_setmethodparameter: [int, [CharArray, CharArray]],
    IV_Ndatapoints: [int, [LongArray]],
    IV_getdata: [int, [LongArray, DoubleArray, DoubleArray, DoubleArray]],
    IV_getdatafromline: [
      int,
      [LongArray, LongArray, DoubleArray, DoubleArray, DoubleArray],
    ],

    /* EXTRA */
    IV_getDbFileName: [int, [CharArray]],
  });
