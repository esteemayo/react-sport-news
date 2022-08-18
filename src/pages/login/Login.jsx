import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Spinner from 'components/spinner/Spinner';
import FormInput from 'components/formInput/FormInput';
import FormButton from 'components/formButton/FormButton';
import { loginUser, reset } from 'features/auth/authSlice';

import './login.css';

const Login = ({ userInputs }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => ({ ...state.auth })
  );

  const [values, setValues] = useState(null);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const credentials = {
      ...values,
    };

    dispatch(loginUser({ credentials, toast }));
  };

  useEffect(() => {
    isError && toast.error(message);
    user && isSuccess && navigate('/auth/dashboard');

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='auth'>
      <h1>
        <FaUser /> Login
      </h1>
      <form onSubmit={handleSubmit}>
        {userInputs.map((input) => {
          const { id, type, name, label, placeholder } = input;
          return (
            <FormInput
              key={id}
              type={type}
              name={name}
              label={label}
              placeholder={placeholder}
              onChange={handleChange}
            />
          );
        })}
        <FormButton value='Login' />
      </form>
      <p>
        Don't have an account? <Link to='/auth/register'>Register</Link>
      </p>
    </div>
  );
};

Login.propTypes = {
  userInputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired,
    })
  ),
};

export default Login;
