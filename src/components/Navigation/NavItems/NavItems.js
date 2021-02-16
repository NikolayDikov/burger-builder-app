import React from 'react';

import styles from './NavItems.module.css';
import NavItem from './NavItem/NavItem'

const navItems = (props) => (
    <ul className={styles.navItems}>
        <NavItem link="/">Burger Builder</NavItem>
        <NavItem link="/orders">Orders</NavItem>
    </ul>
);

export default navItems;