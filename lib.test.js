const readlineSync = require('readline-sync');
const {
  stringify,
  createBlankWordArray,
  isWordSolved,
  print,
  randomlySelectWord,
  askForALetter,
  validateInput,
  fillInGuessedLetters,
  wordIncludesLetter,
} = require('./lib');

describe('Stringify', () => {
  it('stringify should convert an arbitrary string to a string', () => {
    const stringArray = ['h', 'e', 'l', 'l', 'o'];
    const result = stringify(stringArray);
    expect(result).toBe('hello');
  });

  it('stringify should maintain case', () => {
    const stringArray = ['H', 'e', 'l', 'l', 'o'];
    const result = stringify(stringArray);
    expect(result).toBe('Hello');

    const allCapsString = ['H', 'E', 'L', 'L', 'O'];
    expect(stringify(allCapsString)).toBe('HELLO');
  });

  it('stringify should maintain white-space', () => {
    const stringArray = 'Hello World'.split();
    const result = stringify(stringArray);
    expect(result).toBe('Hello World');
  });

  it('Stringify should return an empty string when given an empty array', () => {
    expect(stringify([])).toBe('');
  });

  it('Stringify should properly handle array entries with multiple characters', () => {
    expect(stringify(['Hell', 'o'])).toBe('Hello');
  });

  it('Stringify should return nothing if there is no input', () => {
    expect(stringify()).toBe('');
  });
});

describe('createBlankWordArray', () => {
  it('Should return an aray arbitrary length full of underscores', () => {
    const result = createBlankWordArray(10);
    expect(result.length).toBe(10);
    // Does the same thing
    expect(result).toHaveLength(10);
    // Checks if they are all undescores
    // toEqual checks deep equality
    expect(result).toEqual(['_', '_', '_', '_', '_', '_', '_', '_', '_', '_']);

    expect(result.every(letter => letter === '_')).toBeTruthy();
  });

  it('Should return an empty array when passed a length of 0', () => {
    expect(createBlankWordArray(0)).toHaveLength(0);
    expect(createBlankWordArray(0)).toEqual([]);
  });

  it('Should gracefully handle undefined input', () => {
    expect(createBlankWordArray()).toHaveLength(0);
    expect(createBlankWordArray()).toEqual([]);
  });

  it('Should return empty array on non-number inputs', () => {
    expect(createBlankWordArray('hello')).toHaveLength(0);
    expect(createBlankWordArray({})).toHaveLength(0);
    expect(createBlankWordArray(true)).toHaveLength(0);
  });
});

describe('isWordSolved', () => {
  it('should return false if there is at least one underscore', () => {
    const input = 'a_b'.split('');
    const result = isWordSolved(input);
    expect(result).toBeFalsy();
    expect(result).not.toBeTruthy();
  });

  it('should return true if there are no underscores', () => {
    const input = 'abc'.split('');
    const result = isWordSolved(input);
    expect(result).toBeTruthy();
  });

  it('should throw an TypeError is passed undefined in input', () => {
    // // This says that at least one expect needs to be called
    expect.assertions(1);
    try {
      isWordSolved();
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError);
    }

    // expect(isWordSolved()).toThrow(TypeError);
  });
});

describe('print', () => {
  it('should log output to the console', () => {
    // mock the console.log function
    console.log = jest.fn();
    print('Some input');
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith('Some input');
    console.log.mockClear();
  });

  it('should output an empty string to the console', () => {
    print('');
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith('');
    console.log.mockClear();
    // TODO: How to restore
  });
});

describe('validateInput', () => {
  it('should only return a single letter when a single letter is passed', () => {
    const result = validateInput('a');
    expect(result).toBe('a');
  });

  it('should return the first character if it receives a string', () => {
    const result = validateInput('string');
    expect(result).toBe('s');
  });

  it('should throw an error with a message of "Invalid input" if it recieves a number', () => {
    expect.assertions(2);
    try {
      validateInput(2);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Invalid input');
    }
  });

  it('should throw an error if it recieves an undefined input', () => {
    expect(validateInput).toThrow('Invalid input');
  });
  it(`should throw an error with a message of "invalid input", if it recieves a character that isn't a character`, () => {
    expect(() => {
      validateInput('2');
    }).toThrow('Invalid input');

    expect(() => {
      validateInput('.');
    }).toThrow('Invalid input');
  });
});

describe('fillInGuessedLetters', () => {
  it('should fill in a guessed letter for an incomplete word', () => {
    let guessedLetter = 't';
    let guessedWord = ['_', '_', '_'];
    let targetWord = 'toy';

    const result = fillInGuessedLetters(guessedLetter, guessedWord, targetWord);
    expect(result).toEqual(['t', '_', '_']);
  });
});

describe('wordIncludesLetter', () => {
  it('should fill in a guessed letter for an incomplete word', () => {
    const word = 'bat';
    const letter = 'b';

    const result = wordIncludesLetter(word, letter);
    expect(result).toBe(true);
  });
});

jest.mock('readline-sync');
describe('askForAletter', () => {
  it('should return the letter that the user input', () => {
    readlineSync.question.mockReturnValueOnce('a');
    const result = askForALetter();
    expect(result).toBe('a');
  });
});

describe('randomlySelectWord', () => {
  // Math.random = jest.fn(() => 0.5);
  // it('should return the middle word', () => {
  //   const result = randomlySelectWord(['first', 'second', 'third']);
  //   expect(result).toBe('second');
  // });

  it('should return any word in the array', () => {
    Math.random = jest.fn();
    Math.random
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.9);
    const firstResult = randomlySelectWord(['first', 'second', 'third']);
    const secondResult = randomlySelectWord(['first', 'second', 'third']);
    const thirdResult = randomlySelectWord(['first', 'second', 'third']);
    expect(firstResult).toBe('first');
    expect(secondResult).toBe('second');
    expect(thirdResult).toBe('third');
  });
});
