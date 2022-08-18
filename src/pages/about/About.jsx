import PropTypes from 'prop-types';

const About = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>
        App to find out Sport news like Football, F1, Tennis, Cricket, Boxing,
        Golf etc
      </p>
    </div>
  );
};

About.defaultProps = {
  title: 'About',
};

About.propTypes = {
  title: PropTypes.string.isRequired,
};

export default About;
