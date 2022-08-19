import { toast } from 'react-toastify';
import { lazy, Suspense, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from 'components/spinner/Spinner';
import { getNews } from 'features/news/newsSlice';
import Pagination from 'components/pagination/Pagination';

import './news.css';

const NewsItem = lazy(() => import('components/newsItem/NewsItem'));

const News = () => {
  const { search } = useLocation();
  const page = search.split('=')[1];

  const dispatch = useDispatch();
  const { news, currentPage, numberOfPages, isError, message } = useSelector(
    (state) => ({
      ...state.news,
    })
  );

  useEffect(() => {
    dispatch(getNews(+page));
    isError && toast.error(message);
  }, [page, isError, message, dispatch]);

  if (news.length < 1) {
    return <h3>No News</h3>;
  }

  return (
    <>
      <Link to='/' className='back'>
        Go Back
      </Link>
      <Suspense fallback={<Spinner />}>
        {news.map((item) => {
          return <NewsItem key={item._id} {...item} />;
        })}
      </Suspense>
      {<Pagination currentPage={currentPage} numberOfPages={numberOfPages} />}
    </>
  );
};

export default News;
