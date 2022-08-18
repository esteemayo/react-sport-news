import { ToastContainer } from 'react-toastify';
import { Outlet, useLocation } from 'react-router-dom';

import Hero from 'components/hero/Hero';
import Header from 'components/header/Header';
import Footer from 'components/footer/Footer';
import ScrollToTop from 'components/scrollToTop/ScrollToTop';

import 'react-toastify/dist/ReactToastify.css';
import './layout.css';

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <ToastContainer />
      {pathname === '/' && <Hero />}
      <ScrollToTop />
      <div className='container'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
