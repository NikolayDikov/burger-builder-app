import React from 'react';

import styles from './CheckoutSummery.module.css'
import { Burger, Button } from '../../../components'

const CheckoutSummery = (props) => {
    return (
        <div className={styles.checkoutSummery}>
            <h1>We hope it tastes well!</h1>
            <div className={styles.butgerOrderContainer}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType="Danger"
                clicked={props.checkoutCancel}
            >CANCEL</Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinue}
            >CONTINUE</Button>
        </div>
    );
}

export default CheckoutSummery;