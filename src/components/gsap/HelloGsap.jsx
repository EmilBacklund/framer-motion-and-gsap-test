import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

const HelloGsap = () => {
  const [counter, setCounter] = useState(0);
  // createRef is like useRef but mostly used for class components
  const header = React.createRef();

  // the parameter set the current to "hej", if it's empty current will be undefined
  const square = React.useRef('hej');

  const handleClick = () => {
    setCounter(counter + 1);
  };

  // We have access to out DOM elements here
  // useEffect runs on every render of the component
  useEffect(() => {
    gsap.to(header.current, { color: '#8c0', duration: 2 });

    gsap.to(square.current, { duration: 1, x: counter * 99, y: 100 });
    // the square.current is set to the styling
    console.log('inne', square, counter);
  }, [header, square]);

  return (
    <>
      <h1 className="text-9xl" ref={header}>
        Hello
      </h1>
      <div className="container mx-auto">
        <div ref={square} className="w-20 h-20 bg-blue-500"></div>
        {/* The console log inside of the useEffect is logged on every click */}
        <button onClick={handleClick}>{counter}</button>
      </div>
    </>
  );
};

export default HelloGsap;
