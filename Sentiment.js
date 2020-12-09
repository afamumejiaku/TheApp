function tokenize(text) {
  return text.toLowerCase().split(' ')
}

function deleteCharsNums(word) {
  return word.replace(/[^\w]/g, ' ')
}

function rateWord(word) {
  return word in AFINN ? AFINN[word] : 0
}

function sum(x, y) {
  return parseInt(x) + parseInt(y)
}

function analyse(text) {
  return tokenize(text).map(deleteCharsNums).map(rateWord).reduce(sum)
}
