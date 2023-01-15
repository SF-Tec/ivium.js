import { trpc } from '../utils/trpc';
import { useState } from 'react';
import { Button, Space, Spin, Switch } from 'antd';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';

const { generalIviumFunctions, directModeFunctions } = trpc;

export default function IndexPage() {
  const [isDriverOpen, setIsDriverOpen] = useState(false);
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);
  const [isCellOn, setIsCellOn] = useState(false);

  const router = useRouter();

  const openDriverMutation = generalIviumFunctions.openDriver.useMutation();
  const closeDriverMutation = generalIviumFunctions.closeDriver.useMutation();

  const connectDeviceMutation =
    generalIviumFunctions.connectDevice.useMutation();
  const disconnectDeviceMutation =
    generalIviumFunctions.disconnectDevice.useMutation();
  const setCellOnMutation = directModeFunctions.setCellOn.useMutation();
  const setCellOffMutation = directModeFunctions.setCellOff.useMutation();

  const openDriver = () => {
    openDriverMutation.mutate(undefined, {
      onSuccess: () => {
        setIsDriverOpen(true);
      },
    });
  };

  const closeDriver = () => {
    closeDriverMutation.mutate(undefined, {
      onSuccess: () => {
        setIsDriverOpen(false);
      },
    });
  };

  const isMutationLoading =
    openDriverMutation.isLoading ||
    closeDriverMutation.isLoading ||
    connectDeviceMutation.isLoading ||
    disconnectDeviceMutation.isLoading ||
    setCellOnMutation.isLoading ||
    setCellOffMutation.isLoading;

  const { data: isIviumsoftRunning, isLoading: isIviumsoftRunningLoading } =
    generalIviumFunctions.isIviumsoftRunning.useQuery(undefined, {
      enabled: isDriverOpen && !isMutationLoading,
      refetchInterval: 1000,
    });

  const { data: potential, isSuccess: isGetPotentialSuccess } =
    directModeFunctions.getPotential.useQuery(undefined, {
      enabled:
        isDriverOpen &&
        !isMutationLoading &&
        isDeviceConnected &&
        isIviumsoftRunning,
      refetchInterval: 2000,
    });

  const hasMutationError =
    openDriverMutation.error ||
    closeDriverMutation.error ||
    connectDeviceMutation.error ||
    disconnectDeviceMutation.error ||
    setCellOnMutation.error ||
    setCellOffMutation.error;

  if (isMutationLoading)
    return (
      <Layout>
        <Spin />
      </Layout>
    );

  if (isDriverOpen && !isIviumsoftRunningLoading && !isIviumsoftRunning) {
    closeDriver();

    router.reload();
  }

  if (isDriverOpen && isIviumsoftRunning)
    return (
      <Layout>
        <Space direction="vertical">
          <Switch
            disabled={isMutationLoading || !isDriverOpen || !isIviumsoftRunning}
            checkedChildren="Disconnect Device"
            unCheckedChildren="Connect Device"
            checked={isDeviceConnected}
            onChange={(checked) => {
              const connectionMutation = checked
                ? connectDeviceMutation
                : disconnectDeviceMutation;

              connectionMutation.mutate(undefined, {
                onSuccess: () => {
                  setIsDeviceConnected(checked);
                },
              });
            }}
          />
          <Switch
            disabled={
              isMutationLoading || !isDeviceConnected || !isIviumsoftRunning
            }
            checkedChildren="Set Cell Off"
            unCheckedChildren="Set Cell On"
            checked={isCellOn}
            onChange={(checked) => {
              const cellMutation = checked
                ? setCellOnMutation
                : setCellOffMutation;

              cellMutation.mutate(undefined, {
                onSuccess: () => {
                  setIsCellOn(checked);
                },
              });
            }}
          />
        </Space>
        {!hasMutationError && isGetPotentialSuccess && (
          <div>
            <h1>Potential</h1>
            <h2>{potential}</h2>
          </div>
        )}
      </Layout>
    );

  return (
    <Layout>
      <Space direction="vertical">
        <Button
          onClick={() => {
            openDriver();
          }}
        >
          Connect App to IviumSoft
        </Button>
        {openDriverMutation.error && (
          <h2>
            Iviumsoft is not running. Please launch the software and try
            connecting again.
          </h2>
        )}
      </Space>
    </Layout>
  );
}
