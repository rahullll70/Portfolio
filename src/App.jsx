import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoaderProvider } from './components/LoaderContext';

import Navbar from './components/Navbar';
import Cursor from './components/Cursor';

import Contact from './components/Contact';
import About from './Pages/About';
import Home from './Pages/Home';
import Work from './Pages/Work';





const App = () => {
  return (
    <LoaderProvider>
    <Router>
      <main className='relative w-screen overflow-x-hidden min-h-screen h-full overflow-y-auto cursor-default  '>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/work' element={<Work />} />
          <Route path='/about' element={<About />} />  
        </Routes>
        <Contact />
        <Cursor />
      </main>
    </Router>
    </LoaderProvider>
  );
};

export default App;
