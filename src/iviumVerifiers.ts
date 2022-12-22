import Core from './core';
import {
  CellOffError,
  DeviceBusyError,
  DeviceNotConnectedToIviumsoftError,
  DriverNotOpenError,
  IviumsoftNotRunningError,
  NoDeviceDetectedError,
} from './errors';

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
  static verifiyDriverIsOpen() {
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
  static verifiyIviumsoftIsRunning() {
    const deviceStatus = Core.IV_getdevicestatus();

    if (deviceStatus === -1) {
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

    if (deviceStatus < 1 || deviceStatus === 3) {
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

    if (deviceStatus === 3) {
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

    if (deviceStatus === 2) {
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
