import Core from './core';
import FileNotFoundError from './errors/FileNotFoundError';
import IviumVerifiers from './iviumVerifiers';
import {
  IviumsoftNotRunningError,
  DeviceNotConnectedToIviumsoftError,
} from './errors';
import statusLabels from './utils/statusLabels';
import type { IviumResult } from './types/IviumResult';
import { DeviceStatusCode } from './types/DeviceStatusCode';

const CELL_STATUS_LABELS = [
  'I_ovl',
  '',
  'Anin1_ovl',
  'E_ovl',
  '',
  'CellOff_button pressed',
  'Cell on',
];

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
  static isIviumsoftRunning(): boolean {
    return Core.IV_getdevicestatus() !== DeviceStatusCode.noIviumsoft;
  }

  /**
   * @returns A list of active(open) IviumSoft instances.
   */
  static getActiveIviumsoftInstances(): number[] {
    IviumVerifiers.verifyDriverIsOpen();
    const MAX_INSTANCE_NUMBER = 32;
    const activeInstances = [];
    let firstActiveInstanceNumber = 0;

    for (
      let instanceNumber = 1;
      instanceNumber < MAX_INSTANCE_NUMBER;
      instanceNumber++
    ) {
      Core.IV_selectdevice(instanceNumber);

      if (Ivium.isIviumsoftRunning()) {
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

  /**
   * @returns The version of the IviumSoft that match with this iviumjs version.
   */
  static getIviumsoftVersion(): string {
    IviumVerifiers.verifyDriverIsOpen();
    const versionStr = Core.IV_VersionDllFile().toString();

    return `${versionStr.slice(0, 1)}.${versionStr.slice(1, 5)}`;
  }

  /**
   * Sending the number value communicates with Multichannel control:
   *  if not yet active, the [number] of tabs is automatically opened and the [number] tab becomes active.
   *  if Ivium-n-Soft is active already, the [number] tab becomes active.
   *  Now the channel/instrument that is connected to this tab can be controlled.
   *  If no instrument is connected, the next available instrument in the list can be connected (IV_connect) and controlled.
   * @param {number} channelNumber to target
   */
  static selectChannel(channelNumber: number): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    Core.IV_SelectChannel(channelNumber);
  }

  // ###########################
  // ## DIRECT MODE FUNCTIONS ##
  // ###########################

  /**
   * @returns The cell status labels:
   *  ["I_ovl", "Anin1_ovl","E_ovl", "CellOff_button pressed", "Cell on"].
   */
  static getCellStatus(): string[] {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();

    const [, cellStatusBits] = Core.IV_getcellstatus();
    const cellStatusLabels = [];

    let counter = 2;

    for (const label of CELL_STATUS_LABELS) {
      if (cellStatusBits & (1 << counter) && label) {
        cellStatusLabels.push(label);
      }

      counter++;
    }

    if (cellStatusLabels.length === 0) {
      cellStatusLabels.push('Cell off');
    }

    return cellStatusLabels;
  }

  /**
   * Select the connection mode for the currently connected device.
   * The available modes depend on the connected device.
   * The list can include: 0=off, 1=EStat4EL(default), 2=EStat2EL,
   * 3=EstatDummy1,4=EStatDummy2,5=EstatDummy3,6=EstatDummy4
   * 7=Istat4EL, 8=Istat2EL, 9=IstatDummy, 10=BiStat4EL, 11=BiStat2EL.
   * @param connectionMode the number corresponding with available list.
   */
  static setConnectionMode(connectionMode: number): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();

    Core.IV_setconnectionmode(connectionMode);
  }

  /**
   * Set cell on.
   */
  static setCellOn(): void {
    if (Ivium.getCellStatus().includes('Cell off')) {
      Core.IV_setcellon(1);
    }
  }

  /**
   * Set cell off.
   */
  static setCellOff(): void {
    if (Ivium.getCellStatus().includes('Cell on')) {
      Core.IV_setcellon(0);
    }
  }

  /**
   * Set cell potential.
   * @param potential the value of potential (in Volts) to set.
   */
  static setPotential(potential: number): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();

    Core.IV_setpotential(potential);
  }

  /**
   * Set BiStat (WE2) offset potential potential.
   * @param we2Potential the value of potential, in Volts (V), to set.
   */
  static setWe2Potential(we2Potential: number): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();

    Core.IV_setpotentialWE2(we2Potential);
  }

  /**
   * Set cell current (galvanostatic mode).
   * @param current the value of current intensity, in Amperes (A), to be set.
   */
  static setCurrent(current: number): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();

    Core.IV_setcurrent(current);
  }

  /**
   * @returns The measured potential.
   */
  static getPotential(): number {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();

    const [, potentialValue] = Core.IV_getpotential();
    return potentialValue;
  }

  /**
   * Set current range: 0=10A, 1=1A, etc...
   * @param currentRange The current range from the available current ranges list.
   */
  static setCurrentRange(currentRange: number): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();

    Core.IV_setcurrentrange(currentRange);
  }

  /**
   * Set current range for BiStat (WE2): 0=10mA, 1=1mA, etc...
   * @param currentRange The number of current range from the available current ranges list.
   */
  static setWe2CurrentRange(currentRange: number): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();

    Core.IV_setcurrentrangeWE2(currentRange);
  }

  /**
   * @returns The measured(applied) current.
   */
  static getCurrent(): number {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();

    const [, currentValue] = Core.IV_getcurrent();
    return currentValue;
  }

  /**
   * @returns The measured current from WE2 (bipotentiostat).
   */
  static getWe2Current(): number {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();

    const [, currentValue] = Core.IV_getcurrentWE2();
    return currentValue;
  }

  /**
   * Set filter: 0=1MHz, 1=100kHz, 2=10kHz, 3=1kHz, 4=10Hz
   * @param filter The number of filter from the available filter list.
   */
  static setFilter(filter: 0 | 1 | 2 | 3 | 4): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();

    Core.IV_setfilter(filter);
  }

  /**
   * Set stability: 0=HighSpeed, 1=Standard, 2=HighStability
   * @param stability The number value from the available filter list.
   */
  static setStability(stability: 0 | 1 | 2): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();

    Core.IV_setstability(stability);
  }

  /**
   * Select mode for BiStat, for number 0=standard, 1=scanning.
   * This bistat_mode function also can be used to control the Automatic E-ranging function of the instrument;
   * 0=AutoEranging off; 1=AutoEranging on.
   * @param bistatMode The number value 0=standard or 1=scanning.
   */
  static setBistatMode(bistatMode: 0 | 1): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();

    Core.IV_setbistatmode(bistatMode);
  }

  /**
   * Set dac on external port: channelNumber=0 for dac1 and channelNumber=1 for dac2.
   * @param channel The dac channel number.
   * @param dac The dac value to set.
   */
  static setDac(channel: 0 | 1, dac: number): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();

    Core.IV_setdac(channel, dac);
  }

  /**
   * Returns measured voltage on external ADC port, int=channelnr. 0-7
   * @param channel The dac channel number.
   */
  static getAdc(channel: number): number {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();

    const [, measuredVoltage] = Core.IV_getadc(channel);

    return measuredVoltage;
  }

  /**
   * Set channel of multiplexer, int=channelnr. starting from 0(default).
   * @param channel The number multiplexer channel.
   */
  static setMuxChannel(channel = 0): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();

    Core.IV_setmuxchannel(channel);
  }

  /**
   * @returns A sequence of measured currents at defined sampling rate
   * @param pointsQuantity The number of points <= 256.
   * @param intervalRate The interval rate (10us to 20ms).
   */
  static getCurrentTrace(pointsQuantity: number, intervalRate: number): number {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();

    const [, current] = Core.IV_getcurrenttrace(pointsQuantity, intervalRate);

    return current;
  }

  /**
   * @returns A sequence of measured  WE2 currents at defined sampling rate
   * @param pointsQuantity The number of points <= 256.
   * @param intervalRate The interval rate (10us to 20ms).
   */
  static getCurrentWe2Trace(
    pointsQuantity: number,
    intervalRate: number
  ): number {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();

    const [, current] = Core.IV_getcurrentWE2trace(
      pointsQuantity,
      intervalRate
    );

    return current;
  }

  /**
   * @returns A sequence of measured potentials at defined samplingrate
   * @param pointsQuantity The number of points <= 256.
   * @param intervalRate The interval rate (10us to 20ms).
   */
  static getPotentialTrace(
    pointsQuantity: number,
    intervalRate: number
  ): number {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();
    const [, potential] = Core.IV_getpotentialtrace(
      pointsQuantity,
      intervalRate
    );

    return potential;
  }

  /**
   * Set the value of the ac amplitude in Volts.
   * @param acAmplitude The AC amplitude in Hz.
   */
  static setAcAmplitude(acAmplitude: number): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    Core.IV_setamplitude(acAmplitude);
  }

  /**
   * Set the value of the ac frequency in Hz.
   * @param acFrequency The AC frequency in Hz.
   */
  static setAcFrequency(acFrequency: number): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    Core.IV_setfrequency(acFrequency);
  }

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

  /**
   * Saves currently loaded method procedure to a file..
   * @param methodFilePath The the full path to the new file.
   */
  static saveMethod(methodFilePath: string): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    Core.IV_savemethod(methodFilePath);
  }

  /**
   * Starts a method procedure.
   * If methodFilePath is an empty string then the presently loaded procedure is started.
   * If the full path to a previously saved method is provided
   * then the procedure is loaded from the file and started
   * @param {string} [methodFilePath=''] - The path to the method file. If not specified, the current method will be used.
   */
  static startMethod(methodFilePath = ''): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();
    IviumVerifiers.verifyDeviceIsAvailable();

    const [resultCode] = Core.IV_startmethod(methodFilePath);

    if (resultCode === 1) {
      throw new FileNotFoundError();
    }
  }

  /**
   * Aborts the ongoing method procedure
   */
  static abortMethod(): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    IviumVerifiers.verifyDeviceIsConnectedToIviumsoft();
    Core.IV_abort();
  }

  /**
   * Saves the results of the last method execution into a file.
   * @param {string} dataFilePath - The full path to the new file.
   * IMPORTANT: If the path provided is not valid,
   * it will close the selected iviumsoft instance.
   */

  static saveData(dataFilePath: string): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    Core.IV_savedata(dataFilePath);
  }

  /**
   * Allows updating the parameter values for the currently loaded method procedrue.
   * It only works for text based parameters and dropdowns (multiple option selectors).
   * @param {string} parameterName - The name of the parameter to set.
   * @param {string} parameterValue - The value to set the parameter to.
   */

  static setMethodParameter(
    parameterName: string,
    parameterValue: string
  ): void {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    Core.IV_setmethodparameter(parameterName, parameterValue);
  }

  /**
   * Returns actual available number of datapoints: indicates the progress during a run.
   * @returns {number} The number of available data points.
   */
  static getAvailableDataPointsNumber(): number {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    const [, dataPoints] = Core.IV_Ndatapoints();

    return dataPoints;
  }

  /**
   * Returns the data from a datapoint with index int, returns 3 values that depend on
   * the used technique. For example LSV/CV methods return (E/I/0) Transient methods
   * return (time/I,E/0), Impedance methods return (Z1,Z2,freq) etc.
   * @param {number} dataPointIndex - The index of the data point to retrieve data for.
   * @returns {number[]} The data for the specified data point (an array of three numbers).
   */
  static getDataPoint(dataPointIndex: number): number[] {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();

    const [, values] = Core.IV_getdata(dataPointIndex);

    return values;
  }

  /**
   * Same as get_data_point, but with the additional scan_index parameter.
   * This function will allow reading data from non-selected (previous) scans.
   * @param {number} dataPointIndex - The index of the data point to retrieve data from.
   * @param {number} scanIndex - The index of the scan to retrieve data from.
   * @returns {number[]} - An array of measured values.
   */
  static getDataPointFromScan(
    dataPointIndex: number,
    scanIndex: number
  ): number[] {
    IviumVerifiers.verifyDriverIsOpen();
    IviumVerifiers.verifyIviumsoftIsRunning();
    const [, values] = Core.IV_getdatafromline(dataPointIndex, scanIndex);

    return values;
  }
}

export default Ivium;
