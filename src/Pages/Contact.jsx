import { GoArrowDownRight } from 'react-icons/go';
import TextPressure from '../components/TextPressure';
import HoverText from '../components/HoverText';

const Contact = () => {
  const HoverLink = ({ href, children }) => (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='relative group w-fit flex items-center gap-1'
    >
      {children}
      <span className='absolute left-0 -bottom-0.5 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full'></span>
    </a>
  );

  return (
    <div className='bg-dark min-h-screen flex flex-col justify-between'>
      <TextPressure />
      <div className='text-white  font-montserrat text-sm md:text-xl '>
        <div className='flex flex-row justify-between pr-10 pl-10 mt-60 md:mt-0  '>
          <HoverLink
            href='https://www.linkedin.com/in/rahul-parihar-6aba79300/'
            className=''
          >
            <HoverText mode='chars'>- LinkedIn</HoverText>
            <GoArrowDownRight className='' />
          </HoverLink>

          <HoverLink href='https://x.com/rahulll_parihar'>
            <HoverText mode='chars'>- X / Twitter</HoverText>
            <GoArrowDownRight className='' />
          </HoverLink>
          <HoverLink href='https://github.com/rahullll70'>
            <HoverText mode='chars'>- GitHub</HoverText>
            <GoArrowDownRight />
          </HoverLink>
        </div>
        <div className='flex-center py-5'>
          <HoverLink href='mailto:r.prahulparihar70@gmail.com'>
            <HoverText mode='chars'>- r.prahulparihar70@gmail.com</HoverText>
            <GoArrowDownRight />
          </HoverLink>
        </div>
        <div className='pl-2 mt-43 md:text-xs text-[9px] opacity-60 bottom-0 top-0 md:mt-0 '>
          <p>Development by Rahul </p>
          <p>Music by Rahul</p>
          <p>©2025 Rahul</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
