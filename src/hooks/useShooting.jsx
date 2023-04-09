import { useEffect } from 'react';
import React from 'react';

const useShooting = (
  gunRef,
  squareRef,
  setBullets,
  enemies,
  setEnemies,
  bulletRefsMap,
  setBulletRefsMap
) => {
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
        y: centerY + squareRect.top - 14,
        angle: angle,
        id: Date.now(),
      };
      setBullets((prevBullets) => {
        const newBulletRef = React.createRef();
        setBulletRefsMap((prevRefsMap) => ({
          ...prevRefsMap,
          [newBullet.id]: newBulletRef,
        }));
        return [...prevBullets, { ...newBullet, ref: newBulletRef }];
      });
    };

    document.addEventListener('mousedown', shoot);

    return () => {
      document.removeEventListener('mousedown', shoot);
    };
  }, [gunRef, squareRef, setBullets]);

  useEffect(() => {
    const checkCollision = () => {
      setBullets((prevBullets) =>
        prevBullets.filter((bullet) => {
          const bulletRef = bulletRefsMap[bullet.id];
          if (!bulletRef || !bulletRef.current) {
            console.log('no ref');
            return true;
          }

          const bulletRect = bulletRef.current.getBoundingClientRect();

          for (const enemy of enemies) {
            const enemyRect = enemy.ref.current.getBoundingClientRect();

            const deltaX = bulletRect.x - enemyRect.x;
            const deltaY = bulletRect.y - enemyRect.y;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < (bulletRect.width + enemyRect.width) / 2) {
              setEnemies((prevEnemies) =>
                prevEnemies.filter((e) => e !== enemy)
              );
              console.log('hit');
              return false;
            }
          }
          console.log('miss');
          return true;
        })
      );
    };

    const collisionCheckInterval = setInterval(checkCollision, 100);

    return () => {
      clearInterval(collisionCheckInterval);
    };
  }, [enemies, setEnemies, setBullets, bulletRefsMap]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBullets((prevBullets) =>
        prevBullets.filter((bullet) => {
          const bulletRef = bulletRefsMap[bullet.id];
          if (!bulletRef || !bulletRef.current) {
            delete bulletRefsMap[bullet.id];
            return false;
          }
          if (bulletRef.current.dataset.finished === 'true') {
            if (bulletRef.current.parentElement) {
              bulletRef.current.parentElement.removeChild(bulletRef.current);
            }
            delete bulletRefsMap[bullet.id];
            return false;
          }
          return true;
        })
      );
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [bulletRefsMap]);
};

export default useShooting;
