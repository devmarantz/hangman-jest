const { stringify } = require('./lib');

test('stringify should convert an arbitrary string to a string', () => {
  const stringArray = ['h', 'e', 'l', 'l', 'o'];
  const result = stringify(stringArray);
  expect(result).toBe('hello');
});

test('stringify should maintain case', () => {
  const stringArray = ['H', 'e', 'l', 'l', 'o'];
  const result = stringify(stringArray);
  expect(result).toBe('Hello');

  const allCapsString = ['H', 'E', 'L', 'L', 'O'];
  expect(stringify(allCapsString)).toBe('HELLO');
});

test('stringify should maintain white-space', () => {
  const stringArray = 'Hello World'.split();
  const result = stringify(stringArray);
  expect(result).toBe('Hello World');
});

test('Stringify should return an empty string when given an empty array', () => {
  expect(stringify([])).toBe('');
});
