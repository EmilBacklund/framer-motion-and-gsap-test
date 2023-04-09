import { useRef, useState, useEffect } from 'react';
import React from 'react';
import Square from './components/Square';
import GameBoard from './components/GameBoard';
import Gun from './components/Gun';
import useMovement from './hooks/useMovement';
import Menu from './components/Menu';
import BulletsContainer from './components/BulletsContainer';
import Enemy from './components/Enemy';

const Game = () => {
  const square = useRef();
  const container = useRef();
  const stepX = useRef(0);
  const stepY = useRef(0);

  useMovement(square, container, stepX, stepY);

  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [bulletRefsMap, setBulletRefsMap] = useState({});
  const [enemyRefs, setEnemyRefs] = useState([]);

  useEffect(() => {
    const generateEnemy = () => {
      const x = Math.random() * container.current.clientWidth;
      const y = Math.random() * container.current.clientHeight;

      const newEnemyRef = React.createRef();
      setEnemyRefs((prevRefs) => [...prevRefs, newEnemyRef]);
      setEnemies((prevEnemies) => [...prevEnemies, { x, y, ref: newEnemyRef }]);
    };

    const enemyGenerator = setInterval(generateEnemy, 2000);

    return () => {
      clearInterval(enemyGenerator);
    };
  }, [container]);

  return (
    <>
      <GameBoard ref={container}>
        <Menu />
        <Square ref={square}>
          <Gun
            enemies={enemies}
            setEnemies={setEnemies}
            squareRef={square}
            setBullets={setBullets}
            bulletRefsMap={bulletRefsMap}
            setBulletRefsMap={setBulletRefsMap}
          />
        </Square>
        {enemies.map((enemy, index) => (
          <Enemy key={index} x={enemy.x} y={enemy.y} ref={enemy.ref} />
        ))}
        <BulletsContainer bullets={bullets} bulletRefsMap={bulletRefsMap} />
      </GameBoard>
    </>
  );
};

export default Game;
