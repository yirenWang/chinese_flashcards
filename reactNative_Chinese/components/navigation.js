import React, { Component } from 'react';
import { Navigator } from 'react-native';

import { Answer } from './answer';
import { Question } from './question';
import { Home } from './home';

class Navigation extends Component {
    navigatorRenderScene(route, navigator) {
        switch (route.id) {
            case 'answer':
                return (
                    <Answer navigator={navigator} passProps={route.passProps} />
                );
            case 'question':
                return (
                    <Question
                        navigator={navigator}
                        passProps={route.passProps}
                    />
                );
            case 'home':
                return <Home navigator={navigator} />;
        }
    }

    render() {
        return (
            <Navigator
                initialRoute={{ id: 'home' }}
                renderScene={this.navigatorRenderScene}
            />
        );
    }
}

module.exports = { Navigation };
