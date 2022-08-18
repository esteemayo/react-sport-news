import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { searchNews } from 'features/news/newsSlice';
import './search.css';

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      dispatch(searchNews(query));
      navigate(`/news/search?q=${query}`);
      setQuery('');
    } else {
      navigate('/');
    }
  };

  return (
    <div className='search'>
      <form onSubmit={handleSearch}>
        <input
          type='search'
          value={query}
          placeholder='Search News'
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Search;
