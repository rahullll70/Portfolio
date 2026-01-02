import React from 'react';
import Contact from './Contact';

const About = () => {
  return (
    <main className='bg-light min-h-screen w-full'>
      <div className='text-center mt-30'>
        <h1 className='font-anton text-5xl'>
          WEB DESIGNER & WEB DEVELOPER BASED IN NEW DELHI
        </h1>
        <div className='font-montserrat flex flex-col items-center '>
          <p className='pt-10 w-250 py-10 opacity-80'>
            My name is Rahul, and I’m a Web Designer and Web Developer working
            and living in New Delhi, India. Born and raised here, my journey
            into the digital world began with a natural curiosity about how
            websites, interfaces, and online experiences come to life. What
            started as inspiration gradually grew into a passion that now shapes
            the work I do every day. Coming from a Commerce and BBA background,
            I eventually discovered that my creative instincts aligned far more
            with design and development, leading me down a path where I could
            build digital experiences that feel intentional and meaningful.
          </p>
          <p className='w-250 py-10 pb-20 opacity-80'>
            I am a self-taught minimalist designer, focused on crafting clean,
            functional, and thoughtfully structured web experiences. My design
            philosophy revolves around clarity and purpose — removing
            distractions, elevating what matters, and ensuring that every
            interaction feels intuitive. I firmly believe that great design goes
            beyond visuals; it solves problems, guides users, and communicates
            with ease. This user-centred mindset influences every layout I
            create, every spacing decision, and every detail I refine.Alongside
            design, I work as a full-stack web developer, allowing me to turn
            ideas into fully functional digital products. <br /> <br /> Over time, I have
            gained strong experience in React.js, Next.js, GSAP animations, and
            the MERN stack, enabling me to build modern, dynamic, and seamless
            websites. Being both a designer and developer helps me approach
            projects holistically — understanding not just how something should
            look, but how it should work and feel. My love for digital design
            began at a young age, inspired by the visual worlds of websites,
            games, and interfaces. Even though I initially explored formal
            academic paths, I soon realized that my true passion lies in
            creating impactful digital experiences, brands, and websites. This
            realization pushed me to refine my skills independently and pursue
            the craft with consistency and dedication. Over the course of my
            journey, I’ve had the chance to collaborate with individuals, small
            teams, and emerging brands — helping them translate ideas into
            refined, functional, and aesthetically balanced digital experiences. <br /> <br />
            Each project challenges me creatively and gives me the opportunity
            to grow, experiment, and improve. I primarily design using Figma and
            Adobe tools, and I bring concepts to life using Framer, Webflow,
            React, and Next.js. My approach remains rooted in minimalism,
            clarity, and purposeful storytelling — creating digital spaces that
            feel calm, modern, and intuitive. Although I’m early in my
            professional journey, I’m continually evolving, learning, and
            expanding my capabilities. My goal is simple: to keep building
            digital experiences that blend aesthetics with functionality and to
            work with people and brands who value thoughtful, meaningful
            design.
          </p>
        </div>
      </div>
      <Contact />
    </main>
  );
};

export default About;
