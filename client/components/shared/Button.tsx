import styles from '../../styles/Button.module.css'

interface Props {
    children: React.ReactNode;
    onClick: () => void,
    disabled: boolean,
    className?: string
}

export const Button = ({ children, onClick, disabled, className }: Props) => {
   return <button disabled={disabled} onClick={onClick} className={`${styles.btn} ${styles.btn_primary} ${className ? styles[className] : ''}`}>{children}</button>
}