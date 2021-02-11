import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import styles from './Layout.module.css';
import { Toolbar, SideDrawer } from '../../components';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosed = () => {
        this.setState({ showSideDrawer: false });
    }
    toggleSideDrawer = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar toggle={this.toggleSideDrawer} />
                <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerClosed} />
                <main className={styles.content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
};

export default Layout;