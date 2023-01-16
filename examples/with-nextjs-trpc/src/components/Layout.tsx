import { PropsWithChildren } from 'react';
import { Inter } from '@next/font/google';

import styles from './Layout.module.css';

const inter = Inter({ subsets: ['latin'] });

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>pages/index.tsx</code>
        </p>
      </div>
      {children}
      <div className={styles.grid}>
        <a
          href="https://github.com/SF-Tec/ivium.js"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Docs <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Find in-depth information about Ivium.js features and&nbsp;API.
          </p>
        </a>

        <a
          href="mailto:info@sftec.es"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Get Help <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Reach us at SF Tech! We&apos;ll be happy to help you with your
            tailormade electrochemical workflow.
          </p>
        </a>

        <a
          href="https://github.com/SF-Tec/ivium.js"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Ivium.js <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Tiny NodeJS wrapper around the &quot;Software development driver
            DLL&quot; for IviumSoft.
          </p>
        </a>

        <a
          href="https://github.com/SF-Tec/pyvium"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Pyvium <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Tiny Python wrapper around the &quot;Software development driver
            DLL&quot; for IviumSoft.
          </p>
        </a>
      </div>
    </main>
  );
};

export default Layout;
