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
      <div className='pt-30 grid md:grid-cols-3 gap-5 md:gap-8 md:px-40 px-10 font-montserrat'>
        {/* Hero Section */}
        <div
          className='flex justify-center relative'
          style={{ backgroundColor: project.color }}
        >
          <div className='container mx-auto w-70 h-40 bg-dark text-white pt-5 pl-5 '>
            <h1 className='text-xl md:text-2xl'>{project.title}</h1>
          </div>
        </div>

        {/* Description */}
        <div className='mb-20 md:pr-10 md:pt-0 pt-10'>
          <p className='text-[10px] md:text-md w-60 leading-relaxed'>{project.description}</p>
        </div>

        {/* Project Info Section */}
        <div className='pb-20'>
          <div className='border-l h-50 md:h-70'>
            <div className='container mx-auto md:px-8 px-5 font-montserrat'>
              <div className='grid grid-cols-1 lg:grid-cols-1 mb-20'>
                <div>
                  <p className='text-xs md:text-2xl font-bold'>{project.year}</p>
                </div>
                <div>
                  <p className='text-xs md:text-2xl font-bold'>{project.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Images Gallery */}
      <div className='space-y-5 md:space-y-50 bg-dark'>
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
      <div className='min-h-screen flex justify-between items-center'>
        <button
          onClick={() => {
            const currentIndex = portfolioData.findIndex(
              (p) => p.slug === slug
            );
            const nextProject =
              portfolioData[(currentIndex + 1) % portfolioData.length];
            navigate(`/work/${nextProject.slug}`);
          }}
          className='text-8xl font-montserrat'
        >
          <h1 className='text-center'>
            Next{' '}
            <p className='font-redhat text-xl inline-flex'>{project.title}</p>
          </h1>
          <h1 className='pl-100'>Project</h1>
          <video src=''></video>
        </button>
      </div>
    </div>
  );
};

export default ProjectDetail;
