import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate('/auth/login');
    return () => clearTimeout(timeout);
  }, [count, navigate]);

  return (
    <div className='loading-to-redirect'>
      <h5>Redirecting you in {count} seconds</h5>
    </div>
  );
};

export default LoadingToRedirect;
