import React, { useState } from 'react';

export const GamesContext = React.createContext({});

export const GAMES = {
  PUZZLE: 'PUZZLE',
  MEMOTEST: 'MEMOTEST',
};

const LEVELS = [
  {
    game: GAMES.PUZZLE,
    difficulty: 2,
  },
  {
    game: GAMES.MEMOTEST,
    difficulty: 2,
  },
  {
    game: GAMES.PUZZLE,
    difficulty: 4,
  },
  {
    game: GAMES.MEMOTEST,
    difficulty: 4,
  },
];

const GamesProvider = ({ children }) => {
  const [level, setLevel] = useState(0);

  return (
    <GamesContext.Provider
      value={{
        level,
        currentGame: LEVELS[level],
        advanceLevel: () => setLevel(level + 1),
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};

export default GamesProvider;
