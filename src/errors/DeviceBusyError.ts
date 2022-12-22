export default class DeviceBusyError extends Error {
  constructor(
    message = 'The selected device is busy, connect/select another device or wait till it becomes available.'
  ) {
    super(message); // (1)
    this.name = 'DeviceBusyError'; // (2)
  }
}
