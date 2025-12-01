import React, { useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';

const ProjectRow = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);

  return (
    <div
      className='grid grid-cols-1 md:grid-cols-12 border-t border-black opacity-0 animate-[fadeInUp_0.1s_ease-out_forwards] relative overflow-hidden font-montserrat'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${project.id * 0.15}s`,
      }}
    >
      {/* Full row overlay */}
      <div
        
        className={`absolute w-full inset-0 bg-black pointer-events-none z-10 transition-all duration-500 ${
          isHovered ? 'translate-y-0' : '-translate-y-full'
        }`}
      ></div>

      {/* Left side - Project info */}
      <div
        className={`md:col-span-5 ${project.color} p-8 flex flex-col justify-between min-h-[400px] border-black transition-all duration-500 relative z-20 `}
      >
        <div>
          <h2
            className={`text-5xl font-bold mb-6 transition-colors duration-500 ${
              isHovered ? 'text-white' : 'text-black'
            }`}
          >
            {project.title}
          </h2>
          <div className='space-y-2'>
            {project.tags.map((tag, idx) => (
              <div
                key={idx}
                className={`text-md transition-colors duration-500 ${
                  isHovered ? 'text-gray-200' : 'text-black'
                }`}
              >
                #{tag}
              </div>
            ))}
          </div>
          <GoArrowUpRight className={`absolute right-5 bottom-5 text-4xl ${isHovered ? 'text-white' : 'text-black'}`} />
        </div>
      </div>

      {/* Right side - Image grid */}
      <div className='md:col-span-7 grid grid-cols-4 auto-rows-min gap-0.5 relative z-20 py-1'>
        {project.images.map((img, idx) => (
          <div
            key={idx}
            className={`bg-black border-r border-b border-black overflow-hidden cursor-pointer transition-all duration-300 hover:z-30 hover:bg-dark relative group ${
              img.type === 'wide' ? 'col-span-2' : 'col-span-1'
            } ${img.aspect === 'portrait' ? 'row-span-2' : 'row-span-1'}`}
            style={{
              minHeight: img.aspect === 'portrait' ? '400px' : '200px',
            }}
            onMouseEnter={() => setHoveredImage(idx)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <img
              src={img.src}
              alt={`${project.title} - Image ${idx + 1}`}
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 '
            />
            {/* Individual image hover overlay */}
            <div
              className={`absolute inset-0 bg-[#111519] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectRow;
