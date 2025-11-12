import { useRef } from "react";
import gsap from "gsap";

const HoverText = ({ children, className = "", mode = "chars" }) => {
  const containerRef = useRef(null);

  const handleHover = () => {
    const targets = containerRef.current.querySelectorAll(".letter");

    gsap.to(targets, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      stagger: 0.02,
      onComplete: () => {
        gsap.set(targets, { y: 20, opacity: 0 });
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          stagger: 0.02,
        });
      },
    });
  };

  // Split text into letters or words safely
  const renderSplitText = () => {
    if (mode === "words") {
      return children.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-1">
          <span className="letter inline-block">{word}</span>
        </span>
      ));
    } else if (mode === "chars") {
      return children.split("").map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className="letter inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ));
    } else {
      return children;
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleHover}
      className={`flex-row md:flex-row ${className}`}
    >
      {renderSplitText()}
    </span>
  );
};

export default HoverText;
