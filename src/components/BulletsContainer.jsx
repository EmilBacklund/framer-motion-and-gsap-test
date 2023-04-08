import Bullets from './Bullets';

const BulletsContainer = ({ bullets }) => {
  return (
    <>
      {bullets.map((bullet, index) => (
        <Bullets key={index} x={bullet.x} y={bullet.y} angle={bullet.angle} />
      ))}
    </>
  );
};

export default BulletsContainer;
