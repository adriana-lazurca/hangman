import { useCallback, useEffect, useState } from 'react';

import { HangmanDrawing } from './HangmanDrawing';
import { HangmanWord } from './HangmanWord';
import { Keyboard } from './Keyboard';
import words from './wordList.json';

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter((letter) => !wordToGuess.includes(letter));
  const activeLetters = guessedLetters.filter((letter) => wordToGuess.includes(letter));

  const isLooser = incorrectLetters.length >= 6;
  const isWinner = [...wordToGuess].every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLooser || isWinner) {
        return;
      }
      setGuessedLetters((prev) => [...prev, letter]);
    },
    [guessedLetters, isLooser, isWinner],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) {
        return;
      }

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener('keypress', handler);

    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== 'Enter') {
        return;
      }
      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    document.addEventListener('keypress', handler);

    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, []);

  return (
    <div
      style={{
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        {isWinner && 'Congratulations! You won! - Refresh to try again'}
        {isLooser && 'You lost :( ! Good luck next time! - Refresh to try again'}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord reveal={isLooser} wordToGuess={wordToGuess} guessedLetters={guessedLetters} />
      <div style={{ alignSelf: 'stretch' }}>
        <Keyboard
          disabled={isLooser || isWinner}
          activeLetters={activeLetters}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
