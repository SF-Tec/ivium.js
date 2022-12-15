import { Library } from 'ffi-napi';
import ref from 'ref-napi';
import refArray from 'ref-array-di';
import { getIviumDllPath } from './util';

const ArrayType = refArray(ref);
const { char, int, long } = ref.types;
const CharArray = ArrayType(char);
const LongArray = ArrayType(long);

const DLL_PATH = getIviumDllPath();
console.log(DLL_PATH);

class Core {
  static #isDriverOpen = false;
  static #lib = Library(DLL_PATH, {
    IV_close: [int, []],
    IV_connect: [int, [LongArray]],
    IV_MaxDevices: [int, []],
    IV_open: [int, []],
    IV_readSN: [int, [CharArray]],
    IV_selectdevice: [int, [LongArray]],
    IV_setconnectionmode: [int, [LongArray]],
  });

  //
  // GENERIC FUNCTIONS //
  //

  static IV_open() {
    Core.#isDriverOpen = true;
    return Core.#lib.IV_open();
  }

  static IV_close() {
    Core.#isDriverOpen = false;
    return Core.#lib.IV_close();
  }

  static isDriverOpen() {
    return Core.#isDriverOpen;
  }

  static IV_MaxDevices() {
    return Core.#lib.IV_MaxDevices();
  }

  static IV_selectdevice(
    iviumsoftInstanceNumber: number
  ): [resultCode: number, instanceNumber: number] {
    const instanceNumberPtr = new LongArray([iviumsoftInstanceNumber]);

    const resultCode = Core.#lib.IV_selectdevice(instanceNumberPtr);

    return [resultCode, instanceNumberPtr[0] as number];
  }

  static IV_readSN(): [resultCode: number, serialNumber: string] {
    const deviceSerialNumberPtr = new CharArray(16);

    const resultCode = Core.#lib.IV_readSN(deviceSerialNumberPtr);

    return [resultCode, deviceSerialNumberPtr.buffer.readCString()];
  }

  static IV_connect(
    connectionStatus: number
  ): [resultCode: number, connectionStatus: number] {
    const connectionStatusPtr = new LongArray([connectionStatus]);

    const resultCode = Core.#lib.IV_connect(connectionStatusPtr);

    return [resultCode, connectionStatusPtr[0] as number];
  }

  static IV_setconnectionmode(
    connectionModeNumber: number
  ): [resultCode: number, connectionModeNumber: number] {
    const connectionModeNumberPtr = new LongArray([connectionModeNumber]);

    const resultCode = Core.#lib.IV_setconnectionmode(connectionModeNumberPtr);

    return [resultCode, connectionModeNumberPtr[0] as number];
  }
}

export default Core;
