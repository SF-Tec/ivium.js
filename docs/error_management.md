```
import { Ivium, IviumErrors } from 'iviumjs';

const { DeviceNotConnectedToIviumsoftError, IviumsoftNotRunningError } =
  IviumErrors;

try {
  Ivium.openDriver();
  Ivium.connectDevice();
  console.log(Ivium.getPotential());
} catch (error) {
  if (error instanceof IviumsoftNotRunningError) {
    console.log('Iviumsoft is not running');
  }

  if (error instanceof DeviceNotConnectedToIviumsoftError) {
    console.log('Device is not connected to Iviumsoft');
  }
} finally {
  Ivium.closeDriver();
}
```

| Available errors                   |
| ---------------------------------- |
| CellOffError                       |
| DeviceBusyError                    |
| DeviceNotConnectedToIviumsoftError |
| DriverNotOpenError                 |
| FileNotFoundError                  |
| IviumsoftNotRunningError           |
| NoDeviceDetectedError              |
