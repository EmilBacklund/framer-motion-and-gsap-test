import React from 'react';

const Enemy = React.forwardRef(({ x, y }, ref) => {
  const enemyStyle = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
  };

  return (
    <div
      ref={ref}
      style={enemyStyle}
      className="bg-red-500 w-12 h-12 rounded-full"
    ></div>
  );
});

export default Enemy;
