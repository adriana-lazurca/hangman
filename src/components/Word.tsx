type WordProps = { reveal?: boolean; wordToGuess: string; guessedLetters: string[] };

export const Word = ({ reveal = false, wordToGuess, guessedLetters }: WordProps) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.20em',
        fontSize: '5rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontFamily: 'monospace',
      }}
    >
      {[...wordToGuess].map((letter, index) => (
        <span style={{ borderBottom: '0.1em solid black' }} key={index}>
          <span
            style={{
              visibility: guessedLetters.includes(letter) || reveal ? 'visible' : 'hidden',
              color: reveal || !guessedLetters.includes(letter) ? 'red' : 'black',
            }}
          >
            {letter}
          </span>
        </span>
      ))}
    </div>
  );
};
