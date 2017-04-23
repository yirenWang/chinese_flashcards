const React = require('react');
const ReactNative = require('react-native');

const {Component} = React;

import {storage} from "./storageInit";

const {
    View,
    Button,
} = ReactNative;

class Home extends Component {
  constructor(props){
    super(props);

    this.checkDataLoadedAndSave = this.checkDataLoadedAndSave.bind(this);
  }

  saveWords(words, hskLevel) {
    return words.forEach((word) => {
      // load the weight table
      // add the ids corresponding to each HSK level
      storage.save({
        key:`HSK${hskLevel}`,
        id: word.id,
        rawData: {acquired: false}
      })
    })
  }

  checkDataLoadedAndSave(words, hskLevel){
    return storage.load({
      key: `HSK${hskLevel}`,
      id: "loaded"
    })
      .then()
      .catch((err) => {
        if(err.name === 'NotFoundError'){
          this.saveWords(words, hskLevel);
        }
      })
  }

  _navigator(hsk_level){
    let words = {};
    switch(hsk_level){
      case 1:
        words = require('../data/HSK1.json').words;
        this.checkDataLoadedAndSave(words, hsk_level)
          .catch(err => console.warn(err));
        break;
      case 2:
        words = require(`../data/HSK2.json`).words;
        this.checkDataLoadedAndSave(words, hsk_level);
        break;
      case 3:
        words = require(`../data/HSK3.json`).words;
        this.checkDataLoadedAndSave(words, hsk_level);
        break;
      case 4:
        words = require(`../data/HSK4.json`).words;
        this.checkDataLoadedAndSave(words, hsk_level);
        break;
      case 5:
        words = require(`../data/HSK5.json`).words;
        this.checkDataLoadedAndSave(words, hsk_level);
        break;
      case 6:
        words = require(`../data/HSK6.json`).words;
        this.checkDataLoadedAndSave(words, hsk_level);
    }
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