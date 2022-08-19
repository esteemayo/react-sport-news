import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Popup from 'components/popup/Popup';
import './newsDashboard.css';

const NewsDashboard = ({ _id: id, name, slug, onDelete }) => {
  const [closePopup, setClosePopup] = useState(true);

  return (
    <div className='news-dashboard'>
      <h4>
        <Link to={`/news/${slug}`}>{name}</Link>
      </h4>
      <Link to={`/news/edit/${id}`}>
        <button className='btn-edit'>Edit News</button>
      </Link>
      <button className='btn-delete' onClick={() => setClosePopup(false)}>
        Delete News
      </button>
      {!closePopup && (
        <Popup
          name={name}
          newsId={id}
          onClose={setClosePopup}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

NewsDashboard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NewsDashboard;
