import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Dashboard.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AuthContext } from '../pages/context/AuthContext';
import { DashboardLayout, siteTitle } from './DashboardLayout';

export default function Dashboard({ children }: any) {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <DashboardLayout>
        <Head>
        <title>{siteTitle}</title>
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
          <Link href="/dashboard/overview/">
            <a>Overview</a>
          </Link>
          <Link href="/dashboard/products">
            <a>Products</a>
          </Link>
          <Link href="/dashboard/orders">
            <a>Orders</a>
          </Link>
        </aside>
        <aside className={styles.content}>{children}</aside>
      </section>
    </DashboardLayout>
  );
}