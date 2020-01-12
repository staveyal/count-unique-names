/*
 * This file handles reading the nickname CSV files and parsing them to an array
 */
const path = require('path')
// Path to nicknames folder
const dataDir = path.join(process.cwd(), 'data', 'nicknames')
const fs = require('fs')
const parse = require('csv-parse/lib/sync')

/**
 * Reads the CSV file and storing it to memory in an easily accessible form
 * We're dealing with relatively small data which could easily be stored on memory
 * The speed of the transaction is important because it should happen almost instantly
 * Re-reading the file everytime you make a transaction is slower than accessing the memory
 * @param {Array} data The array to push the data in to
 * @param {String} loc File location relative to the root directory, enabling adding data values for multiple CSVs
 * Data will be stored at an array I.E.
 * [
 *  [name1, name2, name3, name4],
 *  [name1, name2, name3, name4]
 * ]
 */
const readSingleCsv = (data, loc) => {
  console.log(loc)
  let content = fs.readFileSync(loc, { encoding: 'utf-8' })
  content = content.toLowerCase().replace(/ /g, '').replace(/\r/g, '')
  content = content.split('\n')

  for (let i = 0; i < content.length; i++) {
    content[i] = content[i].split(',')
    data.push(content[i])
  }

  // Parse the content
  // data.push(parse(content, {
  //   skip_empty_lines: true
  // }).slice())
}

const readCsvs = data => {
  const files = fs.readdirSync(dataDir)
  files.forEach(file => readSingleCsv(data, `${dataDir}/${file}`))
}

// Initialising data array
const data = []
console.log('Array init')
readCsvs(data)

// Check inside the data array if there exists any array with the two names specified in it
const checkNickname = (name1, name2) => {
  name1 = name1.toLowerCase()
  name2 = name2.toLowerCase()

  for (let i = 0; i < data.length; i++) {
    if (data[i].includes(name1) && data[i].includes(name2)) {
      console.log('gottem')
      return true
    }
  }

  return false
}

module.exports = {
  checkNickname
}
