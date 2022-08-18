import PropTypes from 'prop-types';

const FormButton = ({ value }) => {
  return <input type='submit' value={value} className='btn' />;
};

FormButton.defaultProps = {
  value: 'Add News',
};

FormButton.propTypes = {
  value: PropTypes.string.isRequired,
};

export default FormButton;
