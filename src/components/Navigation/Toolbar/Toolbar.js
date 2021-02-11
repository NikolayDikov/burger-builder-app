import React from 'react';

import styles from './Toolbar.module.css';
import { Logo, NavItems, DrawerToggle } from '../../../components';


const toolbar = (props) => (
    <header className={styles.toolbar}>
        <DrawerToggle onClick={props.toggle}></DrawerToggle>
        <div className={styles.logo}>
            <Logo />
        </div>
        <nav className={styles.desktopOnly}>
            <NavItems />
        </nav>
    </header>
);

export default toolbar