import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from 'components/spinner/Spinner';
import { getNews } from 'features/news/newsSlice';
import NewsItem from 'components/newsItem/NewsItem';

import './news.css';

const News = () => {
  const dispatch = useDispatch();
  const { news, isError, isLoading, message } = useSelector((state) => ({
    ...state.news,
  }));

  useEffect(() => {
    dispatch(getNews());
    isError && toast.error(message);
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (news.length < 1) {
    return <h3>No News</h3>;
  }

  return (
    <>
      <Link to='/' className='back'>
        Go Back
      </Link>
      {news.map((item) => {
        return <NewsItem key={item._id} {...item} />;
      })}
    </>
  );
};

export default News;
