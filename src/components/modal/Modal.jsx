import './modal.css';

const Modal = ({ title, onClose, children }) => {
  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='modal-header'>
          <button className='btn' onClick={() => onClose(false)}>
            Close
          </button>
        </div>
        {title && <div>{title}</div>}
        <div className='modal-body'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
