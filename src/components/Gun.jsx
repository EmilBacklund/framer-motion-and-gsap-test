import useRotateGun from '../hooks/rotateGun';
import { useRef } from 'react';
import useWeaponChange from '../hooks/useWeaponChange';
import useShooting from '../hooks/useShooting';

const Gun = ({
  squareRef,
  setBullets,
  enemies,
  setEnemies,
  bulletRefsMap,
  setBulletRefsMap,
}) => {
  const gunRef = useRef(null);
  useRotateGun(gunRef);
  useShooting(
    gunRef,
    squareRef,
    setBullets,
    enemies,
    setEnemies,
    bulletRefsMap,
    setBulletRefsMap
  );

  const weapon = useWeaponChange();

  const weaponImages = {
    revolver: '/images/revolver.svg',
    smg: '/images/smg.png',
    shotgun: '/images/shotgun.svg',
    // Add more weapon image paths here
  };

  return (
    <>
      <div
        className={`absolute top-2/3 left-1/2 -translate-x-1/2 select-none -translate-y-1/2  ${
          weapon === 'shotgun' ? 'w-2/3' : 'w-1/2'
        }`}
      >
        <img
          ref={gunRef}
          className={`w-full transition-transform duration-75 revolver ${weapon}`}
          src={weaponImages[weapon]}
        />
      </div>
    </>
  );
};

export default Gun;