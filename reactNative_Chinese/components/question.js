const React = require('react');
const ReactNative = require('react-native');

const { Component } = React;

const { StyleSheet, Text, View, TouchableHighlight } = ReactNative;

import { storage } from './storageInit';
import SignatureCapture from 'react-native-signature-capture';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = { question: '' };
    }

    getQuestion() {
        const that = this;
        if (Math.random() > 0.5) {
            return storage.getIdsForKey(`HSK${that.props.passProps.hsk_level}`);
        } else {
            return storage.getIdsForKey(
                `BAD_HSK${that.props.passProps.hsk_level}`
            );
        }
    }

    componentWillMount() {
        switch (this.props.passProps.hsk_level) {
            case 1:
                this.getQuestion().then(ids => {
                    const question =
                        require(`../data/HSK1.json`).words.find(
                            word => word.id == ids[getRandomInt(0, ids.length)]
                        ) ||
                        require(`../data/HSK1.json`).words[
                            getRandomInt(0, 100)
                        ];
                    this.setState({
                        question,
                    });
                });
                break;
            case 2:
                this.getQuestion().then(ids => {
                    const question =
                        require(`../data/HSK2.json`).words.find(
                            word => word.id == ids[getRandomInt(0, ids.length)]
                        ) ||
                        require(`../data/HSK2.json`).words[
                            getRandomInt(0, 100)
                        ];
                    this.setState({
                        question,
                    });
                });
            case 3:
                this.getQuestion().then(ids => {
                    const question =
                        require(`../data/HSK3.json`).words.find(
                            word => word.id == ids[getRandomInt(0, ids.length)]
                        ) ||
                        require(`../data/HSK3.json`).words[
                            getRandomInt(0, 100)
                        ];
                    this.setState({
                        question,
                    });
                });
                break;
            case 4:
                this.getQuestion().then(ids => {
                    const question =
                        require(`../data/HSK4.json`).words.find(
                            word => word.id == ids[getRandomInt(0, ids.length)]
                        ) ||
                        require(`../data/HSK4.json`).words[
                            getRandomInt(0, 100)
                        ];
                    this.setState({
                        question,
                    });
                });
                break;
            case 5:
                this.getQuestion().then(ids => {
                    const question =
                        require(`../data/HSK5.json`).words.find(
                            word => word.id == ids[getRandomInt(0, id.length)]
                        ) ||
                        require(`../data/HSK5.json`).words[
                            getRandomInt(0, 100)
                        ];
                    this.setState({
                        question,
                    });
                });
                break;
            case 6:
                this.getQuestion().then(ids => {
                    const question =
                        require(`../data/HSK6.json`).words.find(
                            word => word.id == ids[getRandomInt(0, id.length)]
                        ) ||
                        require(`../data/HSK6.json`).words[
                            getRandomInt(0, 100)
                        ];
                    this.setState({
                        question,
                    });
                });
                break;
        }
    }

    _navigate(imageBase64) {
        const that = this;
        this.props.navigator.push({
            id: 'answer',
            passProps: {
                imageBase64: imageBase64,
                question: that.state.question,
            },
        });
    }

    saveSign() {
        this.refs['sign'].saveImage();
    }

    resetSign() {
        this.refs['sign'].resetImage();
    }

    _onSaveEvent(result) {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        this._navigate(result.encoded);
        console.log(result);
    }

    _onDragEvent() {
        // This callback will be called when the user enters signature
        console.log('dragged');
    }

    componentDidUpdate() {
        this.resetSign();
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                    {' '}{this.state.question._definition}{' '}
                </Text>
                <Text
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                    {' '}{this.state.question._pinyin}{' '}
                </Text>
                <SignatureCapture
                    style={[{ flex: 1 }, styles.signature]}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent.bind(this)}
                    onDragEvent={this._onDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={'portrait'}
                />

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableHighlight
                        style={styles.buttonStyle}
                        onPress={() => {
                            this.saveSign();
                        }}
                    >
                        <Text>Save</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={styles.buttonStyle}
                        onPress={() => {
                            this.resetSign();
                        }}
                    >
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#eeeeee',
        margin: 10,
    },
});

module.exports = { Question };
