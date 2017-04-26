const React = require('react');
const ReactNative = require('react-native');

const { Component } = React;

const { StyleSheet, View, Text, TouchableHighlight } = ReactNative;

const styles = StyleSheet.create({
    buttonStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#eeeeee',
        margin: 10,
    },
});

class customButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <TouchableHighlight>
                    <TouchableHighlight
                        style={styles.buttonStyle}
                        onPress={this.props.onButtonPress}
                    >
                        <Text>{this.props.buttonText}</Text>
                    </TouchableHighlight>
                </TouchableHighlight>
            </View>
        );
    }
}

module.exports = { customButton };
