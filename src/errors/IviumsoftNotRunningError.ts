export default class IviumsoftNotRunningError extends Error {
  constructor(
    message = 'IviumSoft is not currently running. Please, start it.'
  ) {
    super(message); // (1)
    this.name = 'NoIviumsoftRunningError'; // (2)
  }
}
