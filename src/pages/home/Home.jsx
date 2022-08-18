import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from 'components/spinner/Spinner';
import NewsItem from 'components/newsItem/NewsItem';
import { getNews, reset } from 'features/news/newsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { news, isError, isLoading, message } = useSelector((state) => ({
    ...state.news,
  }));

  useEffect(() => {
    dispatch(getNews());
    isError && toast.error(message);

    return () => dispatch(reset());
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (news.length < 1) {
    return <h3>No News</h3>;
  }

  return (
    <div>
      <h1>Latest News</h1>
      {news.map((item) => {
        return <NewsItem key={item._id} {...item} />;
      })}
      {news.length > 0 && (
        <Link to={'/news'} className='btn-secondary'>
          View All News
        </Link>
      )}
    </div>
  );
};

export default Home;
