import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Layout } from './components';
import { BurgerBuilder, Checkout } from './containers'

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/checkout" component={Checkout}/>
      </Layout>
    );
  }
}

export default App;
