import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from 'components/spinner/Spinner';
import { getNews, reset } from 'features/news/newsSlice';

const NewsItem = lazy(() => import('components/newsItem/NewsItem'));

const Home = () => {
  const dispatch = useDispatch();
  const { news, isError, message } = useSelector((state) => ({
    ...state.news,
  }));

  useEffect(() => {
    dispatch(getNews());
    isError && toast.error(message);

    return () => dispatch(reset());
  }, [isError, message, dispatch]);

  if (news.length < 1) {
    return <h3>No News</h3>;
  }

  return (
    <div>
      <h1>Latest News</h1>
      <Suspense fallback={<Spinner />}>
        {news.map((item) => {
          return <NewsItem key={item._id} {...item} />;
        })}
      </Suspense>
      {news.length > 0 && (
        <Link to={'/news'} className='btn-secondary'>
          View All News
        </Link>
      )}
    </div>
  );
};

export default Home;
