const { stringify, createBlankWordArray, isWordSolved, print } = require('./lib');

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

  it('should throw an TypeError is passed udefined in input', () => {
    // // This says that at least one expect needs to be called
    // expect.assertions(1);
    // try {
    //   isWordSolved();
    // } catch (err) {
    //   expect(err).toBeInstanceOf(TypeError);
    // }

    expect(() => isWordSolved()).toThrow(TypeError);
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
  });
});
