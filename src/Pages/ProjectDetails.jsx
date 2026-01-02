import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import Contact from './Contact';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const imageRefs = useRef([]);

  const project = portfolioData.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Clean up refs array to match current images length
    imageRefs.current = imageRefs.current.slice(0, project?.fullImages?.length || 0);

    // Small delay to ensure all refs are mounted
    const timer = setTimeout(() => {
      imageRefs.current.forEach((wrapper, index) => {
        if (wrapper) {
          // Set initial state
          gsap.set(wrapper, { height: 0, opacity: 0 });
          
          // Create individual ScrollTrigger
          gsap.to(wrapper, {
            height: 'auto',
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 85%',
              end: 'top 20%',
              scrub: 2,
              markers: false,
              id: `image-${index}`, // Add unique ID for debugging
            }
          });
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [project?.fullImages]);

  if (!project) {
    navigate('/work');
    return null;
  }

  return (
    <div className='min-h-screen  bg-light'>
      <div className='pt-30 grid md:grid-cols-3 gap-5 md:gap-8 md:px-40 px-10 font-montserrat'>
        {/* Hero Section */}
        <div
          className='flex justify-center relative'
          style={{ backgroundColor: project.color }}
        >
          <div className='container mx-auto md:w-90 md:h-60 h-40 bg-dark text-white pt-5 pl-5 '>
            <h1 className='text-xl md:text-2xl'>{project.title}</h1>
          </div>
        </div>

        {/* Description */}
        <div className='mb-20 md:pr-10 md:pt-0 pt-10'>
          <p className='text-xs md:text-[16px] md:w-100 leading-relaxed opacity-80'>{project.description}</p>
        </div>

        {/* Project Info Section */}
        <div className='pb-20'>
          <div className='border-l h-50 md:h-70'>
            <div className='container mx-auto md:px-8 px-5 font-montserrat'>
              <div className='grid grid-cols-1 lg:grid-cols-1 mb-20'>
                <div>
                  <p className='text-xs md:text-xl font-bold'>{project.year}</p>
                </div>
                <div>
                  <p className='text-xs md:text-xl font-bold'>{project.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Images Gallery */}
      <div className='space-y-15 md:space-y-100 bg-dark'>
        {project.fullImages.map((img, idx) => (
          <div 
            key={idx} 
            ref={el => {
              if (el) {
                imageRefs.current[idx] = el;
              }
            }}
            className='overflow-hidden'
          >
            <img
              src={img.src}
              alt={`Project ${idx + 1}`}
              className='w-full h-auto object-cover shadow-2xl'
            />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className='min-h-screen flex justify-between items-center bg-dark text-white'>
        <button
          onClick={() => {
            const currentIndex = portfolioData.findIndex(
              (p) => p.slug === slug
            );
            const nextProject =
              portfolioData[(currentIndex + 1) % portfolioData.length];
            navigate(`/work/${nextProject.slug}`);
          }}
          className='text-6xl md:text-8xl font-montserrat text-ce'
        >
          <h1 className='text-center'>
            Next{' '}
            <p className='font-redhat text-xl inline-flex'>{project.title}</p>
          </h1>
          <h1 className='md:pl-100 pl-30'>Project</h1>
          <video src=''></video>
        </button>
      </div>
      <Contact />
    </div>
  );
};

export default ProjectDetail;