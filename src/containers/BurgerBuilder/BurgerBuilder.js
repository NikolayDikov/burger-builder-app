import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import { Burger, BurgerControls } from '../../components'

const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        burgerPrice: 4
    }

    addIngredient = (type) => {
        const updatedIngredients = {...this.state.ingredients};
        const oldCount = this.state.ingredients[type];
        updatedIngredients[type] = oldCount + 1;

        const oldPrice = this.state.burgerPrice;
        let updatedPrice = oldPrice + INGREDIENTS_PRICES[type];
        updatedPrice = Math.round(updatedPrice * 100)/100

        this.setState({ingredients: updatedIngredients, burgerPrice: updatedPrice});
    }

    removeIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type] = oldCount - 1;
    
            const oldPrice = this.state.burgerPrice;
            let updatedPrice = oldPrice - INGREDIENTS_PRICES[type];
            updatedPrice = Math.round(updatedPrice * 100)/100
    
            this.setState({ingredients: updatedIngredients, burgerPrice: updatedPrice});
        };
    }

    render () {
        const disabledInfo = {...this.state.ingredients}
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BurgerControls 
                    ingredientAdded={this.addIngredient}
                    ingredientRemoved={this.removeIngredient}
                    disabled={disabledInfo}
                    price={this.state.burgerPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;

