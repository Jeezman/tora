import React, {FC, useContext} from 'react';
import styles from '../styles/DashboardTopNav.module.css';
import {getUserInitials} from '../util/getUserInitials';
import {removeData} from '../util/storage';
import { AuthContext } from '../pages/context/AuthContext';

export const DashboardTopNav: FC = () => {
    const { handleLogout } =
    useContext(AuthContext);
    
    const logout = async () => {
        await removeData('token');
        handleLogout();
    };
    
    return <div className={styles.top_nav}>
        <div className={styles.right}>
            <div>
                <div className={styles.avatar}>{getUserInitials("Satoshi Nakamoto")}</div>
            </div>
            <p onClick={logout}>Logout</p>
        </div>
    </div>
}