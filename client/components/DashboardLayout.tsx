import React, { FC } from 'react';
import styles from './DashboardLayout.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { DashboardTopNav } from './DashboardNav';

const name = 'Taro';
export const siteTitle = 'Bitcoin/Lightning store front';

export type DashboardLayoutProps = { children: any };

export const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <main>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Shop and pay with Lightning and Bitcoin"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <section className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebar_menu}>
            <Link href="/dashboard/overview/">
              <a className={styles.sidebar_menu_item}>Overview</a>
            </Link>
            <Link href="/dashboard/products">
              <a className={styles.sidebar_menu_item}>Products</a>
            </Link>
            <Link href="/dashboard/orders">
              <a className={styles.sidebar_menu_item}>Orders</a>
            </Link>
          </div>
        </aside>

        <aside className={styles.dashboard}>
          <DashboardTopNav />
          <div className={styles.content}>{children}</div>
        </aside>
      </section>
    </main>
  );
};
