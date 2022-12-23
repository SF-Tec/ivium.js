import Core from './core';
import IviumVerifiers from './iviumVerifiers';

/**
 * Wrapper class for the Ivium library.
 * It uses the methods defined in the Core class.
 * All the methods are static.
 */
class Ivium {
  // #######################
  // ## GENERIC FUNCTIONS ##
  // #######################

  static openDriver() {
    if (Core.isDriverOpen()) {
      Core.IV_close();
    }

    try {
      IviumVerifiers.verifiyIviumsoftIsRunning();
    } catch (error) {
      Core.IV_close();
      throw error;
    }
  }
}

export default Ivium;
