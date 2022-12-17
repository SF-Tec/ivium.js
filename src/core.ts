import { buildFfiLibrary, CharArray, LongArray } from './ffiLibrary';

/**
 * A tuple that represents the result of an Ivium function call. The first element is a number indicating the result code, and the second element is the actual result of the function.
 * @template T The type of the actual result of the function. Can be a string or a number (default is number).
 */
type IviumResult<T extends string | number> = [number, T];

/**
 * The core class that provides access to Ivium functionality.
 */
class Core {
  /**
   * A private static field that indicates whether the Ivium driver is open.
   */
  static #isDriverOpen = false;

  /**
   * A read-only private static field that holds the FFI library object.
   */
  static readonly #lib = buildFfiLibrary();

  // #######################
  // ## GENERIC FUNCTIONS ##
  // #######################

  /**
   * Opens the Ivium driver.
   *
   * @returns The result code of the operation.
   */
  static IV_open(): number {
    Core.#isDriverOpen = true;
    return Core.#lib.IV_open();
  }

  /**
   * Closes the Ivium driver.
   *
   * @returns The result code of the operation.
   */
  static IV_close(): number {
    Core.#isDriverOpen = false;
    return Core.#lib.IV_close();
  }

  /**
   * Determines whether the Ivium driver is open.
   *
   * @returns A boolean value indicating whether the driver is open.
   */
  static isDriverOpen(): boolean {
    return Core.#isDriverOpen;
  }

  /**
   * Gets the maximum number of devices supported by the Ivium library.
   *
   * @returns The maximum number of devices.
   */
  static IV_MaxDevices(): number {
    return Core.#lib.IV_MaxDevices();
  }

  /**
   * Selects a specific device based on its Ivium soft instance number.
   *
   * @param iviumsoftInstanceNumber - The Ivium soft instance number of the device to select.
   * @returns A tuple containing the result code of the operation and the Ivium soft instance number of the selected device.
   */
  static IV_selectdevice(iviumsoftInstanceNumber: number): IviumResult<number> {
    const instanceNumberArray = new LongArray([iviumsoftInstanceNumber]);

    const resultCode = Core.#lib.IV_selectdevice(instanceNumberArray);

    return [resultCode, instanceNumberArray[0]];
  }

  /**
   * Reads the serial number of the currently selected device.
   *
   * @returns A tuple containing the result code of the operation and the serial number of the device.
   */
  static IV_readSN(): IviumResult<string> {
    const deviceSerialNumberPtr = new CharArray(16);

    const resultCode = Core.#lib.IV_readSN(deviceSerialNumberPtr);

    return [resultCode, deviceSerialNumberPtr.buffer.readCString()];
  }

  /**
   * Connects to the Ivium device.
   * @param connectionStatus A number indicating the connection status.
   * @returns An IviumResult tuple containing the result code and the updated connection status.
   */
  static IV_connect(connectionStatus: number): IviumResult<number> {
    const connectionStatusArray = new LongArray([connectionStatus]);

    const resultCode = Core.#lib.IV_connect(connectionStatusArray);

    return [resultCode, connectionStatusArray[0]];
  }

  /**
   * Returns the version host.
   * @returns {number} An IviumResult tuple containing the result code and the version host.
   */
  static IV_VersionHost(versionHost: number): IviumResult<number> {
    const versionHostArray = new LongArray([versionHost]);

    const resultCode = Core.#lib.IV_VersionHost(versionHostArray);

    return [resultCode, versionHostArray[0]];
  }

  /**
   * Returns the version of the IviumSoft driver DLL.
   * @returns {number} The version of the IviumSoft driver DLL.
   */
  static IV_VersionDll(): number {
    return Core.#lib.IV_VersionDll();
  }

  /**
   * It returns 1 if the selected instance of IviumSoft is running.
   * @returns {number}.
   */
  static IV_VersionCheck(): number {
    return Core.#lib.IV_VersionCheck();
  }

  /**
   * Returns the handle of the host.
   * @returns {number} The handle of the host.
   */
  static IV_HostHandle(): number {
    return Core.#lib.IV_HostHandle();
  }

  /**
   * Returns the version of the DLL file.
   * @returns {number} The version of the DLL file.
   */
  static IV_VersionDllFile(): number {
    return Core.#lib.IV_VersionDllFile();
  }

  /**
   * Returns the version of the DLL file as a string.
   * @returns {number} The version of the DLL file as a string.
   */
  static IV_VersionDllFileStr(): number {
    return Core.#lib.IV_VersionDllFileStr();
  }

  /**
   * Sending the integer value communicates with Multichannel control:
            if not yet active, the [int] number of tabs is automatically opened and the [int] tab becomes active;
            if Ivium-n-Soft is active already, the [int] tab becomes active. 
            Now the channel/instrument that is connected to this tab can be controlled. 
            If no instrument is connected, the next available instrument in the list can be connected (IV_connect) and controlled.
   * @param {number} channelNumber The channel number to select.
   * @returns {number} The result of the operation.
   */
  static IV_SelectChannel(channelNumber: number): number {
    const channelNumberArray = new LongArray([channelNumber]);

    return Core.#lib.IV_VersionHost(channelNumberArray);
  }

  // ###########################
  // ## DIRECT MODE FUNCTIONS ##
  // ###########################

  /**
   * Sets the connection mode for the Ivium device.
   * @param connectionModeNumber - The connection mode number.
   * @returns An IviumResult containing the result code and the updated connection mode number.
   */
  static IV_setconnectionmode(
    connectionModeNumber: number
  ): IviumResult<number> {
    const connectionModeNumberPtr = new LongArray([connectionModeNumber]);

    const resultCode = Core.#lib.IV_setconnectionmode(connectionModeNumberPtr);

    return [resultCode, connectionModeNumberPtr[0]];
  }
}

export default Core;
