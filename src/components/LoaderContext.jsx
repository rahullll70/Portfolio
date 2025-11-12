import { createContext, useContext, useState } from 'react';
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
