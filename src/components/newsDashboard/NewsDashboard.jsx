import { Link } from 'react-router-dom';
import './newsDashboard.css';

const NewsDashboard = ({ _id: id, name, slug, onDelete }) => {
  return (
    <div className='news-dashboard'>
      <h4>
        <Link to={`/news/${slug}`}>{name}</Link>
      </h4>
      <Link to={`/news/edit/${id}`}>
        <button className='btn-edit'>Edit News</button>
      </Link>
      <button className='btn-delete' onClick={() => onDelete(id)}>
        Delete News
      </button>
    </div>
  );
};

export default NewsDashboard;
