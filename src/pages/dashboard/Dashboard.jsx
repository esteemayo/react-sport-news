import { toast } from 'react-toastify';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from 'components/spinner/Spinner';
import { deleteNews, getUserNews, reset } from 'features/news/newsSlice';

import './dashboard.css';

const NewsDashboard = lazy(() =>
  import('components/newsDashboard/NewsDashboard')
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userNews, isError, message } = useSelector((state) => ({
    ...state.news,
  }));

  const handleDelete = (id) => {
    dispatch(deleteNews({ id, toast }));
  };

  useEffect(() => {
    dispatch(getUserNews());
    isError && toast.error(message);

    return () => dispatch(reset());
  }, [isError, message, dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
      <h3>My News</h3>
      <Suspense fallback={<Spinner />}>
        {userNews.map((item) => {
          return (
            <NewsDashboard key={item._id} {...item} onDelete={handleDelete} />
          );
        })}
      </Suspense>
    </div>
  );
};

export default Dashboard;
