import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { DashboardLayout, siteTitle } from '../../components/DashboardLayout';
import styles from '../../styles/Dashboard.module.css';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
function Dashboard() {
  const router = useRouter();
  const { isLoggedIn } = useContext(AuthContext);

  return (
      <section>
      <h1>Dashboard</h1>
      <div>
        <h1>Wallets</h1>
        <p>Total balance $0.00 USD</p>
      </div>
      <div>
        <div>
          <p>0 BTC</p>
          <p>$0.00 USD</p>
        </div>
      </div>
      <aside>
        <h2>Recent Transactions</h2>
      </aside>
      </section>

  );
}

Dashboard.layout = DashboardLayout;

export default Dashboard;