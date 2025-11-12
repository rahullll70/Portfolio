import React, { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import HoverText from './HoverText';
import gsap from 'gsap';

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const audioElementRef = useRef(null);
  useEffect(() => {
    if (!audioElementRef.current) return;

    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  const [setActive, isSetActive] = useState('Home');
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: '#navbar',
      },
    });
    navTween.from('#navbar', {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power1.inOut',
      delay: 4,
    });
  }, []);

   return (
    <div
      id='navbar'
      className='z-50 rounded-lg px-3 py-2.5 md:px-4 md:py-3 flex items-center justify-center bg-dark w-auto fixed left-1/2 transform -translate-x-1/2 bottom-4 md:bottom-auto md:top-10'
    >
      <nav className='flex flex-row items-center gap-2 md:gap-4'>
        <button
          className='space-x-1 md:space-x-1.5 flex items-center hover:cursor-pointer flex-shrink-0'
          onClick={toggleAudioIndicator}
          aria-label="Toggle audio"
        >
          <audio ref={audioElementRef} src='/audio/sample-audio.mp3' loop />
          {[1, 2, 3, 4].map((bar) => (
            <div
              key={bar}
              className={`indicator-line ${isIndicatorActive ? 'active' : ''}`}
              style={{ animationDelay: `${bar * 0.1}s` }}
            />
          ))}
        </button>

        {/* Divider */}
        <div className='h-6 md:h-7 w-[1.1px] bg-white flex-shrink-0' />

        {/* Links */}
        <div className='flex flex-row gap-3 md:gap-6 text-[10px] md:text-xs font-montserrat items-center whitespace-nowrap'>
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className='relative text-light font-semibold group'
            >
              <HoverText mode="chars" className=''>
                {link.name}
              </HoverText>

              <span
                className={`absolute left-0 -bottom-1 h-[1px] bg-light transition-all duration-300 
                ${
                  location.pathname === link.path
                    ? 'w-full'
                    : 'w-0 group-hover:w-full'
                }`}
              ></span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;