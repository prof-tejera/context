import { chunk, shuffle } from 'lodash';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { GamesContext } from './GamesProvider';

export const PuzzleContext = React.createContext({});

const DIFFICULTY = 4;
const IMAGE = 'https://images.unsplash.com/file-1635810851773-3defff69fe00image';

const PuzzleProvider = ({ difficulty = DIFFICULTY, children }) => {
  const { advanceLevel } = useContext(GamesContext);
  const [tries, setTries] = useState(0);
  const [tiles, setTiles] = useState(null);

  useEffect(() => {
    // Already generated
    if (tiles) return;

    const positions = [];

    // Generate order
    for (let p = 0; p < difficulty * difficulty; p++) {
      positions.push(p);
    }

    const shuffled = shuffle(positions);

    // Generate tiles
    setTiles(
      shuffled.map((p, i) => ({
        index: p,
        img: IMAGE,
      })),
    );
  }, [setTiles, tiles, difficulty]);

  const reset = useCallback(() => {
    setTries(0);
    setTiles(null);
  }, [setTiles, setTries]);

  useEffect(() => {
    if (!tiles) return;

    const isWin = !tiles.some((t, i) => t.index !== i);

    // TODO: Check if win
    if (isWin) {
      setTimeout(advanceLevel, 3000);
    }
  }, [reset, tiles, advanceLevel]);

  return (
    <PuzzleContext.Provider
      value={{
        tries,
        tiles: chunk(tiles, difficulty).map(row => {
          return row.map(tile => {
            const r = Math.floor(tile.index / difficulty);
            const c = tile.index % difficulty;

            return {
              ...tile,
              img: tile.index === 0 ? null : tile.img,
              style: {
                backgroundSize: `${100 * difficulty}%`,
                backgroundPosition: `${100 * c}% ${100 * r}%`,
                margin: 0,
                borderRadius: 0,
              },
            };
          });
        }),
        reset,
        setTile: clickedIndex => {
          if (clickedIndex === 0) return;

          const newTiles = [...tiles];

          const emptyTileIndex = newTiles.findIndex(t => t.index === 0);
          const clickedTileIndex = newTiles.findIndex(t => t.index === clickedIndex);

          const emptyTileItem = { ...newTiles[emptyTileIndex] };

          newTiles[emptyTileIndex] = newTiles[clickedTileIndex];
          newTiles[clickedTileIndex] = emptyTileItem;

          setTiles(newTiles);
          setTries(tries + 1);
        },
      }}
    >
      {children}
    </PuzzleContext.Provider>
  );
};

export default PuzzleProvider;
