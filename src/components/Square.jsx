import { forwardRef } from 'react';

const Square = forwardRef((props, ref) => (
  <div ref={ref} className="w-1/12 h-1/6 bg-blue-500 rounded-full relative">
    {props.children}
  </div>
));

export default Square;
