import { useRef } from 'react';
import Square from './components/Square';
import GameBoard from './components/GameBoard';
import Gun from './components/Gun';
import useMovement from './hooks/useMovement';
import Menu from './components/Menu';

const Game = () => {
  const square = useRef();
  const container = useRef();
  const stepX = useRef(0);
  const stepY = useRef(0);

  useMovement(square, container, stepX, stepY);

  return (
    <>
      <GameBoard ref={container}>
        <Menu />
        <Square ref={square}>
          <Gun />
        </Square>
      </GameBoard>
    </>
  );
};

export default Game;
