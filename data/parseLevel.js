const words = require('./allWords.json').words;
const fs = require('fs');

function addId(words){
  for(let i=0; i<words.length; i++){
    words[i].id = i;
  }
}

const filter_level = function (words, level){
  return words.filter((word) => word.level === level )
};


const hsk1_words = addId(filter_level(words, 1));
const hsk2_words = addId(filter_level(words, 2));
const hsk3_words = addId(filter_level(words, 3));
const hsk4_words = addId(filter_level(words, 4));
const hsk5_words = addId(filter_level(words, 5));
const hsk6_words = addId(filter_level(words, 6));



fs.appendFile('HSK1.json', JSON.stringify(hsk1_words), (err)=>{
  console.log(err);
});
fs.appendFile('HSK2.json', JSON.stringify(hsk2_words), (err)=>{
  console.log(err);
});
fs.appendFile('HSK3.json', JSON.stringify(hsk3_words), (err)=>{
  console.log(err);
});
fs.appendFile('HSK4.json', JSON.stringify(hsk4_words), (err)=>{
  console.log(err);
});
fs.appendFile('HSK5.json', JSON.stringify(hsk5_words), (err)=>{
  console.log(err);
});
fs.appendFile('HSK6.json', JSON.stringify(hsk6_words), (err)=>{
  console.log(err);
});
