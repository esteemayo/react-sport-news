import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NewsItem from 'components/newsItem/NewsItem';
import { searchNews } from 'features/news/newsSlice';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search = () => {
  const dispatch = useDispatch();
  const { news } = useSelector((state) => ({ ...state.news }));

  const query = useQuery();
  const searchQuery = query.get('q');

  useEffect(() => {
    dispatch(searchNews(searchQuery));
  }, [dispatch, searchQuery]);

  if (news.length < 1) {
    return <h3>No search result for "{searchQuery}"</h3>;
  }

  return (
    <>
      <h1>Search Results for "{searchQuery}"</h1>
      {news.map((item) => {
        return <NewsItem key={item._id} {...item} />;
      })}
      <Link to='/' className='back'>
        Go Back
      </Link>
    </>
  );
};

export default Search;
