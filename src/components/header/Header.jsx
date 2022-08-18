import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Search from 'components/search/Search';
import { setLogout } from 'features/auth/authSlice';
import './header.css';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Sport News</Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link to='/news'>News</Link>
          </li>
          {user && (
            <>
              <li>
                <Link to='/news/add'>Add News</Link>
              </li>
              <li>
                <Link to='/auth/dashboard'>Dashboard</Link>
              </li>
            </>
          )}
          <li>
            <Link to='/about'>About</Link>
          </li>
          {user ? (
            <button className='btn-secondary' onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <li>
              <Link to='/auth/login' className='btn-secondary'>
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
