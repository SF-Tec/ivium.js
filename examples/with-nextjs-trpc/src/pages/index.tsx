import { trpc } from '../utils/trpc';
import { useEffect, useState } from 'react';
import Layout from 'components/Layout';

const { generalIviumFunctions, directModeFunctions } = trpc;

import styles from 'styles/Home.module.css';
import ToggleSwitch from 'components/ToggleSwitch';
import Spin from 'components/Spin';
import { TRPCClientErrorLike } from '@trpc/client';
import { AppRouter } from 'server/trpc/routers';
import scaleUnits from 'utils/scaleUnits';

type IviumsoftStatus = 'running' | 'not-running' | 'unknown';
type DeviceStatus = 'available' | 'not-available' | 'unknown';

export default function IndexPage() {
  const [iviumsoftStatus, setIviumsoftStatus] =
    useState<IviumsoftStatus>('unknown');

  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>('unknown');
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);
  const isIviumsoftRunning = iviumsoftStatus === 'running';

  const openDriverMutation = generalIviumFunctions.openDriver.useMutation();
  const closeDriverMutation = generalIviumFunctions.closeDriver.useMutation();

  const connectDeviceMutation =
    generalIviumFunctions.connectDevice.useMutation();
  const disconnectDeviceMutation =
    generalIviumFunctions.disconnectDevice.useMutation();

  const openDriver = () => {
    openDriverMutation.mutate(undefined, {
      onSuccess: () => {
        setIviumsoftStatus('running');
      },
      onError: () => {
        setIviumsoftStatus('not-running');
      },
    });
  };

  const closeDriver = () => {
    closeDriverMutation.mutate(undefined, {
      onSuccess: () => {
        setIviumsoftStatus('running');
      },
      onError: () => {
        setIviumsoftStatus('not-running');
      },
    });
  };

  useEffect(() => {
    // close driver when the web app is closed
    window.onbeforeunload = () => {
      closeDriver();
    };
    // Client-side-only code
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isMutationLoading =
    openDriverMutation.isLoading ||
    closeDriverMutation.isLoading ||
    connectDeviceMutation.isLoading ||
    disconnectDeviceMutation.isLoading;

  const handleIviumsoftMutationError = (
    error: TRPCClientErrorLike<AppRouter>
  ) => {
    if (
      error.data?.stack?.startsWith('NoDeviceDetectedError') ||
      error.data?.stack?.startsWith('DeviceNotConnectedToIviumsoftError')
    ) {
      setDeviceStatus('not-available');
      setIsDeviceConnected(false);
    } else if (error.data?.stack?.startsWith('NoIviumsoftRunningError')) {
      setDeviceStatus('unknown');
      setIviumsoftStatus('not-running');
      setIsDeviceConnected(false);
    } else {
      setDeviceStatus('unknown');
      setIviumsoftStatus('unknown');
      setIsDeviceConnected(false);
    }
  };

  const { data: potential, isSuccess: isGetPotentialSuccess } =
    directModeFunctions.getPotential.useQuery(undefined, {
      enabled: isIviumsoftRunning && !isMutationLoading && isDeviceConnected,
      refetchInterval: 2000,
      onError: handleIviumsoftMutationError,
    });

  function handleDeviceConnectionSwitchChange(checked: boolean) {
    const connectionMutation = checked
      ? connectDeviceMutation
      : disconnectDeviceMutation;

    connectionMutation.mutate(undefined, {
      onSuccess: () => {
        setIsDeviceConnected(checked);
        setDeviceStatus('available');
      },
      onError: handleIviumsoftMutationError,
    });
  }

  if (iviumsoftStatus === 'unknown' || iviumsoftStatus === 'not-running') {
    return (
      <Layout>
        <section className={styles['start-container']}>
          <button
            className={styles['demo-button']}
            onClick={() => {
              openDriver();
            }}
          >
            Connect App to IviumSoft
          </button>
          {iviumsoftStatus === 'not-running' && (
            <h3>
              Iviumsoft is not running. Please launch the software and try
              connecting again.
            </h3>
          )}
        </section>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <section className={styles['switches-container']}>
          <div className={styles.switches}>
            <ToggleSwitch
              checked={isDeviceConnected}
              disabled={!isIviumsoftRunning || isMutationLoading}
              errorText={
                deviceStatus === 'not-available'
                  ? 'Device not found. Please, check your device is connected via usb and try again.'
                  : ''
              }
              label="Device Connection"
              onChange={handleDeviceConnectionSwitchChange}
            />
          </div>

          {isMutationLoading && (
            <section className={styles.spinner}>
              <Spin />
            </section>
          )}

          {isGetPotentialSuccess && (
            <label>Potential: {scaleUnits(potential, 'V')}</label>
          )}
        </section>
      </Layout>
    );
  }
}
