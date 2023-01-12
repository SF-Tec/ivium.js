/**
 * This is a Next.js page.
 */
import { trpc } from '../utils/trpc';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { Space, Switch } from 'antd';

const { generalIviumFunctions, directModeFunctions } = trpc;

const inter = Inter({ subsets: ['latin'] });

export default function IndexPage() {
  const [isDriverOpen, setIsDriverOpen] = useState(false);
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);
  // 💡 Tip: CMD+Click (or CTRL+Click) on `greeting` to go to the server definition
  const openDriverMutation = generalIviumFunctions.openDriver.useMutation();
  const closeDriverMutation = generalIviumFunctions.closeDriver.useMutation();
  // const {mutate: selectIviumsoftInstance} = generalIviumFunctions.selectIviumsoftInstance.useMutation();
  const connectDeviceMutation =
    generalIviumFunctions.connectDevice.useMutation();
  const disconnectDeviceMutation =
    generalIviumFunctions.disconnectDevice.useMutation();

  const isMutationLoading =
    openDriverMutation.isLoading ||
    closeDriverMutation.isLoading ||
    connectDeviceMutation.isLoading ||
    disconnectDeviceMutation.isLoading;

  const { isLoading: isIviumsoftCheckLoading, data: isIviumsoftRunning } =
    generalIviumFunctions.isIviumsoftRunning.useQuery(undefined, {
      enabled: isDriverOpen && !isMutationLoading,
      refetchInterval: 500,
    });

  const { data: potential, isSuccess: isGetPotentialSuccess } =
    directModeFunctions.getPotential.useQuery(undefined, {
      enabled: isDriverOpen && !isMutationLoading && isDeviceConnected,
      refetchInterval: 2000,
    });

  const areConnectionsButtonsDisabled =
    !isDriverOpen ||
    isMutationLoading ||
    isIviumsoftCheckLoading ||
    !isIviumsoftRunning;

  const hasMutationError =
    openDriverMutation.error ||
    closeDriverMutation.error ||
    connectDeviceMutation.error ||
    disconnectDeviceMutation.error;

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>pages/index.tsx</code>
        </p>
      </div>
      <Space direction="vertical">
        <Switch
          disabled={isMutationLoading || isDeviceConnected}
          checkedChildren="Close Driver"
          unCheckedChildren="Open Driver"
          checked={isDriverOpen}
          onChange={(checked) => {
            openDriverMutation.mutate(undefined, {
              onSuccess: () => {
                setIsDriverOpen(checked);
              },
            });
          }}
        />
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
      </Space>
      {!hasMutationError && isGetPotentialSuccess && (
        <div>
          <h1>Potential</h1>
          <h2>{potential}</h2>
        </div>
      )}
      {hasMutationError && (
        <div>
          <h1>Errors</h1>
          <h2>{openDriverMutation.error?.message}</h2>
          <h2>{connectDeviceMutation.error?.message}</h2>
          <h2>{disconnectDeviceMutation.error?.message}</h2>
          <h2>{closeDriverMutation.error?.message}</h2>
        </div>
      )}
      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Docs <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Find in-depth information about Next.js features and&nbsp;API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Learn <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Templates <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Discover and deploy boilerplate example Next.js&nbsp;projects.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Deploy <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Instantly deploy your Next.js site to a shareable URL
            with&nbsp;Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
