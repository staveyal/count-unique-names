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
firstnames = firstnames.split('\n')
surnames = surnames.split('\n')

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

  // Substituting any character in the word with any character in the alphabet
  for (let i = 0; i < word.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      newWord = word.slice()
      newWord[i] = alphabet[j]
      results.push(newWord.join(''))
    }
  }
  console.log(results)
}

makeSingleEdit('gau')