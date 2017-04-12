const React = require('react');
const ReactNative = require('react-native');

const {Component} = React;

const {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    AsyncStorage,
} = ReactNative;

class Answer extends Component {
    constructor(props){
        super(props)
    }

    _navigate(isRight){
        const that = this;
        this.props.navigator.push({
            id: 'question',
            passProps:{
                hsk_level: that.props.passProps.question.level,
                isRight,
            }
        })
    }

    correctAnswer(){
        AsyncStorage.getItem(this.props.passProps.question.id)
            .then((value) => AsyncStorage.setItem(this.props.passProps.question.id, value))
            .then(() => {});
        this._navigate(true);
    }

    wrongAnswer(){
        this._navigate(false);
    }

    render(){
        return(
            <View>
                <Text>The question: {this.props.passProps.question._definition}</Text>
                <Text>The question: {this.props.passProps.question._pinyin}</Text>
                <Text>The answer: {this.props.passProps.question._char} </Text>
                <Image
                    style={{width: 300, height: 300}}
                    source={{uri: `data:image/png;base64,${this.props.passProps.imageBase64}`}}
                />
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <TouchableHighlight style={styles.buttonStyle}
                                        onPress={() => { this.correctAnswer() } } >
                        <Text>Right</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.buttonStyle}
                                        onPress={() => { this.wrongAnswer() } } >
                        <Text>Wrong</Text>
                    </TouchableHighlight>

                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    }
});

module.exports = { Answer };