const fs = require('fs')
const parse = require('csv-parse/lib/sync')

// Array that stores the name and aliases pairs
const data = []

/**
 * Reads the CSV file and storing it to memory in an easily accessible form
 * We're dealing with relatively small data which could easily be stored on memory
 * The speed of the transaction is important because it should happen almost instantly
 * Re-reading the file everytime you make a transaction is slower than accessing the memory
 * @param {Array} data The array to push the data in to
 * @param {String} loc File location relative to the root directory, enabling adding data values for multiple CSVs
 * Data will be stored at this format
 * {
 *   name: 'name',
 *   alias: 'alias
 * }
 * Additional fields according to each data source will be stored the objects however they will not be used
 * Valid CSV should mean that each alias only points towards a single name
 * I.E. Debbie only points to Deborah
 * However, the same value for each alias could also function as a name
 * I.E. Deb can point to Debbie, and Debbie can point to Deborah
 */
const readSingleCSV = (data, loc) => {
  let content = fs.readFileSync(`${process.cwd()}/${loc}`, { encoding: 'utf-8' })
  content = content.toLowerCase().replace(/ /g, '')
  // Parse the content
  data.push(parse(content, {
    columns: true,
    skip_empty_lines: true
  }))
}
readSingleCSV(data, 'data/nicknames.csv')
