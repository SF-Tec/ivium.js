export default class DriverNotOpenError extends Error {
  constructor(
    message = 'The driver is not open. Please, use Ivium.openDriver() to open it.'
  ) {
    super(message); // (1)
    this.name = 'DriverNotOpenError'; // (2)
  }
}
