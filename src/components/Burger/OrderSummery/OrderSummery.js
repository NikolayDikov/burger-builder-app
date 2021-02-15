import React, { useEffect } from 'react';

import Aux from '../../../hoc/Aux'
import styles from './OrderSummery.module.css'
import { Button } from '../../../components'

const OrderSummery = ( props ) => {

    useEffect(() => {
        // console.log('OrderUpdate');
    }, [props.showOrder]);

    const ingredientSummery = Object.keys(props.ingredients)
        .map((igKey) => {
            return (
                <li key={igKey}><span className={styles.ingredients}>{igKey}</span>: {props.ingredients[igKey]}</li>
            );
        });
    
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A Delicious Burger with:</p>
            <ul>
                {ingredientSummery}
            </ul>
            <p>Continue to Checkout?</p>
            <p><b>Total Price: ${props.price.toFixed(2)}</b></p>
            <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
        </Aux>  
    );
};

export default OrderSummery