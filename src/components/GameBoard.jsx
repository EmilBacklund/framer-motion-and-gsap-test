import { forwardRef } from 'react';

const GameBoard = forwardRef(({ children }, ref) => (
  <div
    ref={ref}
    className="bg-gray-900 h-screen w-full flex overflow-hidden relative"
  >
    {children}
  </div>
));

export default GameBoard;
