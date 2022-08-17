import './footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='footer'>
      <p>Copyright &copy; Sport News {year}</p>
    </footer>
  );
};

export default Footer;
