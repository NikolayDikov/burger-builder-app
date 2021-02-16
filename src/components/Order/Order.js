import React from 'react';

import styles from './Order.module.css'

const Order = (props) => {
    const ingredients = [];

    for (const i in props.ingredients) {
        ingredients.push(
            {
                name: i,
                amount: props.ingredients[i]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span key={ig.name} className={styles.ingredients}>{ig.name} ({ig.amount})</span>
    });

    return (
        <div className={styles.order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <b>USD {Number(props.price).toFixed(2)}</b></p>
        </div>
    );
};

export default Order;