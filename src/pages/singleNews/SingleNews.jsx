import { useEffect } from 'react';
import Moment from 'react-moment';
import { Link, useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Spinner from 'components/spinner/Spinner';
import { getSingleNews, reset } from 'features/news/newsSlice';
import DisqusThread from 'components/disqusThread/DisqusThread';

import './singleNews.css';

const SingleNews = () => {
  const { pathname } = useLocation();
  const slug = pathname.split('/')[2];

  const dispatch = useDispatch();
  const { singleNews, isError, isLoading, message } = useSelector((state) => ({
    ...state.news,
  }));

  useEffect(() => {
    dispatch(getSingleNews(slug));
    isError && toast.error(message);

    return () => dispatch(reset());
  }, [isError, message, dispatch, slug]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className='single-news'>
        <Link to='/news' className='back'>
          Go Back
        </Link>
        <br />
        <span>
          <Moment format='yyyy-MM-DD'>{singleNews.date}</Moment>{' '}
          {singleNews.time}
        </span>
        <p>
          <FaUser /> Posted By: <strong>{singleNews?.user?.username}</strong>
        </p>
        <h1>{singleNews.name}</h1>
        <div className='image'>
          <img
            src={singleNews.image ? singleNews.image : '/images/hero.jpg'}
            alt={singleNews.name}
          />
        </div>
        <p>{singleNews.detail}</p>
      </div>
      <DisqusThread
        id={slug}
        title={singleNews.name}
        path={`/news/${singleNews.slug}`}
      />
    </>
  );
};

export default SingleNews;
