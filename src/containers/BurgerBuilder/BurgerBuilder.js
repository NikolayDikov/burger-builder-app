import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Aux, withErrorHandler } from '../../hoc';
import _ from 'lodash';
import { Burger, BurgerControls, Modal, OrderSummery, Spinner } from '../../components';
// import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions'

// const INGREDIENTS_PRICES = {
//     salad: 0.5,
//     bacon: 0.7,
//     cheese: 0.4,
//     meat: 1.3
// };

class BurgerBuilder extends Component {

    state = {
        orderNow: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('https://burgertrainingapp-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => {
        //         this.setState({ error: true });
        //     });
    }

    updateOrderNow = () => {
        this.setState({ orderNow: true });
    }

    cancelOrder = () => {
        this.setState({ orderNow: false });
    }

    continueOrder = () => {
        // Example of sending query params:
        
        // const queryParams = [];
        // for (let i in this.props.ings) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        // }
        // queryParams.push('price=' + this.state.burgerPrice)
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // });

        this.props.history.push('/checkout');
    }

    updatePurchaseState(ingredients) {
        const sum = _.sum(_.valuesIn(ingredients));

        return sum > 0;
    }

    // addIngredient = (type) => {
    //     const updatedIngredients = { ...this.state.ingredients };
    //     const oldCount = this.state.ingredients[type];
    //     updatedIngredients[type] = oldCount + 1;

    //     const oldPrice = this.state.burgerPrice;
    //     let updatedPrice = oldPrice + INGREDIENTS_PRICES[type];
    //     updatedPrice = _.round(updatedPrice, 2);

    //     this.setState({ ingredients: updatedIngredients, burgerPrice: updatedPrice });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredient = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount > 0) {
    //         const updatedIngredients = { ...this.state.ingredients };
    //         updatedIngredients[type] = oldCount - 1;

    //         const oldPrice = this.state.burgerPrice;
    //         let updatedPrice = oldPrice - INGREDIENTS_PRICES[type];
    //         updatedPrice = _.round(updatedPrice, 2);

    //         this.setState({ ingredients: updatedIngredients, burgerPrice: updatedPrice });
    //         this.updatePurchaseState(updatedIngredients);
    //     };
    // }

    render() {
        const disabledInfo = { ...this.props.ings }
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        };

        let orderSummery = null;
        let burger = this.state.error ? <p>HUI</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BurgerControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.updateOrderNow}
                    />
                </Aux>
            );
            orderSummery = (
                <OrderSummery
                    ingredients={this.props.ings}
                    price={this.props.price}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.burgerPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ignName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ignName}),
        onIngredientRemoved: (ignName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ignName})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder));

