const React = require('react');
const ReactNative = require('react-native');

const { Component } = React;

const {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    AsyncStorage,
} = ReactNative;

import { storage } from './storageInit';

class Answer extends Component {
    constructor(props) {
        super(props);
    }

    _navigate(prevQuestion) {
        const that = this;

        this.props.navigator.push({
            id: 'question',
            passProps: {
                hsk_level: that.props.passProps.question.level,
                prevQuestion: prevQuestion || '',
            },
        });
    }

    correctAnswer() {
        storage
            .load({
                key: `HSK${this.props.passProps.question.level}`,
                id: this.props.passProps.question.id,
            })
            .then(data => {
                if (data.right - data.wrong > 5) {
                    storage.remove({
                        key: `BAD_HSK${this.props.passProps.question.level}`,
                        id: this.props.passProps.question.id,
                    });
                }

                storage.save({
                    key: `HSK${this.props.passProps.question.level}`,
                    id: this.props.passProps.question.id,
                    rawData: {
                        right: data.right + 1,
                        wrong: data.wrong,
                    },
                });
            });
        this._navigate();
    }

    wrongAnswer() {
        storage
            .load({
                key: `HSK${this.props.passProps.question.level}`,
                id: this.props.passProps.question.id,
            })
            .then(data => {
                if (data.right - data.wrong < 0) {
                    storage.save({
                        key: `BAD_HSK${this.props.passProps.question.level}`,
                        id: this.props.passProps.question.id,
                        rawData: '',
                    });
                }
                storage.save({
                    key: `HSK${this.props.passProps.question.level}`,
                    id: this.props.passProps.question.id,
                    rawData: {
                        right: data.right,
                        wrong: data.wrong + 1,
                    },
                });
            });

        this._navigate(this.props.passProps.question);
    }

    render() {
        return (
            <View>
                <Text>
                    The question: {this.props.passProps.question._definition}
                </Text>
                <Text>
                    The question: {this.props.passProps.question._pinyin}
                </Text>
                <Text>The answer: {this.props.passProps.question._char} </Text>
                <Image
                    style={{ width: 300, height: 300 }}
                    source={{
                        uri: `data:image/png;base64,${this.props.passProps.imageBase64}`,
                    }}
                />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableHighlight
                        style={styles.buttonStyle}
                        onPress={() => {
                            this.correctAnswer();
                        }}
                    >
                        <Text>Right</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.buttonStyle}
                        onPress={() => {
                            this.wrongAnswer();
                        }}
                    >
                        <Text>Wrong</Text>
                    </TouchableHighlight>

                </View>
            </View>
        );
    }
}

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

module.exports = { Answer };
