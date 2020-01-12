/**
 * This file has the logic behind counting how many unique names are in a transcation
 */
const { checkNickname } = require('./nickname-checker')
const { correctFirstname, correctSurname, compareWords } = require('./spell-checker')

/**
 * This function counts how many unique people participate in a transaction
 * Considers: typos, nicknames, 'lastname ... firstname' card format, and middle names
 * @param {String} billFirstName The first name of the billing participant
 * @param {String} billLastName The last name of the billing participant
 * @param {String} shipFirstName The first name of the shipping participant
 * @param {String} shipLastName The last name of the shipping participant
 * @param {String} billNameOnCard The full name on card
 */
const countUniqueNames = (billFirstName, billLastName, shipFirstName, shipLastName, billNameOnCard) => {
  // Remove middle names
  billFirstName = billFirstName.replace(/ .*/g, '').toLowerCase()
  shipFirstName = shipFirstName.replace(/ .*/g, '').toLowerCase()

  // Fix first name typos
  billFirstName = correctFirstname(billFirstName)
  shipFirstName = correctFirstname(shipFirstName)

  // The amount of unique people
  let count = 1

  // Check first and last name amount of different people
  // If the last names of the billing and shipping are different, increment the counter
  if (!compareWords(billLastName, shipLastName)) {
    count++
    console.log('last name')
  // If the last names are the same but the first names are different, increment the counter
  } else if (!checkNickname(billFirstName, shipFirstName)) {
    console.log('first name')
    count++
  }

  // // Fix potential typos
  // billLastName = correctSurname(billLastName)
  // shipLastName = correctSurname(shipLastName)

  // Initial name count. Starts at 1
  return count
}

// countUniqueNames(“Deborah”,”Egli”,”Deborah”,”Egli”,”Deborah Egli”)
console.log(countUniqueNames('Deborah', 'Egli', 'Deborah', 'Egli', 'Deborah Egli'))
