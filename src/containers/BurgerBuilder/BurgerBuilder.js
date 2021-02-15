import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import _ from 'lodash';
import { Burger, BurgerControls, Modal, OrderSummery } from '../../components'

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
        burgerPrice: 4,
        purchaseable: false,
        orderNow: false
    }

    updateOrderNow = () => {
        this.setState({orderNow: true});
    }

    cancelOrder = () => {
        this.setState({orderNow: false});
    }

    continueOrder = () => {
        alert('YOU CONTINUE!');
    }
    
    updatePurchaseState (ingredients) {
        const sum = _.sum(_.valuesIn(ingredients));

        this.setState({purchaseable: sum > 0});
    }

    addIngredient = (type) => {
        const updatedIngredients = {...this.state.ingredients};
        const oldCount = this.state.ingredients[type];
        updatedIngredients[type] = oldCount + 1;

        const oldPrice = this.state.burgerPrice;
        let updatedPrice = oldPrice + INGREDIENTS_PRICES[type];
        updatedPrice = _.round(updatedPrice, 2);

        this.setState({ingredients: updatedIngredients, burgerPrice: updatedPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const updatedIngredients = {...this.state.ingredients};
            updatedIngredients[type] = oldCount - 1;
    
            const oldPrice = this.state.burgerPrice;
            let updatedPrice = oldPrice - INGREDIENTS_PRICES[type];
            updatedPrice = _.round(updatedPrice, 2);
    
            this.setState({ingredients: updatedIngredients, burgerPrice: updatedPrice});
            this.updatePurchaseState(updatedIngredients);
        };
    }

    render () {
        const disabledInfo = {...this.state.ingredients}
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.orderNow} modalClosed={this.cancelOrder}>
                    <OrderSummery 
                        ingredients={this.state.ingredients} 
                        price={this.state.burgerPrice}
                        cancel={this.cancelOrder}
                        continue={this.continueOrder}
                        showOrder={this.state.orderNow}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BurgerControls 
                    ingredientAdded={this.addIngredient}
                    ingredientRemoved={this.removeIngredient}
                    disabled={disabledInfo}
                    price={this.state.burgerPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.updateOrderNow}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;

