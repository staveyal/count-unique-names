const fs = require('fs')
const { countUniqueNames } = require('../count-names')
const path = require('path')
const testDataLoc = path.join(__dirname, 'test-data.csv')

const readTestData = loc => {
  let content = fs.readFileSync(loc, { encoding: 'utf-8' })
  content = content.replace(/\r/g, '').split('\n')
  const headers = content.shift().split(',')

  const values = []
  // For each header, push the according data into an object
  content.forEach(row => {
    row = row.split(',')
    const rowContent = {}
    headers.forEach((header, index) => { rowContent[header] = row[index] })
    rowContent.uniqueNames = parseInt(rowContent.uniqueNames, 10)
    values.push(rowContent)
  })

  return values
}

let failedTests = 0
readTestData(testDataLoc).forEach(test => {
  // If a test failed, log it
  const value = countUniqueNames(test.billFirstName, test.billLastName, test.shipFirstName, test.shipLastName, test.billNameOnCard)
  if (value !== test.uniqueNames) {
    console.log('Test failed!')
    console.log(`countUniqueNames returned ${value}, ${test.uniqueNames} was expected`)
    console.log('Test data:')
    console.log(test)
    failedTests++
  }
})

console.log(`Tests completed with ${failedTests} failed tests`)
