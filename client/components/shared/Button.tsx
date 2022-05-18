import styles from '../../styles/Button.module.css'

interface Props {
    children: React.ReactNode;
}

export const Button = ({ children }: Props) => {
   return <button className={`${styles.btn} ${styles.btn_primary}`}>{children}</button>
}