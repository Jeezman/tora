import React, { useContext, useState } from 'react';
import { LightningIcon } from '../assets/icons';
import styles from '../styles/Login.module.css';
import { AuthContext } from './context/AuthContext';
import Link from 'next/link';

export default function Login() {
  const { isLoading, handleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleLogin({email, password})
    e.preventDefault();
    console.log('submitting');
  };


  return (
    <section className={styles.container}>
      <aside className={styles.content}>
        <h3 className={styles.copy}>
          Login to view your dashboard 👍🏾
        </h3>
        <button className={`${styles.btn} ${styles.btn_primary}`}>
          <LightningIcon fill="#fff" className={styles.ln_icon} /> Login via
          Lightning
        </button>
        <p>or</p>
        <form onSubmit={handleSubmit}>
          <label className={styles.input_label} htmlFor="emailInput">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="emailInput"
            className={styles.input}
            type="email"
            placeholder="email@example.com"
          />
          <label className={styles.input_label} htmlFor="pwdInput">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="pwdInput"
            aria-label="pwd"
            className={styles.input}
            type="password"
          />
          <button
            disabled={isLoading}
            id="submit"
            className={`${styles.btn} ${styles.btn_primary}`}
          >
           {isLoading ? 'Loading...' : 'Login via Email'} 
          </button>
        </form>
        <div className={styles.side_link}>
          New to Tora? <Link href="/register">
          <a>Create an account</a>
        </Link>
        </div>
      </aside>
    </section>
  );
}
