import { useLoader } from '../components/LoaderContext';

import CurvedLoop from '../components/CurvedLoop';
import { GoArrowDownRight } from 'react-icons/go';
import HoverText from '../components/HoverText';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { tr } from 'motion/react-client';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { showLoader } = useLoader();
  const videoRef = useRef(null);
  const tlRef = useRef(null);

  const HoverLink = ({ href, children }) => {
    const isExternal = href?.startsWith('http') || href?.startsWith('mailto:');

    return (
      <a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className='relative group w-fit'
      >
        {children}
        <span className='absolute left-0 -bottom-0.5 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full'>
          {' '}
        </span>
      </a>
    );
  };

  // --- GSAP HERO SECTION ---
  useGSAP(() => {
    if (!showLoader) {
      const mainTl = gsap.timeline({
        delay: 0.1,
      });

      const heroSplit = new SplitText('.title', { type: 'chars, words' });
      gsap.set(heroSplit.chars, { yPercent: 100, opacity: 0 });
      gsap.set('#video', { height: 0, overflow: 'hidden', opacity: 0 });

      mainTl.to(heroSplit.chars, {
        opacity: 1,
        yPercent: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.03,
      });

      gsap.to(
        '#video',
        {
          height: '400px',
          opacity: 1,
          duration: 1,
          ease: 'power2.Out',
        },
        '<0.3'
      );
    }
  }, [showLoader]);

  // --- GSAP HERO SECTION SCROLL TRIGGER VIDEO ---
  useEffect(() => {
    if (showLoader) return;
    if (tlRef.current) tlRef.current.kill();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    const title = document.querySelector('.title');
    const isMobile = window.innerWidth < 768;

    tlRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
      },
    });

    if (isMobile) {
      // On mobile: no scaling, just fade out
      tlRef.current.to('#video', {
        y: '-25vh',
        ease: 'none',
      });
    } else {
      // On desktop: scale video to fullscreen
      tlRef.current.fromTo(
        '#video',
        {
          width: '700px',
          height: '400px',
        },
        {
          width: '100vw',
          height: '100vh',
          top: 0,
          left: 0,
          margin: 0,
          ease: 'none',
        }
      );
    }

    if (isMobile) {
      // On mobile:
      tlRef.current.to(
        '.title',
        {
          y: '-100%',
          opacity: 0,
          ease: 'power1.in',
        },
        0
      );
    } else {
      // On desktop:
      tlRef.current.to(
        '.title',
        {
          x: '-100%',
          opacity: 0,
          ease: 'power1.in',
        },
        0
      );
    }

    return () => {
      if (tlRef.current) tlRef.current.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [showLoader]);

  // --- GSAP WORK SECTION  ---
  useEffect(() => {
    gsap.set('#work-text', { y: 50, opacity: 0 });
    gsap.set('#featured-text', { y: -100, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#work-heading',
        start: 'top 80%',
        end: 'top 10%',
        scrub: 2,
      },
    });

    tl.to('#featured-text', {
      y: 0,
      opacity: 1,
      duration: 2,
      ease: 'power2.inOut',
      delay: 0.1,
    }).to('#work-text', {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power1.inOut',
      delay: 0.5,
    });
  });

  // --- GSAP WORK SECTION PROJECT ANIMATION  ---
  useEffect(() => {
    gsap.set('#project-features', { height: '0' });
    gsap.set('#project-text', { y: 100, opacity: 0 });
   
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#project-features',
        scrub: 2,
      },
    });
    tl.to('#project-features', {
      scale: 1,
      height: '100%',
      width: '100%',
      duration: 1,
      ease: 'power2.out',
      delay: 0.1,
    }),
      tl.to('#project-text', {
        y: 0,
        duration: 1,
        opacity: 1,
        ease: 'power2.out',
      })
      
  });


  // --- GSAP ABOUT ME SECTION  ---
  useEffect(() => {   
    gsap.set('#aboutMe-text', { y: 50, opacity: 1 });
    gsap.set('#aboutMe-subHeading-text', { y: 80, opacity: 1 });
    gsap.set('#aboutMe-description', { y: 60, opacity: 1 });

    const tl = gsap.timeline({   
      scrollTrigger: {
        trigger: '#aboutMe-heading',
        start: 'top 80%',
        end: 'top 10%',
        scrub: 2 ,
        markers: true,
      },
    });

    tl.to(
      '#aboutMe-text',
      {
        y: 0,
        opacity: 1,
        duration: 2.5,
        ease: 'power2.out',
      },
      '-=1.5'
    )
      .to(
        '#aboutMe-subHeading-text',
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: 'power2.out',
        },
        '-=1'
      )
      .to(
        '#aboutMe-description',
        {
          y: 0,
          opacity: 1,
          duration: 2,
          ease: 'power2.out',
        },
        '-=1.2'
      );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <main className='relative w-screen overflow-x-hidden min-h-screen'>
        {/*                                                             HOME                                                                    */}
        <section
          id='home'
          className='md:items-center grid min-h-screen bg-light px-1 md:px-0'
        >
          <div className='font-bold font-rothefight w-full md:w-fit uppercase md:text-[140px] px-0.5 md:px-10'>
            <div
              className={`title overflow-hidden space-y-60 ${
                showLoader ? 'invisible' : ''
              }`}
            >
              <h1 className='text-7xl md:text-8xl lg:text-9xl h-fit md:leading-55 leading-35 mt-10 md:mt-15'>
                Creative <br />
                Design
                <span className='text-2xl md:text-4xl lg:text-5xl'>And</span>
                <br />
                Experience
              </h1>
            </div>
          </div>
          <div className='flex-center md:items-start md:justify-end w-full h-80 md:h-0'>
            <div
              ref={videoRef}
              id='video'
              className={`relative md:fixed bottom-10 w-fit mt-8 md:mt-0 md:top-45 md:right-0 md:mr-10 md:w-186  ${
                showLoader ? 'invisible' : ''
              }`}
              style={{
                minHeight: '100px',
              }}
            >
              <video
                src='/videos/video.mp4'
                autoPlay
                muted
                loop
                playsInline
                className='px-0.5 md:px-0 w-full h-fit object-cover block md:py-0 py-20'
              />
            </div>
          </div>
        </section>

        {/*                                                              WORK                                                                    */}

        <section id='work' className='min-h-screen w-full bg-dark text-white'>
          <div
            id='work-heading'
            className='font-anton flex-center flex-col py-30 px-10'
          >
            <p
              id='featured-text'
              className='font-montserrat text-[10px] md:text-sm mt-10 md:mt-10'
            >
              Featured
            </p>
            <div className='flex justify-between items-center'>
              <h1
                id='work-text'
                className='text-8xl md:text-9xl uppercase text-center px-3 md:px-20 font-montserrat'
              >
                Work
              </h1>
            </div>
          </div>
          <div className='h-fit flex-col space-y-50 px-3 md:px-5 py-10 '>
            <div className='w-full h-fit grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-3'>
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className='relative overflow-hidden group cursor-pointer aspect-[4/3] bg-neutral-900'
                >
                  {/* Main background image - centered and sized */}
                  <div
                    id='project-features'
                    className='absolute inset-0 flex items-center justify-center'
                  >
                    <img
                      src={`/images/mockup_${item}.jpg`}
                      alt={`Project mockup ${item}`}
                      className='object-contain transition-transform duration-500'
                    />
                  </div>
                  {/* Blur overlay */}
                  <div className='absolute inset-0 grayscale hover:grayscale-0 ease-in backdrop-blur-0 group-hover:backdrop-blur-sm transition-[backdrop-filter] duration-500'></div>

                  {/* Hover content (optional - add button or additional info) */}
                  <div className='absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                    <button className='px-8 py-3 bg-white text-black font-semibold transition-colors'>
                      View Project
                    </button>
                    <div className='bottom-0 absolute py-5 w-full px-4'>
                      <p
                        id='project-text'
                        className='uppercase font-montserrat text-[10px] md:text-sm text-center translate-y-full '
                      >
                        art direction and web design
                      </p>
                      <GoArrowDownRight className='absolute bottom-5 right-4 text-2xl' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <CurvedLoop
              marqueeText=' explore more projects  ―  explore more projects  ―  '
              speed={3}
              curveAmount={0}
              direction='right'
              interactive={true}
              className='custom-text-style'
            />
          </div>
          <di id='btn-projects' className='flex-center py-30 font-montserrat md:text-4xl text-xl'>
            <HoverLink href='/work'>
              <button className='uppercase cursor-pointer'>
                <HoverText mode='chars' className=''>
                  more Project
                </HoverText>
              </button>
            </HoverLink>
          </di>
        </section>

        {/*                                                              ABOUT                                                                    */}

        <section id='aboutMe-section' className='bg-light min-h-screen w-full'>
          <div
            id='aboutMe-heading'
            className='flex justify-center items-center py-30 px-10'
          >
            <h1
              id='aboutMe-text'
              className='text-8xl md:text-9xl uppercase text-center font-montserrat'
            >
              about me
            </h1>
          </div>

          <div id='content-container' className='text-center capitalize py-10 font-montserrat'>
            <h1
              id='aboutMe-subHeading-text'
              className='md:text-6xl text-[20px] font-bold'
            >
              A minimalist web designer crafting <br />
              timeless digital spaces that <br />
              inspire and engage
            </h1>
            <p
              id='aboutMe-description'
              className='py-5 md:py-10 text-neutral-600 md:text-sm text-[10px]'
            >
              I specialize in creating clean, user-friendly designs that balance{' '}
              <br />
              beauty with function — helping brands tell their story with
              clarity, <br />
              purpose, and emotion. Every website I craft is built to feel{' '}
              <br />
              effortless, communicate value, and leave a lasting impression.
            </p>
          </div>
          <div className='flex-center font-montserrat py-30'>
            <HoverLink href='/about' className=''>
              <button className='uppercase md:text-4xl text-xl cursor-pointer'>
                <HoverText mode='chars'>learn more</HoverText>
              </button>
            </HoverLink>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
