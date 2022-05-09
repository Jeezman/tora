import { LightningIcon } from '../assets/icons';
import styles from '../styles/Login.module.css';

export default function FirstPost() {
  return (
    <section className={styles.container}>
          <aside className={styles.content}>
              <h3 className={styles.copy}>Login and we'll automatically create an account 👍🏾</h3>
        <button className={`${styles.btn} ${styles.btn_primary}`}>
          <LightningIcon fill="#fff" className={styles.ln_icon} /> Login via
          Lightning
        </button>
        <p>or</p>
        <form>
          <label className={styles.input_label} htmlFor="emailInput">Email</label>
          <input
            id="emailInput"
            aria-label="email"
            className={styles.input}
            type="email"
            placeholder="email@example.com"
          />
          <button id="email" className={`${styles.btn} ${styles.btn_primary}`}>
            Login via Email
          </button>
        </form>
      </aside>
    </section>
  );
}
