import React, { Component } from 'react';

import { Layout } from './components';
import { BurgerBuilder } from './containers'

class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder />
      </Layout>
    );
  }
}

export default App;
