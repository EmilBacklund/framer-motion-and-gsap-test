import Bullets from './Bullets';

const BulletsContainer = ({ bullets, bulletRefsMap }) => {
  return (
    <>
      {bullets.map((bullet) => (
        <Bullets
          bulletRefsMap={bulletRefsMap}
          key={bullet.id}
          id={bullet.id}
          x={bullet.x}
          y={bullet.y}
          angle={bullet.angle}
        />
      ))}
    </>
  );
};

export default BulletsContainer;
