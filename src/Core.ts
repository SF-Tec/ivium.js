import { buildFfiLibrary, CharArray, LongArray } from './ffiLibrary';

type IviumResult<T extends string | number = number> = [number, T];

class Core {
  static #isDriverOpen = false;
  static readonly #lib = buildFfiLibrary();

  // #######################
  // ## GENERIC FUNCTIONS ##
  // #######################

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

  static IV_selectdevice(iviumsoftInstanceNumber: number): IviumResult {
    const instanceNumberPtr = new LongArray([iviumsoftInstanceNumber]);

    const resultCode = Core.#lib.IV_selectdevice(instanceNumberPtr);

    return [resultCode, instanceNumberPtr[0]];
  }

  static IV_readSN(): IviumResult<string> {
    const deviceSerialNumberPtr = new CharArray(16);

    const resultCode = Core.#lib.IV_readSN(deviceSerialNumberPtr);

    return [resultCode, deviceSerialNumberPtr.buffer.readCString()];
  }

  static IV_connect(connectionStatus: number): IviumResult {
    const connectionStatusPtr = new LongArray([connectionStatus]);

    const resultCode = Core.#lib.IV_connect(connectionStatusPtr);

    return [resultCode, connectionStatusPtr[0]];
  }

  static IV_setconnectionmode(connectionModeNumber: number): IviumResult {
    const connectionModeNumberPtr = new LongArray([connectionModeNumber]);

    const resultCode = Core.#lib.IV_setconnectionmode(connectionModeNumberPtr);

    return [resultCode, connectionModeNumberPtr[0]];
  }
}

export default Core;
