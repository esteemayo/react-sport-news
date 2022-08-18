import { Link } from 'react-router-dom';
import './pagination.css';

const Pagination = ({ currentPage, numberOfPages }) => {
  const renderPagination = () => {
    if (currentPage === numberOfPages && currentPage === 1) return null;
    if (currentPage === 1) {
      return (
        <>
          <small>
            Page {currentPage} of {numberOfPages}
          </small>
          <Link
            to={`/news?page=${currentPage + 1}`}
            className='btn btn-secondary'
          >
            Next
          </Link>
        </>
      );
    } else if (currentPage !== numberOfPages) {
      return (
        <>
          <Link
            to={`/news?page=${currentPage - 1}`}
            className='btn btn-secondary'
          >
            Prev
          </Link>
          <small>
            Page {currentPage} of {numberOfPages}
          </small>
          <Link
            to={`/news?page=${currentPage + 1}`}
            className='btn btn-secondary'
          >
            Next
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link
            to={`/news?page=${currentPage - 1}`}
            className='btn btn-secondary'
          >
            Prev
          </Link>
          <small>
            Page {currentPage} of {numberOfPages}
          </small>
        </>
      );
    }
  };

  return <div className='wrapper'>{renderPagination()}</div>;
};

export default Pagination;
