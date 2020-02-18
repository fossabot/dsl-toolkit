module.exports = function (input, find) {
  const inputArray = input.split('\n')
  const returnValue = []
  inputArray.forEach(function (line, lineKey) {
    /* istanbul ignore else */
    if (line.includes(find)) {
      returnValue.push(lineKey)
    }
  })

  return returnValue
}
