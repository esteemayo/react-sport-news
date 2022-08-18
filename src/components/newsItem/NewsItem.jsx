import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

import './newsItem.css';

const NewsItem = ({ name, slug, date, time, user, image }) => {
  return (
    <div className='news-item'>
      <div className='img'>
        <img
          src={image ? image : '/images/hero.jpg'}
          width={150}
          height={100}
          alt={name}
        />
      </div>
      <div className='info'>
        <span>
          <Moment format='yyyy-MM-DD'>{date}</Moment> {time}
        </span>
        <h3>{name}</h3>
        <p>
          <FaUser /> Posted By: <strong>{user.username}</strong>
        </p>
      </div>
      <div className='link'>
        <Link to={`/news/${slug}`} className='btn'>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default NewsItem;
