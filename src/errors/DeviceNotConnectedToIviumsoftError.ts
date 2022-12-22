export default class DeviceNotConnectedToIviumsoftError extends Error {
  constructor(
    message = 'IviumSoft has no connected device. Please, connect one.'
  ) {
    super(message); // (1)
    this.name = 'DeviceNotConnectedToIviumsoftError'; // (2)
  }
}
