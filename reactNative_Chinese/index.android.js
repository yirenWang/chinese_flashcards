/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    AsyncStorage
} from 'react-native';

import { Navigation } from './components/navigation';

export default class chinese extends Component {
    constructor(props){
        super(props);
        const arr = [];
        for(let i=0; i<5003; i++){
            arr.push([i, 1]);
        }
        AsyncStorage.multiSet(arr);
    }

    render() {
        return (
            <Navigation/>
        );
    }
}

AppRegistry.registerComponent('chinese', () => chinese);
