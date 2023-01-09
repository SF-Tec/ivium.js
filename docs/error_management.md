```
import { Ivium, IviumErrors } from 'iviumjs';

const {DeviceNotConnectedToIviumsoftError, IviumsoftNotRunningError} = IviumErrors;

try {
  Ivium.openDriver();
  Ivium.getPotential();
} catch (error) {
    if(error instanceof IviumsoftNotRunningError) {
        console.log('Iviumsoft is not running');
    }

    if (error instanceof DeviceNotConnectedToIviumsoftError) {
        throw error;
    }
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
