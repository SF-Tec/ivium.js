export default class NoDeviceDetectedError extends Error {
  constructor(
    message = 'Please, check your device is properly connected to the usb port.'
  ) {
    super(message); // (1)
    this.name = 'NoDeviceDetectedError'; // (2)
  }
}
