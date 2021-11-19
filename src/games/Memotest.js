import React, { useContext } from 'react';
import MemotestProvider, { MemotestContext } from '../context/MemotestProvider';
import { Row, Tile, Toolbar, Wrapper } from './Common';

const Memotest = () => {
  const { tiles, setTile, tries, reset, isFlipped } = useContext(MemotestContext);

  const rows = tiles.map((row, r) => (
    <Row key={r}>
      {row.map((tile, t) => (
        <Tile key={t} onClick={() => setTile(tile.index)} img={isFlipped(tile.index) ? tile.img : null} />
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

const MemotestGame = ({ difficulty }) => {
  return (
    <MemotestProvider difficulty={difficulty}>
      <Memotest />
    </MemotestProvider>
  );
};

export default MemotestGame;
