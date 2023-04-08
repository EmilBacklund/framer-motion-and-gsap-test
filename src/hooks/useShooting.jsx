import { useEffect } from 'react';

const useShooting = (gunRef, squareRef, setBullets) => {
  useEffect(() => {
    const shoot = (event) => {
      if (event.button !== 0) {
        return;
      }

      const gunRect = gunRef.current.getBoundingClientRect();
      const squareRect = squareRef.current.getBoundingClientRect();
      const centerX = gunRect.left + gunRect.width / 2 - squareRect.left;
      const centerY = gunRect.top + gunRect.height / 2 - squareRect.top;
      const mouseX = event.clientX - squareRect.left;
      const mouseY = event.clientY - squareRect.top;
      const angle =
        Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI);

      const newBullet = {
        x: centerX + squareRect.left,
        // 14 is the height of the bullet image and to make it look like it's coming out of the gun
        y: centerY + squareRect.top - 14,
        angle: angle,
      };
      setBullets((prevBullets) => [...prevBullets, newBullet]);
    };

    document.addEventListener('mousedown', shoot);

    return () => {
      document.removeEventListener('mousedown', shoot);
    };
  }, [gunRef, squareRef, setBullets]);
};

export default useShooting;
