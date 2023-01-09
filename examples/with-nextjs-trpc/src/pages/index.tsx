/**
 * This is a Next.js page.
 */
import { trpc } from '../utils/trpc';

export default function IndexPage() {
  // 💡 Tip: CMD+Click (or CTRL+Click) on `greeting` to go to the server definition
  const { data: openDriverResult } = trpc.openDriver.useQuery();
  trpc.selectIviumsoftInstance.useQuery({ instanceNumber: 2 });
  const { data: connectDeviceResult } = trpc.connectDevice.useQuery();

  const { data: getPotentialResult } = trpc.getPotential.useQuery(undefined, {
    refetchInterval: 2000,
  });
  // trpc.closeDriver.useQuery();

  if (!openDriverResult?.success) {
    return (
      <div style={styles}>
        <h1>Failed to connect to device</h1>
      </div>
    );
  }

  if (!openDriverResult) {
    return (
      <div style={styles}>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div style={styles}>
      {/**
       * The type is defined and can be autocompleted
       * 💡 Tip: Hover over `data` to see the result type
       * 💡 Tip: CMD+Click (or CTRL+Click) on `text` to go to the server definition
       * 💡 Tip: Secondary click on `text` and "Rename Symbol" to rename it both on the client & server
       */}
      <h1>Potential: {openDriverResult?.result}</h1>
    </div>
  );
}

const styles = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
