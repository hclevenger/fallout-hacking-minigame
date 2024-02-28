import { GameState } from "../utils";

interface UserInputProps {
  guessCount: number,
  guessLimit: number,
  guessLog: string[],
  password: string,
  setGameState: Function,
  setGuessCount: Function,
  setGuessLog: Function,
  wordLength: number,
  words: Set<string>,
}

export default function UserInput({
  guessCount,
  guessLimit,
  guessLog,
  password,
  setGameState,
  setGuessCount,
  setGuessLog,
  wordLength,
  words,
}: UserInputProps) {
  return (
    <input 
      // min={7}
      // max={7}
      onKeyDown={(e) => {
        if(e.key === "Enter") {
          const input = e.target as HTMLInputElement;
          handleGuess(
            input.value,
            guessCount,
            guessLimit,
            guessLog,
            password,
            setGameState,
            setGuessCount,
            setGuessLog,
            wordLength,
            words
          );
          (e.target as HTMLInputElement).value = '';
      }
    }} />
  )
}

function handleGuess(
  guess: string,
  guessCount: number,
  guessLimit: number,
  guessLog: string[],
  password: string,
  setGameState: Function,
  setGuessCount: Function,
  setGuessLog: Function,
  wordLength: number,
  words: Set<string>,
  ) {
  if(!words.has(guess)) {
    alert("Invalid guess!");
    return 0;
  }
  let numberOfMatchingChars = likeness(guess, password);
  const newGuessCount = guessCount + 1;
  setGuessCount(newGuessCount);
  if(numberOfMatchingChars === wordLength) {
    setGuessLog([...guessLog, guess, `Password Accepted.`]);
    alert(" You win! ");
    setGameState(GameState.WIN);
  }
  else if(newGuessCount >= guessLimit) {
    setGuessLog([...guessLog, guess, `Entry denied. Likeness = ${numberOfMatchingChars}`]);
    alert(" You lose!");
    setGameState(GameState.LOSE);
  }
  else {
    setGuessLog([...guessLog, guess, `Entry denied. Likeness = ${numberOfMatchingChars}`]);
  }
  return numberOfMatchingChars;
}

function likeness(guess: string, password: string) {
  let similarity = 0;
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === password[i]) {
      similarity++;
    }
  }
  return similarity;
}