import GamesProvider, { GamesContext, GAMES } from '../context/GamesProvider';
import Puzzle from './Puzzle';
import Memotest from './Memotest';
import { useContext } from 'react';

const Game = ({ config }) => {
  const { game, difficulty } = config;

  if (game === GAMES.PUZZLE) {
    return <Puzzle difficulty={difficulty} />;
  } else if (game === GAMES.MEMOTEST) {
    return <Memotest difficulty={difficulty} />;
  }

  return <div>Invalid Game</div>;
};

const Games = () => {
  const { currentGame, level } = useContext(GamesContext);

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Games - Level {level}</div>
      </div>
      <div style={{ marginTop: 20 }}>
        <Game config={currentGame} />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <GamesProvider>
      <Games />
    </GamesProvider>
  );
};

export default App;
