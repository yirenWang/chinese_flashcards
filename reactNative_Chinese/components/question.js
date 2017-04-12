/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

const React= require('react');
const ReactNative = require('react-native');

const { Component } = React;

const {
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} = ReactNative;

import SignatureCapture from 'react-native-signature-capture';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

class Question extends Component {
    constructor(props){
        super(props);
        this.state = {question: "", correct_answers: 0};
    }

    componentWillMount(){
        switch (this.props.passProps.hsk_level){
            case 1:
                this.setState({question: require(`../data/HSK1.json`).words[getRandomInt(0,146)]});
                break;
            case 2:
                this.setState({question: require(`../data/HSK2.json`).words[getRandomInt(0,146)]});
                break;
            case 3:
                this.setState({question: require(`../data/HSK3.json`).words[getRandomInt(0,298)]});
                break;
            case 4:
                this.setState({question: require(`../data/HSK4.json`).words[getRandomInt(0,585)]});
                break;
            case 5:
                this.setState({question: require(`../data/HSK5.json`).words[getRandomInt(0,1311)]});
                break;
            case 6:
                this.setState({question: require(`../data/HSK6.json`).words[getRandomInt(0,2510)]});
                break;
        }
    }

    component
    _navigate(imageBase64){
        const that = this;
        this.props.navigator.push({
            id: 'answer',
            passProps: {
                imageBase64: imageBase64,
                question: that.state.question,
            }
        })
    }

    saveSign() {
        this.refs["sign"].saveImage();
    }

    resetSign() {
        this.refs["sign"].resetImage();
    }

    _onSaveEvent(result) {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        this._navigate(result.encoded);
        console.log(result);
    }

    _onDragEvent() {
        // This callback will be called when the user enters signature
        console.log("dragged");
    }

    componentDidUpdate(){
        this.resetSign();
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={{alignItems:"center",justifyContent:"center"}}> {this.state.question._definition} </Text>
                <Text style={{alignItems:"center",justifyContent:"center"}}> {this.state.question._pinyin} </Text>
                <SignatureCapture
                    style={[{flex:1},styles.signature]}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent.bind(this)}
                    onDragEvent={this._onDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"}/>

                <View style={{ flex: 1, flexDirection: "row" }}>
                    <TouchableHighlight style={styles.buttonStyle}
                                        onPress={() => { this.saveSign() } } >
                        <Text>Save</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.buttonStyle}
                                        onPress={() => { this.resetSign() } } >
                        <Text>Reset</Text>
                    </TouchableHighlight>

                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    }
});

module.exports = { Question };