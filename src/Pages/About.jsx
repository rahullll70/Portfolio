import React from 'react';
import HoverText from '../components/HoverText';

const About = () => {
  const HoverLink = ({ href, children }) => (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='relative group w-fit'
    >
      {children}
      <span className='absolute left-0 -bottom-0.5 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full'></span>
    </a>
  );

  return (
    <main className='bg-light min-h-screen w-full'>
      <div className='text-center capitalize py-50 mt-30 font-montserrat'>
        <h1 className='text-6xl font-bold'>
          A minimalist web designer crafting <br />
          timeless digital spaces that <br />
          inspire and engage
        </h1>
        <p className='py-10 text-neutral-600 text-sm'>
          I specialize in creating clean, user-friendly designs that balance{' '}
          <br />
          beauty with function — helping brands tell their story with clarity,{' '}
          <br />
          purpose, and emotion. Every website I craft is built to feel <br />
          effortless, communicate value, and leave a lasting impression.
        </p>
      </div>
      <div className='flex-center font-montserrat py-30'>
        <HoverLink className=''>
          <button className='uppercase text-4xl cursor-pointer'>
            <HoverText mode='chars'>learn more</HoverText>
          </button>
        </HoverLink>
      </div>
    </main>
  );
};

export default About;
