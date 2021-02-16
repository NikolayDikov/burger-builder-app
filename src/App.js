import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Layout } from './components';
import { BurgerBuilder, Checkout, Orders } from './containers'

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
