export default class CellOffError extends Error {
  constructor(message = 'The cell is off.') {
    super(message); // (1)
    this.name = 'CellOffError'; // (2)
  }
}
