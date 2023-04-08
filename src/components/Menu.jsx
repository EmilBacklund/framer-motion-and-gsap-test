import { gsap } from 'gsap';
import { useEffect, useState } from 'react';

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowMenu(!showMenu);
      }
    };

    console.log(showMenu);

    if (showMenu) {
      gsap.to('#menu', {
        duration: 0.5,
        opacity: 0.85,
        ease: 'back.out(1)',
      });

      gsap.to('.btn', {
        scale: 1,
        opacity: 1,
        delay: 0.5,
        ease: 'elastic.out(1, 0.3)',
        force3D: true,
        stagger: 0.2,
      });
    } else {
      gsap.to('#menu', {
        duration: 0.5,
        opacity: 0,
        ease: 'back.in(1)',
      });

      gsap.to('.btn', {
        opacity: 0,
        scale: 0.5,
        ease: 'back.in(1)',
        stagger: 0.1,
      });
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showMenu]);

  return (
    <div
      id="menu"
      className={`bg-[#111] ${
        !showMenu ? 'pointer-events-none' : ''
      } text-[#efefef] absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl opacity-0`}
    >
      <ul className="flex flex-col gap-6 font-signika trac font-bold text-center py-6 px-20 tracking-widest relative">
        <li
          onClick={() => setShowMenu(!showMenu)}
          className="btn scale-50 opacity-0 relative border border-transparent py-6 px-20 bg-[#262626] rounded-xl uppercase antialiased hover:bg-[#313131]"
        >
          Resume
        </li>
        <li className="btn scale-50 opacity-0 relative border border-transparent py-6 px-20 bg-[#262626] rounded-xl uppercase antialiased hover:bg-[#313131]">
          Options
        </li>
        <li className="btn scale-50 opacity-0 relative border border-transparent py-6 px-20 bg-[#262626] rounded-xl uppercase antialiased hover:bg-[#313131]">
          Bindings
        </li>
        <li className="btn scale-50 opacity-0 relative border border-transparent py-6 px-20 bg-[#262626] rounded-xl uppercase antialiased hover:bg-[#313131]">
          Quit
        </li>
      </ul>
    </div>
  );
};

export default Menu;
