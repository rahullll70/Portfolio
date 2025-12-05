import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = portfolioData.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    navigate('/work');
    return null;
  }

  return (
    <div className='min-h-screen  bg-light'>
      <div className='pt-30 grid grid-cols-3'>
        {/* Hero Section */}
        <div
          className='flex justify-center relative font-montserrat'
          style={{ backgroundColor: project.color }}
        >
          <div className='container mx-auto w-80 h-50 bg-dark text-white pt-5 pl-5'>
            <h1 className={`text-2xl `}>{project.title}</h1>
          </div>
        </div>

        {/* Description */}
        <div className='w-80 mb-20'>
          <p className='text-md text-gray-700 leading-relaxed'>
            {project.description}
          </p>
        </div>
        {/* Project Info Section */}
        <div className='pb-20'>
          <div className='border-l h-70'>
            <div className='container mx-auto px-8 font-montserrat'>
              <div className='grid grid-cols-1 lg:grid-cols-1 mb-20'>
                <div>
                  <p className='text-xl font-bold'>{project.year}</p>
                </div>
                <div>
                  <p className='text-xl font-bold'>{project.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Images Gallery */}
      <div className='space-y-12 bg-dark'>
        {project.fullImages.map((img, idx) => (
          <div key={idx} className='animate-[fadeInUp_0.8s_ease-out]'>
            <img
              src={img.src}
              className='w-full h-auto object-cover shadow-2xl'
            />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className= 'min-h-screen flex justify-between items-center'>
        <button
          onClick={() => navigate('/work')}
          className='text-xl hover:underline'
        >
          ← Back to All Projects
        </button>

        <button
          onClick={() => {
            const currentIndex = portfolioData.findIndex(
              (p) => p.slug === slug
            );
            const nextProject =
              portfolioData[(currentIndex + 1) % portfolioData.length];
            navigate(`/work/${nextProject.slug}`);
          }}
          className='text-xl hover:underline'
        >
          Next Project →
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;
