import Core from './core';
import FileNotFoundError from './errors/FileNotFoundError';
import IviumVerifiers from './iviumVerifiers';

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
      IviumVerifiers.verifiyIviumsoftIsRunning();
    } catch (error) {
      Core.IV_close();
      throw error;
    }
  }

  /**
   * Close the iviumsoft driver.
   */
  static closeDriver() {
    IviumVerifiers.verifiyDriverIsOpen();

    Core.IV_close();
  }

  // ###########################
  // ## DIRECT MODE FUNCTIONS ##
  // ###########################

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
    IviumVerifiers.verifiyDriverIsOpen();
    IviumVerifiers.verifiyIviumsoftIsRunning();

    const [resultCode] = Core.IV_readmethod(methodFilePath);

    if (resultCode === 1) {
      throw new FileNotFoundError();
    }
  }
}

export default Ivium;
