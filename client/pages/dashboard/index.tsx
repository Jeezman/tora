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
        <h1>Dashboard Page</h1>
      </section>

  );
}

Dashboard.layout = DashboardLayout;

export default Dashboard;