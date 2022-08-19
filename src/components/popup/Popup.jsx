import { FaTimes } from 'react-icons/fa';
import './popup.css';

const Popup = ({ name, newsId, onClose, onDelete }) => {
  return (
    <div className='popup-overlay'>
      <div className='popup-wrapper'>
        <div className='popup-header'>
          <span>Delete News?</span>
          <FaTimes className='close-icon' onClick={() => onClose(true)} />
        </div>
        <div className='popup-body'>
          <p>Are you sure you want to delete the '{name}' news?</p>
        </div>
        <div className='popup-footer'>
          <button className='cancel-btn' onClick={() => onClose(true)}>
            Cancel
          </button>
          <button
            className='delete-btn'
            onClick={() => {
              onDelete(newsId);
              onClose(true);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
