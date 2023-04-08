import { useState, useEffect } from 'react';

const useWeaponChange = () => {
  const [weapon, setWeapon] = useState('revolver');

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case '1':
          setWeapon('revolver');
          break;
        case '2':
          setWeapon('smg');
          break;
        case '3':
          setWeapon('shotgun');
          break;
        // Add more cases for other weapons here
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return weapon;
};

export default useWeaponChange;
