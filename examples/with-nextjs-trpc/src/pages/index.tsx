/**
 * This is a Next.js page.
 */
import { trpc } from '../utils/trpc';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';

const { genericIviumFunctions } = trpc;

const inter = Inter({ subsets: ['latin'] });

export default function IndexPage() {
  // 💡 Tip: CMD+Click (or CTRL+Click) on `greeting` to go to the server definition
  const openDriverMutation = genericIviumFunctions.openDriver.useMutation();
  const closeDriverMutation = genericIviumFunctions.closeDriver.useMutation();
  // const {mutate: selectIviumsoftInstance} = genericIviumFunctions.selectIviumsoftInstance.useMutation();
  const connectDeviceMutation =
    genericIviumFunctions.connectDevice.useMutation();
  const disconnectDeviceMutation =
    genericIviumFunctions.disconnectDevice.useMutation();

  // const { data: getPotentialResult } = genericIviumFunctions.getPotential.useQuery(undefined, {
  //   refetchInterval: 2000,
  // });
  // genericIviumFunctions.closeDriver.useQuery();

  const isMutationLoading =
    openDriverMutation.isLoading ||
    closeDriverMutation.isLoading ||
    connectDeviceMutation.isLoading ||
    disconnectDeviceMutation.isLoading;

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>pages/index.tsx</code>
        </p>
      </div>
      <div>
        <button
          disabled={isMutationLoading}
          onClick={() => {
            openDriverMutation.mutate();
          }}
        >
          Open Driver
        </button>
        <button
          disabled={isMutationLoading}
          onClick={() => {
            connectDeviceMutation.mutate();
          }}
        >
          Connect Device
        </button>
        <button
          disabled={isMutationLoading}
          onClick={() => {
            disconnectDeviceMutation.mutate();
          }}
        >
          Disconnect Device
        </button>
        <button
          disabled={isMutationLoading}
          onClick={() => {
            if (closeDriverMutation.error) closeDriverMutation.mutate();
          }}
        >
          Close Driver
        </button>
      </div>
      <div>
        <h1>Errors</h1>
        <h2>{openDriverMutation.error?.message}</h2>
        <h2>{JSON.stringify(connectDeviceMutation.error)}</h2>
        <h2>{disconnectDeviceMutation.error?.message}</h2>
        <h2>{closeDriverMutation.error?.message}</h2>
      </div>
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
