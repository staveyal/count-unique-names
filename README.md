# Count Unique Names
> A NodeJS implementation of a function that counts unique names in a transaction

## File structure
- `data/`: Contains CSV sheets used for the project. Each CSV should have 
each alias point only towards a single name
    - `nicknames/`: CSV files containing nicknames and names that reference the same value
    - `firstnames/`: TXT files containing first names in the English language
    - `surnames/`: TXT files containing surnames in the English language
- `tests/`: Contains the script file and test data for the main function
  - `test-data.csv`: Test data for the function
  - `test.js`: Test script
- `spell-checker.js`: An implementation of a spell checker, using data that consists every first and last name in the English language ([First and Surname CSV](https://github.com/smashew/NameDatabases))
- `nickname-checker.js`: A function that checks if 2 first names are nicknames of each other ([Common nickname CSV](https://github.com/carltonnorthern/nickname-and-diminutive-names-lookup/blob/master/names.csv))
- `count-names.js`: The main function, uses functions defined in the files listed earlier to count how many unique names are in a transaction

## How to test it
```bash
# Run the test script
node tests/test.js
# That's it! No additional dependencies are needed in order to run the code
```

## Data sources
- [Common nickname CSV](https://github.com/carltonnorthern/nickname-and-diminutive-names-lookup/blob/master/names.csv)
- [First and Surname CSV](https://github.com/smashew/NameDatabases)
