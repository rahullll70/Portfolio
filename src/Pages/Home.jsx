import { useLoader } from '../components/LoaderContext';
import CurvedLoop from '../components/CurvedLoop';
import { GoArrowUpRight } from 'react-icons/go';
import HoverText from '../components/HoverText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';


gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { showLoader } = useLoader();
  const videoRef = useRef(null);
  const tlRef = useRef(null);
  const cleanupFnsRef = useRef([]);
  const navigate = useNavigate();
  const handleClick = (itemId) => {
    navigate(`/work/project-${itemId}`);
  };

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
        <span className='absolute left-0 -bottom-0.5 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full' />
      </a>
    );
  };

  // --- GSAP HERO SECTION ---
  useGSAP(() => {
    if (!showLoader) {
      const mainTl = gsap.timeline({ delay: 0.1 });
      const heroSplit = new SplitText('.title', { type: 'chars, words' });

      gsap.set(heroSplit.chars, { yPercent: 100, opacity: 0 });
      gsap.set('#video', { height: 0, overflow: 'hidden', opacity: 0 });

      mainTl
        .to(heroSplit.chars, {
          opacity: 1,
          yPercent: 0,
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.03,
        })
        .to(
          '#video',
          {
            height: '400px',
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          },
          '<0.3'
        );
    }
  }, [showLoader]);

  // --- GSAP HERO SECTION SCROLL TRIGGER VIDEO ---
  useEffect(() => {
    if (showLoader) return;

    // Kill existing animations
    if (tlRef.current) tlRef.current.kill();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const isMobile = window.innerWidth < 768;

    tlRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    if (isMobile) {
      tlRef.current
        .to('#video', { y: '-25vh', ease: 'none' })
        .to('.title', { y: '-100%', opacity: 0, ease: 'power1.in' }, 0);
    } else {
      tlRef.current
        .fromTo(
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
        )
        .to('.title', { x: '-100%', opacity: 0, ease: 'power1.in' }, 0);
    }

    return () => {
      if (tlRef.current) tlRef.current.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [showLoader]);

  // --- GSAP WORK SECTION ---
  useEffect(() => {
    if (showLoader) return;

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
    }).to(
      '#work-text',
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power1.inOut',
      },
      '+=0.5'
    );

    return () => tl.kill();
  }, [showLoader]);

  // --- GSAP WORK SECTION PROJECT ANIMATION ---
  useEffect(() => {
    if (showLoader) return;

    gsap.set('#project-features', { height: '0' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#project-features',
        scrub: 2,
      },
    });

    tl.to('#project-features', {
      height: '100%',
      duration: 1,
      ease: 'power2.out',
    });

    return () => tl.kill();
  }, [showLoader]);

  // --- GSAP WORK SECTION PROJECT HOVER ANIMATION ---
  useEffect(() => {
    if (showLoader) return;

    gsap.set('.hover-video', { opacity: 0, scale: 0 });
    gsap.set('.hover-text', { y: 100, opacity: 0 });

    const cards = document.querySelectorAll('.project-card');

    cards.forEach((card) => {
      const video = card.querySelector('.hover-video');
      const text = card.querySelector('.hover-text');

      const tl = gsap.timeline({ paused: true });

      tl.to(
        video,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        0
      ).to(
        text,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        0.2
      );

      const handleMouseEnter = () => tl.play();
      const handleMouseLeave = () => tl.reverse();

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      cleanupFnsRef.current.push(() => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
        tl.kill();
      });
    });

    return () => {
      cleanupFnsRef.current.forEach((fn) => fn());
      cleanupFnsRef.current = [];
    };
  }, [showLoader]);

  // --- GSAP ABOUT ME SECTION ---
useEffect(() => {
  if (showLoader) return;

  // Set initial states
  gsap.set('#aboutMe-heading', { y: 150, opacity: 0 });
  gsap.set('#aboutMe-subHeading-text', { x: -200, opacity: 0 });
  gsap.set('#aboutMe-description', { x: 200, opacity: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#aboutMe-section',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1.5,
    },
  });

  tl.to('#aboutMe-heading', {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: 'power3.out',
  })
    .to('#aboutMe-subHeading-text', {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.5')
    .to('#aboutMe-description', {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    }, '-=1');

  return () => tl.kill();
}, [showLoader]);


  return (
    <main className='relative w-screen overflow-x-hidden min-h-screen'>
      {/* HOME SECTION */}
  <section
  id='home'
  className='relative md:items-center flex flex-col md:grid h-180 bg-light px-1 md:px-0 pb-0 mb-0'
>
  <div className='font-bold font-rothefight w-full md:w-fit uppercase md:text-[140px] px-0.5 md:px-10 mb-0'>
    <div
      className={`title overflow-hidden ${
        showLoader ? 'invisible' : ''
      }`}
    >
      <h1 className='text-7xl md:text-8xl lg:text-9xl h-fit md:leading-55 leading-35 mt-10 md:mt-15 mb-0'>
        Creative <br />
        Design
        <span className='text-2xl md:text-4xl lg:text-5xl'>And</span>
        <br />
        Experience
      </h1>
    </div>
  </div>
  <div className='flex-center md:items-start md:justify-end w-full md:h-0 mb-0 pb-0'>
    <div
      ref={videoRef}
      id='video'
      className={`relative md:fixed w-full md:w-186 mt-8 md:mt-0 md:top-45 md:right-0 md:mr-10 mb-0 pb-0 ${
        showLoader ? 'invisible' : ''
      }`}
      style={{ minHeight: '100px' }}
    >
      <video
        src='/videos/website-video-2.mp4'
        autoPlay
        muted
        loop
        playsInline
        className='w-full h-auto object-cover block ease-in-out duration-100'
      />
    </div>
  </div>
</section>

      {/* WORK SECTION */}
      <section
        id='work'
        className='min-h-screen w-full bg-dark text-white -mt-2 pt-0'
      >
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
        <div  className='h-fit flex-col space-y-50 px-3 md:px-5 py-10'>
          <div onClick={() => handleClick(item)}  className='w-full h-fit grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-3'>
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className='project-card relative overflow-hidden group cursor-pointer aspect-[4/3] bg-neutral-900'
              >
                <div
                href='/'
                  id='project-features'
                  className='absolute inset-0 flex items-center justify-center'
                >
                  <img
                    src={`/images/mockup_${item}.jpg`}
                    alt={`Project mockup ${item}`}
                    className='object-contain transition-transform duration-500'
                    loading='lazy'
                  />
                </div>
                <div className='absolute inset-0 grayscale hover:grayscale-0 ease-in backdrop-blur-0 group-hover:backdrop-blur-sm transition-[backdrop-filter] duration-500' />
                <div  className='absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                  <video
                    className='hover-video px-8 py-3 text-black font-semibold w-120 transition-colors z-10'
                    src={`/videos/website-video-${item}.mp4`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload='none'
                  />
                  <div className='hover-text bottom-0 absolute py-5 w-full px-4'>
                    <p className='uppercase font-montserrat text-[10px] md:text-sm text-center'>
                      art direction and web design
                    </p>
                    <GoArrowUpRight className='absolute bottom-5 right-4 text-2xl' />
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
        <div
          id='btn-projects'
          className='flex-center py-30 font-montserrat md:text-4xl text-xl'
        >
          <HoverLink href='/work'>
            <button className='uppercase cursor-pointer'>
              <HoverText mode='chars'>more Project</HoverText>
            </button>
          </HoverLink>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id='aboutMe-section' className='bg-light min-h-screen w-full'>
        <div className='flex justify-between px-2 py-10 font-montserrat text-4xl'>
          <span className='flex'>⁎</span>
          <span className='flex'>⁎</span>
        </div>
        <div className='py-40'>
          <div
            id='aboutMe-heading'
            className='flex justify-center items-center py-10 px-10'
          >
            <h1 className='text-8xl md:text-3xl uppercase text-center font-montserrat'>
              about me
            </h1>
          </div>

          <div
            id='content-container'
            className='text-center capitalize py-10 font-montserrat overflow-x-hidden'
          >
            <p
              id='aboutMe-subHeading-text'
              className='md:text-6xl text-[20px] font-bold'
            >
              A minimalist web designer crafting <br />
              timeless digital spaces that <br />
              inspire and engage
            </p>
            <p
              id='aboutMe-description'
              className='py-5 md:py-10 text-neutral-800 md:text-sm text-[10px]'
            >
              I specialize in creating clean, user-friendly designs that balance{' '}
              <br />
              beauty with function helping brands tell their story with
              clarity, <br />
              purpose, and emotion. Every website I craft is built to feel{' '}
              <br />
              effortless, communicate value, and leave a lasting impression.
            </p>
          </div>
        </div>  
        <div className='flex-center font-montserrat py-30'>
          <HoverLink href='/about'>
            <button className='uppercase md:text-4xl text-xl cursor-pointer'>
              <HoverText mode='chars'>learn more</HoverText>
            </button>
          </HoverLink>
        </div>
        <div className='flex justify-between px-2 py-10 font-montserrat text-4xl'>
          <span className='flex'>⁎</span>
          <span className='flex'>⁎</span>
        </div>
      </section>
    </main>
  );
};

export default Home;
