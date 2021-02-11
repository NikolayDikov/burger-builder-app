import React from 'react';

import styles from './Modal.module.css'
import Aux from '../../../hoc/Aux'
import {Backdrop} from '../../../components'

const modal = (props) => {
    let toggleModalClasses;
    props.show ? toggleModalClasses = `${styles.Modal} ${styles.modalToggle}` : toggleModalClasses = `${styles.Modal}`;

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div className={toggleModalClasses}>
                {props.children}
            </div>
        </Aux>
    )
};

export default modal;