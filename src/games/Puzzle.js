import React, { useContext } from 'react';
import PuzzleProvider, { PuzzleContext } from '../context/PuzzleProvider';
import { Row, Tile, Toolbar, Wrapper } from './Common';

const Puzzle = () => {
  const { tiles, setTile, tries, reset } = useContext(PuzzleContext);

  const rows = tiles.map((row, r) => (
    <Row key={r}>
      {row.map((tile, t) => (
        <Tile key={t} onClick={() => setTile(tile.index)} img={tile.img} style={tile.style} />
      ))}
    </Row>
  ));

  return (
    <Wrapper>
      {rows}
      <Toolbar tries={tries} reset={reset} />
    </Wrapper>
  );
};

const PuzzleGame = ({ difficulty }) => {
  return (
    <PuzzleProvider difficulty={difficulty}>
      <Puzzle />
    </PuzzleProvider>
  );
};

export default PuzzleGame;
