import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CounterLoader from './CounterLoader';

const LoaderContext = createContext();

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within LoaderProvider');
  }
  return context;
};

export const LoaderProvider = ({ children }) => {
  const [showLoader, setShowLoader] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const location = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const hideLoader = () => {
    setShowLoader(false);
    setTimeout(() => {
      setAnimationComplete(true);
    }, 150);
  };

  const triggerLoader = () => {
    setShowLoader(true);
    setAnimationComplete(false);
  };

  // Trigger loader on route change (except initial load)
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    // Trigger loader for route changes
    triggerLoader();
  }, [location.pathname]);

  return (
    <LoaderContext.Provider
      value={{ showLoader, animationComplete, hideLoader, triggerLoader }}
    >
      {showLoader && <CounterLoader onComplete={hideLoader} />}
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderContext;