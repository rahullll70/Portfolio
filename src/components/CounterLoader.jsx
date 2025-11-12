import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CounterLoader = ({
  onComplete,
  bgColor = 'bg-[#242423]',
  textColor = 'text-white',
}) => {
  const [count, setCount] = useState(0);
  const loaderRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete(); 
      },
    },);

    const counter = { value: 0 };

    // === Phase 1: 0 → 20 (slow)
    tl.to(counter, {
      value: 20,
      duration: 1.5,
      ease: 'power1.out',
      onUpdate: () => setCount(Math.round(counter.value)),
    });

    // === Phase 2: 20 →56 (fast)
    tl.to(counter, {
      value: 56,
      duration: 1.5,
      ease: 'power4.inOut',
      onUpdate: () => setCount(Math.round(counter.value)),
    });

    // === Phase 3: 56 → 100 (smooth + slower)
    tl.to(counter, {
      value: 100,
      duration: 1.5,
      ease: 'power4.out',
      onUpdate: () => setCount(Math.round(counter.value)),
    });

    // Slide loader out after count finishes
    tl.to(loaderRef.current, {
      y: '-100%',
      duration: 1,
      ease: 'power4.inOut',
    }, "-=0.5");
  }, []);

  return (
    <div
      ref={loaderRef}
      className={`fixed inset-0 z-[100] ${bgColor} flex items-center justify-center min-h-screen md:w-full md:h-full`}
    >
      <div
        ref={textRef}
        className={`text-4xl md:text-8xl font-bold font-montserrat ${textColor}`}
      >
        {count}%
      </div>
    </div>
  );
};

export default CounterLoader;
