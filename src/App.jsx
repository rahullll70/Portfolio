import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoaderProvider } from './components/LoaderContext';

import Navbar from './components/Navbar';
import Cursor from './components/Cursor';

import Home from './Pages/Home';
import Work from './Pages/Work';
import About from './Pages/About';
import Contact from './Pages/Contact';
import ProjectDetail from './Pages/ProjectDetails';

const App = () => {
  return (
    <Router>
      <LoaderProvider>
        <main className='relative w-screen overflow-x-hidden min-h-screen h-full overflow-y-auto cursor-default bg-light'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/work' element={<Work />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} /> {/* Add as route */}
            <Route path='/work/:slug' element={<ProjectDetail />} />
          </Routes>
          <Cursor />
        </main>
      </LoaderProvider>
    </Router>
  );
};

export default App;
