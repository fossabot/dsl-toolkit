const fs = require('fs')
const linker = require('./linker')
const Bottle = require('bottlejs')
const mime = require('mime-types')

module.exports = exports = function (file, beginning, closing, newValue = null) {
  const string = fs.readFileSync(file, { encoding: 'utf8' })
  let linkerResult = {}
  try {
    linkerResult = linker(string, beginning, closing, newValue)
  } catch (e) {
    throw String(`file: ${file} \n ${e}`)
  }
  /* istanbul ignore else */
  if (linkerResult.meta.changed.all) {
    fs.writeFileSync(file, linkerResult.returnData, { encoding: 'utf8' })
    while (fs.readFileSync(file, { encoding: 'utf8' }) !== linkerResult.returnData) {
      // makes sure that it writes the content of the file, I haave not found a better way to do it yet.
      // https://www.daveeddy.com/2013/03/26/synchronous-file-io-in-nodejs/
      // so writeFileSync is not really sync.
      console.log('aaaa')
    }
  }
  const fileInfoServices = new Bottle('fileInfoServices')
  const fileInfo = fileInfoServices.container
  linkerResult.meta.fileInfo = fileInfo

  fileInfoServices.service('path', function () {
    const path = String(file)

    return path
  })

  fileInfoServices.service('type', function (path) {
    const type = String(mime.lookup(path.toString()))

    return type
  }, 'path')

  return linkerResult
}
