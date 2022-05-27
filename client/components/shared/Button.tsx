import styles from '../../styles/Button.module.css'

interface Props {
    children: React.ReactNode;
    onClick: () => void,
    disabled: boolean
}

export const Button = ({ children, onClick, disabled }: Props) => {
   return <button disabled={disabled} onClick={onClick} className={`${styles.btn} ${styles.btn_primary}`}>{children}</button>
}