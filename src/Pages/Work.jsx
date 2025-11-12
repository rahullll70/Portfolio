
import HoverText from '../components/HoverText';
import CurvedLoop from '../components/CurvedLoop';

const Work = () => {
  const HoverLink = ({ href, children }) => (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='relative group w-fit'
    >
      {children}
      <span className='absolute left-0 -bottom-0.5 w-0 h-[1px] bg-current transition-all duration-300 group-hover:w-full'></span>
    </a>
  );

  return (
    <div className='min-h-screen w-screen bg-dark text-white'>
      <div className='font-bold text-8xl uppercase px-7 py-10 font-anton'>
        <h1>all Work</h1>
      </div>
      <div className='h-410 flex-col space-y-50 px-10 py-35'>
        <div className='w-full h-290 grid grid-cols-2 gap-5 p-8'>
          {/* Image 1 with hover effect */}
          <div className='relative overflow-hidden group h-full'>
            <img
              src='/images/mockup_1.jpg'
              alt='Project mockup'
              className='w-full transition-transform duration-500'
            />
            <div className='absolute inset-0 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500'></div>
            
          </div>

          {/* Image 2 */}
          <div className='relative overflow-hidden group'>
            <img
              src='/images/mockup_2.jpg'
              alt='Project mockup'
              className='w-full transition-transform duration-500'
            />
            <div className='absolute inset-0 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500'></div>
          </div>

          {/* Image 3 */}
          <div className='relative overflow-hidden group'>
            <img
              src='/images/mockup_3.jpg'
              alt='Project mockup'
              className='w-full transition-transform duration-500'


            />
            <div className='absolute inset-0 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500'></div>
          </div>

          {/* Image 4 */}
          <div className='relative overflow-hidden group'>
            <img
              src='/images/mockup_4.jpg'
              alt='Project mockup'
              className='w-full transition-transform duration-500'
            />
            <div className='absolute inset-0 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500'></div>
          </div>
        </div>
        <CurvedLoop
          marqueeText=' explore more projects  ―  explore more projects  ―  '
          speed={2}
          curveAmount={0}
          direction='right'
          interactive={true}
          className='custom-text-style'
        />
      </div>
      <div className='flex-center py-30 font-montserrat text-4xl'>
        <HoverLink>
          <button className='uppercase cursor-pointer'>
            <HoverText mode='chars' className=''>
              more Project
            </HoverText>
          </button>
        </HoverLink>
      </div>
    </div>
  );
};

export default Work;
