import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Popup from 'components/popup/Popup';
import './newsDashboard.css';

const NewsDashboard = ({ _id: id, name, slug, onDelete }) => {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className='news-dashboard'>
      <h4>
        <Link to={`/news/${slug}`}>{name}</Link>
      </h4>
      <Link to={`/news/edit/${id}`}>
        <button className='btn-edit'>Edit News</button>
      </Link>
      <button className='btn-delete' onClick={() => setShowPopup(false)}>
        Delete News
      </button>
      {!showPopup && (
        <Popup
          name={name}
          newsId={id}
          onClose={setShowPopup}
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
