import React, { useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

const ProjectRow = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/work/${project.slug}`);
  }

  return (
    <div
      className='grid grid-cols-1 md:grid-cols-12 border-t border-black opacity-0 animate-[fadeInUp_0.1s_ease-out_forwards] relative overflow-hidden font-montserrat cursor-pointer'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        animationDelay: `${project.id * 0.15}s`,
        opacity: 1,
      }}
    >
      {/* Full row overlay - hidden on mobile */}
      <div
        className={`hidden md:block absolute w-full inset-0 bg-black pointer-events-none z-10 transition-all duration-500 ${
          isHovered ? 'translate-y-0' : '-translate-y-full'
        }`}
      ></div>

      {/* Left side - Project info */}
      <div
        className={`col-span-1 md:col-span-5 ${project.color} p-6 md:p-8 flex flex-col justify-between min-h-[150px] md:min-h-[400px] border-black transition-all duration-500 relative z-20`}
      >
        <div>
          <h2
            className={`text-3xl md:text-5xl font-bold mb-4 md:mb-6 transition-colors duration-500 ${
              isHovered ? 'md:text-white' : 'text-black'
            }`}
          >
            {project.title}
          </h2>
          <div className='space-y-1 md:space-y-2'>
            {project.tags.map((tag, idx) => (
              <div
                key={idx}
                className={`text-xs md:text-md transition-colors duration-500 ${
                  isHovered ? 'md:text-gray-200' : 'text-black'
                }`}
              >
                #{tag}
              </div>
            ))}
          </div>
          <GoArrowUpRight
            className={`absolute right-4 md:right-5 top-6 md:top-auto md:bottom-5 text-2xl md:text-4xl transition-colors duration-500 ${
              isHovered ? 'md:text-white' : 'text-black'
            }`}
          />
        </div>
      </div>

      {/* Right side - Image grid */}
      <div className='col-span-1 md:col-span-7 relative z-20 overflow-x-auto md:overflow-x-visible scrollbar-hide'>
        <div className='flex gap-0.5 md:grid md:grid-cols-4 md:auto-rows-[200px] py-1'>
          {project.images.map((img, idx) => (
            <div
              key={idx}
              className={`bg-black overflow-hidden cursor-pointer transition-all duration-300 hover:z-30 hover:bg-dark relative group flex-shrink-0  border-black
          ${
            img.type === 'wide'
              ? 'w-[380px] md:w-full md:col-span-2'
              : 'w-[190px] md:w-full md:col-span-1'
          }
          ${
            img.aspect === 'portrait'
              ? 'h-[380px] md:h-full md:row-span-2'
              : 'h-[190px] md:h-full md:row-span-1'
          }`}
              onMouseEnter={() => setHoveredImage(idx)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <img
                src={img.src}
                alt={`${project.title} - Image ${idx + 1}`}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
              />
              {/* Individual image hover overlay */}
              <div
                className={`absolute inset-0 bg-[#111519] opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectRow;