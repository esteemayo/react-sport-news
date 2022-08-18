import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from 'components/spinner/Spinner';
import { getUserNews, reset } from 'features/news/newsSlice';
import NewsDashboard from 'components/newsDashboard/NewsDashboard';

import './dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userNews, isError, isLoading, message } = useSelector((state) => ({
    ...state.news,
  }));

  useEffect(() => {
    dispatch(getUserNews());
    isError && toast.error(message);

    return () => dispatch(reset());
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <h3>My News</h3>
      {userNews.map((item) => {
        return <NewsDashboard key={item._id} {...item} />;
      })}
    </div>
  );
};

export default Dashboard;
