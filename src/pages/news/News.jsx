import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from 'components/spinner/Spinner';
import { getNews } from 'features/news/newsSlice';
import NewsItem from 'components/newsItem/NewsItem';
import Pagination from 'components/pagination/Pagination';

import './news.css';

const News = () => {
  const { search } = useLocation();
  const page = search.split('=')[1];

  const dispatch = useDispatch();
  const { news, currentPage, numberOfPages, isError, isLoading, message } =
    useSelector((state) => ({
      ...state.news,
    }));

  useEffect(() => {
    dispatch(getNews(+page));
    isError && toast.error(message);
  }, [page, isError, message, dispatch]);

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
      {<Pagination currentPage={currentPage} numberOfPages={numberOfPages} />}
    </>
  );
};

export default News;
