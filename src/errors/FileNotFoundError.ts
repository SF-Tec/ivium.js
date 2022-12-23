export default class FileNotFoundError extends Error {
  constructor(message = 'File not found.') {
    super(message); // (1)
    this.name = 'FileNotFoundError'; // (2)
  }
}
