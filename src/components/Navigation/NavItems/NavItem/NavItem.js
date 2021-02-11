import React from 'react';

import styles from './NavItem.module.css';

const navItem = (props) => (
    <li className={styles.navItem}>
        <a 
            href={props.link} 
            className={props.active ? styles.active : null}
        >
            {props.children}
        </a>
    </li>
);

export default navItem;