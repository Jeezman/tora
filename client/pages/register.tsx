import React, { useContext, useEffect, useState } from 'react';
import { LightningIcon } from '../assets/icons';
import styles from '../styles/Register.module.css';
import { AuthContext } from './context/AuthContext';

export default function Register() {
  const { isLoggedIn, isLoading, handleRegister } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister({ email, password, firstName, lastName, phone, country });
    console.log('submitting');
  };

  return (
    <section className={styles.container}>
      <aside className={styles.content}>
        <h3 className={styles.copy}>
          Please complete registration by filling the details below
        </h3>

        <form onSubmit={handleSubmit}>
          <label className={styles.input_label} htmlFor="emailInput">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="emailInput"
            aria-label="email"
            className={styles.input}
            type="text"
            placeholder=""
          />
          <label className={styles.input_label} htmlFor="passwordInput">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="passwordInput"
            aria-label="password"
            className={styles.input}
            type="password"
            placeholder=""
          />
          <label className={styles.input_label} htmlFor="firstNameInput">
            First name
          </label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            id="firstNameInput"
            aria-label="text"
            className={styles.input}
            type="text"
            placeholder=""
          />
          <label className={styles.input_label} htmlFor="lastNameInput">
            Last name
          </label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            id="lastNameInput"
            aria-label="text"
            className={styles.input}
            type="text"
            placeholder=""
          />
          <label className={styles.input_label} htmlFor="phoneNumber">
            Phone number
          </label>
          <input
            id="phoneNumber"
            onChange={(e) => setPhone(e.target.value)}
            aria-label="text"
            className={styles.input}
            type="text"
            placeholder=""
          />
          <label className={styles.input_label} htmlFor="country">
            Country
          </label>
          <input
            onChange={(e) => setCountry(e.target.value)}
            id="country"
            aria-label="text"
            className={styles.input}
            type="text"
            placeholder=""
          />
          <button
            disabled={isLoading}
            id="email"
            className={`${styles.btn} ${styles.btn_primary}`}
          >
            Submit
          </button>
        </form>
      </aside>
    </section>
  );
}
