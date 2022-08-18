import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from 'components/spinner/Spinner';
import TextArea from 'components/textarea/TextArea';
import { uploadImage } from 'services/imageService';
import FormInput from 'components/formInput/FormInput';
import { createNews, reset } from 'features/news/newsSlice';

import './form.css';
import FormButton from 'components/formButton/FormButton';

const initialState = {
  name: '',
  detail: '',
  date: '',
  time: '',
};

const AddNews = ({ newsInputs }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isSuccess, isLoading, message } = useSelector((state) => ({
    ...state.news,
  }));

  const [file, setFile] = useState(null);
  const [values, setValues] = useState(initialState);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFieldCheck = Object.values(values).some((item) => item === '');

    if (emptyFieldCheck) {
      return toast.error('Please fill all input field');
    }

    const newsObj = {
      ...values,
    };

    if (file) {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'sports');

      const res = await uploadImage(data);
      const { url } = res.data;

      newsObj.image = url;
    }

    dispatch(createNews({ newsObj, toast }));
  };

  useEffect(() => {
    isError && toast.error(message);
    isSuccess && navigate('/auth/dashboard');

    return () => dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Link to='/news'>Go Back</Link>
      <h2>Add Sport News</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div className='grid'>
          {newsInputs.map((input) => {
            const { id, name, type, label } = input;
            return (
              <FormInput
                key={id}
                type={type}
                name={name}
                label={label}
                className={type === 'file' ? 'file' : null}
                onChange={(e) =>
                  type === 'file' ? setFile(e.target.files[0]) : handleChange(e)
                }
              />
            );
          })}
        </div>
        <TextArea
          name='detail'
          label='Detail'
          onChange={(e) => handleChange(e)}
        />

        <FormButton value='Add News' />
      </form>
    </div>
  );
};

AddNews.propTypes = {
  newsInputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
};

export default AddNews;
