const readlineSync = require('readline-sync');
const hangman = require('./hangman');

// jest.mock('readline-sync');
describe('playHangman', () => {
  console.log = jest.fn();
  // Same implementation
  // console.log = jest.spyOn(console, 'log').to;
  const hangmanSpy = jest.spyOn(hangman, 'playHangman');

  afterEach(() => {
    // resets our mock after each test
    console.log.mockClear();
    hangmanSpy.mockClear();
  });

  it('should print a success message and end when a completed word has been guessed', () => {
    const targetWord = 'abc';
    const guessedWord = 'abc'.split('');
    hangman.playHangman(targetWord, guessedWord);
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith(`You win! The word was ${targetWord}`);
    // make sure the recursive function is not ran again
    expect(hangmanSpy).toBeCalledTimes(1);
  });

  it('should print a failure message and end when you have run out of strikes', () => {
    const targetWord = 'abc';
    const guessedWord = 'a_c'.split('');
    hangman.playHangman(targetWord, guessedWord);
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith(`You lose! The word was ${targetWord}`);
    // make sure the recursive function is not ran again
    expect(hangmanSpy).toBeCalledTimes(1);
  });

  it('should continue play if there was no win or loss', () => {
    const targetWord = 'abc';
    const guessedWord = 'a_c'.split('');
    const maxStrikes = 5;
    hangman.playHangman(targetWord, guessedWord, maxStrikes, maxStrikes);
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith(`a_c`);
    // make sure the recursive function is not ran again
    expect(hangmanSpy).toBeCalledTimes(1);
  });
});
