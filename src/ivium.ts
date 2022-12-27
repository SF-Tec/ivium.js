import Core from './core';
import FileNotFoundError from './errors/FileNotFoundError';
import IviumVerifiers from './iviumVerifiers';
import statusLabels from './utils/statusLabels';
import type { IviumResult } from './types/IviumResult';

/**
 * Wrapper class for the Ivium library.
 * It uses the methods defined in the Core class.
 * All its methods are static.
 */
class Ivium {
  // #######################
  // ## GENERIC FUNCTIONS ##
  // #######################

  /**
   * Open the driver to manipulate the Ivium software.
   */
  static openDriver() {
    if (Core.isDriverOpen()) {
      Core.IV_close();
    }

    Core.IV_open();

    try {
      IviumVerifiers.verifyIviumsoftIsRunning();
    } catch (error) {
      Core.IV_close();
      throw error;
    }
  }

  /**
   * Close the iviumsoft driver.
   */
  static closeDriver() {
    IviumVerifiers.verifyDriverIsOpen();

    Core.IV_close();
  }

  /**
   * @returns the maximum number of devices that can be managed by IviumSoft.
   */
  static getMaxDeviceNumber() {
    IviumVerifiers.verifyDriverIsOpen();

    return Core.IV_MaxDevices();
  }

  /**
   * Informs about the status of IviumSoft and the connected device.
   * It use the global statusLabes array including all the possible resulting status.
   * @returns -1 (no IviumSoft), 0 (not connected), 1 (available_idle), 2 (available_busy),
   * 3 (no device available).
   */
  static getDeviceStatus(): IviumResult<string> {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    const resultCode = Core.IV_getdevicestatus();

    return [resultCode, statusLabels[resultCode + 1]];
  }

  // ###########################
  // ## DIRECT MODE FUNCTIONS ##
  // ###########################

  // ###########################
  // ## WE32 MODE FUNCTIONS ##
  // ###########################

  // ###########################
  // ## METHOD MODE FUNCTIONS ##
  // ###########################

  /**
   * Loads method procedure previously saved to a file.
   * @param methodFilePath The path to the file where the method is stored.
   */
  static loadMethod(methodFilePath: string) {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();

    const [resultCode] = Core.IV_readmethod(methodFilePath);

    if (resultCode === 1) {
      throw new FileNotFoundError();
    }
  }
}

export default Ivium;
