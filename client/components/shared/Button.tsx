import styles from '../../styles/Button.module.css'

interface Props {
    children: React.ReactNode;
    onClick: () => void
}

export const Button = ({ children, onClick }: Props) => {
   return <button onClick={onClick} className={`${styles.btn} ${styles.btn_primary}`}>{children}</button>
}