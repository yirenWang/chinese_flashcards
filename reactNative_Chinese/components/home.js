const React = require('react');
const ReactNative = require('react-native');

const {Component} = React;

const {
    StyleSheet,
    View,
    Button,
    Text,
    TouchableHighlight,
} = ReactNative;

class Home extends Component {
    constructor(props){
        super(props)
    }

    _navigator(hsk_level){
        this.props.navigator.push({
            id: `question`,
            passProps: {
                hsk_level: hsk_level,
            },
        })
    }

    render(){
        return(
            <View>
                <Button onPress={() => this._navigator(1)} title="HSK1"/>
                <Button onPress={() => this._navigator(2)} title="HSK2"/>
                <Button onPress={() => this._navigator(3)} title="HSK3"/>
                <Button onPress={() => this._navigator(4)} title="HSK4"/>
                <Button onPress={() => this._navigator(5)} title="HSK5"/>
                <Button onPress={() => this._navigator(6)} title="HSK6"/>
            </View>
        );
    }
}

module.exports = { Home };