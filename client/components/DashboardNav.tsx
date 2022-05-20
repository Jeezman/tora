import React, { FC } from 'react';
import styles from '../styles/DashboardTopNav.module.css';
import { getUserInitials } from '../util/getUserInitials';


export const DashboardTopNav: FC = () => {
    return <div className={styles.top_nav}>
        <div></div>
        <div>
            <div className={styles.avatar}>{getUserInitials("Satoshi Nakamoto")}</div>
        </div>
    </div>
}