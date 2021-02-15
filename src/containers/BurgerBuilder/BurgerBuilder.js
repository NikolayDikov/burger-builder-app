import React, { Component } from 'react';

import { Aux, withErrorHandler } from '../../hoc';
import _ from 'lodash';
import { Burger, BurgerControls, Modal, OrderSummery, Spinner } from '../../components';
import axios from '../../axios-orders';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        burgerPrice: 4,
        purchaseable: false,
        orderNow: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://burgertrainingapp-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data });
            })
            .catch(error => {
                this.setState({ error: true });
            });
    }

    updateOrderNow = () => {
        this.setState({ orderNow: true });
    }

    cancelOrder = () => {
        this.setState({ orderNow: false });
    }

    continueOrder = () => {
        // alert('YOU CONTINUE!');
        // this.setState({ loading: true });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.burgerPrice,
        //     customer: {
        //         name: 'Nikolay',
        //         address: {
        //             street: 'Some Dummy Street 1',
        //             zipCode: '12345',
        //             country: 'Some awesom country'
        //         },
        //         email: 'Nikolay@test.com'
        //     },
        //     deliveryMethod: 'ASAP'
        // }

        // axios.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({ loading: false, orderNow: false });
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false, orderNow: false });
        //     });
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    updatePurchaseState(ingredients) {
        const sum = _.sum(_.valuesIn(ingredients));

        this.setState({ purchaseable: sum > 0 });
    }

    addIngredient = (type) => {
        const updatedIngredients = { ...this.state.ingredients };
        const oldCount = this.state.ingredients[type];
        updatedIngredients[type] = oldCount + 1;

        const oldPrice = this.state.burgerPrice;
        let updatedPrice = oldPrice + INGREDIENTS_PRICES[type];
        updatedPrice = _.round(updatedPrice, 2);

        this.setState({ ingredients: updatedIngredients, burgerPrice: updatedPrice });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const updatedIngredients = { ...this.state.ingredients };
            updatedIngredients[type] = oldCount - 1;

            const oldPrice = this.state.burgerPrice;
            let updatedPrice = oldPrice - INGREDIENTS_PRICES[type];
            updatedPrice = _.round(updatedPrice, 2);

            this.setState({ ingredients: updatedIngredients, burgerPrice: updatedPrice });
            this.updatePurchaseState(updatedIngredients);
        };
    }

    render() {
        const disabledInfo = { ...this.state.ingredients }
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };

        let orderSummery = null;
        let burger = this.state.error ? <p>HUI</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
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
            orderSummery = (
                <OrderSummery
                    ingredients={this.state.ingredients}
                    price={this.state.burgerPrice}
                    cancel={this.cancelOrder}
                    continue={this.continueOrder}
                    showOrder={this.state.orderNow}
                />
            );
        }
        if (this.state.loading) {
            orderSummery = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.orderNow} modalClosed={this.cancelOrder}>
                    {orderSummery}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder);

