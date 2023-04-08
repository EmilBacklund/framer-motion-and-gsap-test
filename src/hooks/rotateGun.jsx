import { useEffect } from 'react';

const useRotateGun = (gunRef) => {
  useEffect(() => {
    let currentAngle = 0;
    let currentFlip = 1;
    let isMouseDown = false;

    const handleMouseMove = (event) => {
      const rect = gunRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      currentAngle =
        Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI);

      currentFlip = currentAngle > 90 || currentAngle < -90 ? -1 : 1;

      const scaleValue = isMouseDown ? 0.85 : 1;

      gunRef.current.style.transform = `rotate(${currentAngle}deg) scaleY(${currentFlip}) scale(${scaleValue})`;
    };

    const handleMouseDown = () => {
      isMouseDown = true;
      gunRef.current.style.transform = `rotate(${currentAngle}deg) scaleY(${currentFlip}) scale(0.85)`;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      gunRef.current.style.transform = `rotate(${currentAngle}deg) scaleY(${currentFlip}) scale(1)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
};

export default useRotateGun;
