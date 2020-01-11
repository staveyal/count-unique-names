/**
 * This file checks for typos
 * It contains an implementation of a spell checker using a definitive list of first names and surnames
 * It checks every word up to 2 edits away from the current word
 * Every one of the four possible edits will be explained in the makeSingleEdit(word) function
 */

const path = require('path')
// Unlike the nickname datasets, these files are definitive lists
// I didn't find the need to implement importing more than one file
const firstnamesPath = path.join(process.cwd(), 'data', 'firstnames', 'all.txt')
const surnamesPath = path.join(process.cwd(), 'data', 'surnames', 'all.txt')
const fs = require('fs')

// Read files and store them at variables
let firstnames = fs.readFileSync(firstnamesPath, { encoding: 'utf-8' }).toLowerCase()
let surnames = fs.readFileSync(surnamesPath, { encoding: 'utf-8' }).toLowerCase()

// Split to words
firstnames = firstnames.replace(/\r/g, '').split('\n')
surnames = surnames.replace(/\r/g, '').split('\n')

console.log(`firstnames: read`)
console.log(`surnames: read`)

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

/**
 * Returns the set of words a single edit away
 * Possible edits:
 *  - Adding a single letter anywhere in the word
 *  - Removing a single character anywhere in the word
 *  - Switching the order of any two adjacent characters in the word
 *  - Substituting any character in the word with another character
 * @param {String} word The word to make the edit to
 * @returns {Array} Every word created by making a single edit
 */
const makeSingleEdit = word => {
  // Make word an array
  word = word.split('')
  const results = []
  let newWord

  // Adding any one character from the alphabet anywhere in the word
  // i is the index of where to put the character in
  // j is which character to use
  for (let i = 0; i <= word.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      // array.slice() is used to return a new array instead of a reference
      newWord = word.slice()
      newWord.splice(i, 0, alphabet[j])
      // Push newWord to the results as a string
      results.push(newWord.join(''))
      if (newWord.join('') === 'jegli') console.log('jegli lmao')
    }
  }

  // Removing any one character from the word
  if (word.length > 1) {
    for (let i = 0; i < word.length; i++) {
      newWord = word.slice()
      // Remove a single letter from each index iteratively
      newWord.splice(i, 1)
      results.push(newWord.join(''))
    }
  }

  // Stores the letter at index i
  let r
  // Switching the order of any two adjacent characters
  if (word.length > 1) {
    for (let i = 0; i < word.length - 1; i++) {
      newWord = word.slice()
      // Removing the letter at index i and putting it in a variable
      r = newWord.splice(i, 1)
      newWord.splice(i + 1, 0, r)
      results.push(newWord.join(''))
    }
  }

//   Substituting any character in the word with any character in the alphabet
  for (let i = 0; i < word.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      newWord = word.slice()
      newWord[i] = alphabet[j]
      results.push(newWord.join(''))
    }
  }

  return results
}

makeSingleEdit('gau')

/**
 * This function finds the correct spelling of a word according to a dataset of words
 * Steps:
 * - If a word is a known word, return the word
 * - If the word has any known word single edit away, return the word
 * - If the word has any known word two edits away, return the word
 * @param {String} word The word to find the correct spelling of
 * @param {Array[String]} list The list of words to use to determine the correct spelling
 */
const correct = (word, list) => {
  // Known word
  if (list.includes(word)) return word

  // Makes every single edit away word, and checks if it exists
  const singleEditWords = makeSingleEdit(word)

  for (let i = 0; i < singleEditWords.length; i++) {
    if (list.includes(singleEditWords[i])) return singleEditWords[i]
  }

  // Make a list of doubly edited words, applying single edits to already single edited words
  let doubleEditWords = []
  singleEditWords.forEach(newWord => {
    doubleEditWords = doubleEditWords.concat(makeSingleEdit(newWord))
    if (makeSingleEdit(newWord).includes('jegli')) console.log('jegli pls')
  })

  // Checks if any of the words exist in the list
  for (let i = 0; i < doubleEditWords.length; i++) {
    if (list.includes(doubleEditWords[i])) return doubleEditWords[i]
  }
  // If no fix was found, return the word
  return word
}

const correctFirstname = word => correct(word, firstnames)
const correctSurname = word => correct(word, surnames)

console.log(correctFirstname('debb'))