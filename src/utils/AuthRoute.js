import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

const AuthRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state.auth }));

  return user ? children : <LoadingToRedirect />;
};

export default AuthRoute;
