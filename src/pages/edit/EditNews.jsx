import moment from 'moment';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'components/modal/Modal';
import { editNews } from 'features/news/newsSlice';
import TextArea from 'components/textarea/TextArea';
import { getSportById } from 'services/sportService';
import FormInput from 'components/formInput/FormInput';
import FormButton from 'components/formButton/FormButton';
import ImageUpload from 'components/imageUpload/ImageUpload';

const initialState = {
  name: '',
  detail: '',
  date: '',
  time: '',
};

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { editNewsItem, isError, message } = useSelector((state) => ({
    ...state.news,
  }));

  const [singleNews, setSingleNews] = useState({});
  const [showmodal, setShowModal] = useState(false);
  const [values, setValues] = useState(initialState);
  const [imgPreview, setImgPreview] = useState(singleNews.image ?? null);

  const { name, date, time, detail } = values;

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emptyFieldCheck = Object.values(values).some((item) => item === '');

    if (emptyFieldCheck) {
      return toast.error('Please fill all input field');
    }

    const updatedNews = {
      ...values,
    };

    dispatch(editNews({ id, updatedNews, toast }));
    navigate(`/news/${singleNews.slug}`);
  };

  useEffect(() => {
    setImgPreview(singleNews.image);
    isError && toast.error(message);
  }, [id, singleNews, isError, message]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getSportById(id);
        const { name, detail, date, time } = data.sport;

        setValues({ name, detail, date, time });
        setSingleNews(data.sport);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  return (
    <div>
      <Link to='/news'>Go Back</Link>
      <h2>Edit Sport News</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div className='grid'>
          <FormInput
            type='text'
            name='name'
            label='Name'
            value={name}
            onChange={handleChange}
          />
          <FormInput
            type='date'
            name='date'
            label='Date'
            value={moment(date).format('yyyy-MM-DD')}
            onChange={handleChange}
          />
          <FormInput
            type='time'
            name='time'
            label='Time'
            value={time}
            onChange={handleChange}
          />
        </div>
        <TextArea
          name='detail'
          label='Detail'
          value={detail}
          onChange={handleChange}
        />

        <FormButton value='Update News' />
      </form>
      {imgPreview ? (
        <img className='img-preview' src={imgPreview} alt={editNewsItem.name} />
      ) : (
        <div>
          <p>No Image Available</p>
        </div>
      )}
      <div>
        <button className='btn-edit' onClick={() => setShowModal(true)}>
          Update Image
        </button>
      </div>
      {showmodal && (
        <Modal onClose={setShowModal}>
          <ImageUpload id={id} values={values} setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
};

export default EditNews;
