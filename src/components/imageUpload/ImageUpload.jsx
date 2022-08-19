import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { editNews } from 'features/news/newsSlice';
import { uploadImage } from 'services/imageService';
import FormInput from 'components/formInput/FormInput';
import FormButton from 'components/formButton/FormButton';

import '../../pages/add/form.css';

const ImageUpload = ({ id, values, setShowModal }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'sports');

    try {
      const res = await uploadImage(data);
      const { url } = res.data;

      const updatedNews = {
        ...values,
        image: url,
      };

      dispatch(editNews({ id, updatedNews, toast }));
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='form'>
      <h4>Upload Sport News Image</h4>
      <form onSubmit={handleSubmit}>
        <FormInput
          type='file'
          className='file'
          onChange={(e) => setFile(e.target.files[0])}
        />

        <FormButton value='Upload' />
      </form>
    </div>
  );
};

export default ImageUpload;
