import { FaArrowUp } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import './scroll.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    window.pageYOffset > 250 ? setIsVisible(true) : setIsVisible(false);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    document.addEventListener('scroll', toggleVisibility);

    return () => document.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className='scroll'>
      {isVisible && (
        <div className='scroll-icon' onClick={handleScrollToTop}>
          <FaArrowUp />
        </div>
      )}
    </div>
  );
};

export default ScrollToTop;
