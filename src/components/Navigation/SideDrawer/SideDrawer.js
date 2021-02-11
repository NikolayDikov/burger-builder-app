import React from 'react';

import Aux from '../../../hoc/Aux';
import { Logo, NavItems, Backdrop } from '../../../components';
import styles from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let sideDrawerClasses;
    props.show ? sideDrawerClasses = [styles.sideDrawer, styles.Open] : sideDrawerClasses = [styles.sideDrawer, styles.Close]
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.closed}/>
            <div className={sideDrawerClasses.join(' ')}>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <nav>
                    <NavItems />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;