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
    count++
  }

  /**
   * Handling the name on card
   * Since we don't know which word is the first name and which is the last name, we first need to try and identify the last name
   * The only possible difference in the last name is a typo, since last names do not have nicknames
   * So we use the compareWords function in order to do that
   */
  billNameOnCard = billNameOnCard.split(' ')
  billNameOnCard = [billNameOnCard[0], billNameOnCard[billNameOnCard.length - 1]]

  // Attempting to identify the last name on card, according to the billing person
  // If the first word is the family name put it in the last word
  if (compareWords(billLastName, billNameOnCard[0])) {
    const firstname = billNameOnCard[1]
    billNameOnCard[1] = billNameOnCard[0]
    billNameOnCard[0] = firstname
    if (!checkNickname(correctFirstname(billNameOnCard[0]), billFirstName)) {
      count++
    }
  // Same last name, at the right place
  } else if (compareWords(billLastName, billNameOnCard[1])) {
    if (!checkNickname(correctFirstname(billNameOnCard[0]), billFirstName)) {
      count++
    }
  } else {
    // The last name is different
    count++
  }

  return count
}

module.exports = {
  countUniqueNames
}
