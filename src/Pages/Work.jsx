import React from 'react';
import { portfolioData } from '../data/portfolioData';
import ProjectRow from '../components/ProjectRow';

const allProjects = () => {
  return (
    <div className='min-h-screen'>
      <div className='flex pl-10 pt-20 font-anton'>
        <h1 className='text-9xl font-bold'>ALL WORK</h1>
      </div>
      <div className='container mx-auto px-0'>
        <div className='min-h-screen pt-10 pb-2'>
          <div className='px-0 mx-auto space-y-0'>
            {portfolioData.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}

            {/* Bottom border */}
            <div className=' border-black'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default allProjects;
