import Core from './core';
import FileNotFoundError from './errors/FileNotFoundError';
import IviumVerifiers from './iviumVerifiers';
import {
  IviumsoftNotRunningError,
  DeviceNotConnectedToIviumsoftError,
} from './errors';
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

  /**
   * @returns A boolean value indicating whether IviumSoft is running.
   */
  static isIviumsoftRunning(): Boolean {
    IviumVerifiers.verifyDriverIsOpen();

    return Core.IV_getdevicestatus() !== -1;
  }

  /**
   * @returns A list of active(open) IviumSoft instances.
   */
  static getActiveIviumsoftInstances(): number[] {
    IviumVerifiers.verifyDriverIsOpen();
    const activeInstances = [];
    let firstActiveInstanceNumber = 0;
    for (let instanceNumber = 1; instanceNumber < 32; instanceNumber++) {
      Core.IV_selectdevice(instanceNumber);
      if (Core.IV_getdevicestatus() !== -1) {
        activeInstances.push(instanceNumber);
        if (firstActiveInstanceNumber === 0) {
          firstActiveInstanceNumber = instanceNumber;
        }
      }
    }
    if (firstActiveInstanceNumber === 0) {
      firstActiveInstanceNumber = 1;
    }
    Core.IV_selectdevice(firstActiveInstanceNumber);

    return activeInstances;
  }

  /**
   * It allows to select one instance of the currently running IviumSoft instances
   *  @param {number} iviumsoftInstanceNumber The instance number to select.
   */
  static selectIviumsoftInstance(iviumsoftInstanceNumber: number): void {
    IviumVerifiers.verifyDriverIsOpen();
    const activeInstances = Ivium.getActiveIviumsoftInstances();
    if (!activeInstances.includes(iviumsoftInstanceNumber)) {
      const errorMsg = `No IviumSoft on instance number ${iviumsoftInstanceNumber}, actual active instances list = ${activeInstances}`;
      throw new IviumsoftNotRunningError(errorMsg);
    }
    Core.IV_selectdevice(iviumsoftInstanceNumber);
  }

  /**
   * @returns The serial number of the currently selected device if available.
   */
  static getDeviceSerialNumber(): string {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToComputer();
    const [, serialNumber] = Core.IV_readSN();
    if (serialNumber === '') {
      throw new DeviceNotConnectedToIviumsoftError(
        'This device needs to be connected to get its serial number'
      );
    }

    return serialNumber;
  }

  /**
   * It connects the currently selected device.
   */
  static connectDevice(): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToComputer();
    Core.IV_connect(1);
  }

  /**
   * It disconnects the currently selected device.
   */
  static disconnectDevice(): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToComputer();
    Core.IV_connect(0);
  }

  /**
   * @returns The version of the IviumSoft dll.
   */
  static getDllVersion(): number {
    IviumVerifiers.verifyDriverIsOpen();
    return Core.IV_VersionDll();
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
