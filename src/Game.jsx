import { useRef, useState } from 'react';
import Square from './components/Square';
import GameBoard from './components/GameBoard';
import Gun from './components/Gun';
import useMovement from './hooks/useMovement';
import Menu from './components/Menu';
import BulletsContainer from './components/BulletsContainer';

const Game = () => {
  const square = useRef();
  const container = useRef();
  const stepX = useRef(0);
  const stepY = useRef(0);

  useMovement(square, container, stepX, stepY);

  const [bullets, setBullets] = useState([]);

  return (
    <>
      <GameBoard ref={container}>
        <Menu />
        <Square ref={square}>
          <Gun squareRef={square} setBullets={setBullets} />
        </Square>
        <BulletsContainer bullets={bullets} />
      </GameBoard>
    </>
  );
};

export default Game;
