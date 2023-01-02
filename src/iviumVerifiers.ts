import Core from './core';
import {
  CellOffError,
  DeviceBusyError,
  DeviceNotConnectedToIviumsoftError,
  DriverNotOpenError,
  IviumsoftNotRunningError,
  NoDeviceDetectedError,
} from './errors';
import { DeviceStatusCode } from './types/DeviceStatusCode';

/**
 * @class
 * @classdesc Class that encapsulates methods to validated the current status of the IviumSoft environment.
 */
class IviumVerifiers {
  /**
   * @static
   * @method
   * @description Raise exception if the driver is not open.
   * @throws {DriverNotOpenError}
   * @memberof IviumVerifiers
   */
  static verifyDriverIsOpen() {
    if (!Core.isDriverOpen) {
      throw new DriverNotOpenError();
    }
  }

  /**
   * @static
   * @method
   * @description Raise exception if IviumSoft is not running.
   * @throws {IviumsoftNotRunningError}
   * @memberof IviumVerifiers
   */
  static verifyIviumsoftIsRunning() {
    const deviceStatus = Core.IV_getdevicestatus();

    if (deviceStatus === DeviceStatusCode.noIviumsoft) {
      throw new IviumsoftNotRunningError();
    }
  }

  /**
   * @static
   * @method
   * @description Raise exception if a device is not connected through the IviumSoft app.
   * @throws {DeviceNotConnectedToIviumsoftError}
   * @memberof IviumVerifiers
   */
  static verifyDeviceIsConnectedToIviumsoft() {
    const deviceStatus = Core.IV_getdevicestatus();

    if (
      deviceStatus < DeviceStatusCode.availableIdle ||
      deviceStatus === DeviceStatusCode.noDeviceAvailable
    ) {
      throw new DeviceNotConnectedToIviumsoftError();
    }
  }

  /**
   * @static
   * @method
   * @description Raise exception if no device is connected to your computer through usb.
   * @throws {NoDeviceDetectedError}
   * @memberof IviumVerifiers
   */
  static verifyDeviceIsConnectedToComputer() {
    const deviceStatus = Core.IV_getdevicestatus();

    if (deviceStatus === DeviceStatusCode.noDeviceAvailable) {
      throw new NoDeviceDetectedError();
    }
  }

  /**
   * @static
   * @method
   * @description Raise exception if no device is connected to your computer through usb.
   * @throws {DeviceBusyError}
   * @memberof IviumVerifiers
   */
  static verifyDeviceIsAvailable() {
    const deviceStatus = Core.IV_getdevicestatus();

    if (deviceStatus === DeviceStatusCode.availableBusy) {
      throw new DeviceBusyError();
    }
  }

  /**
   * @static
   * @method
   * @description Raise exception if cell is off.
   * @throws {CellOffError}
   * @memberof IviumVerifiers
   */
  static verfiyCellIsOn() {
    const [, cellStatus] = Core.IV_getcellstatus();

    if (!cellStatus) {
      throw new CellOffError();
    }
  }
}

export default IviumVerifiers;
