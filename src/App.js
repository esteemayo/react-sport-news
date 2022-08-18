import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthRoute from 'utils/AuthRoute';
import ProtectedRoute from 'utils/ProtectedRoute';
import { loginInputs, newsInputs, registerInputs } from 'data';
import {
  About,
  AddNews,
  Dashboard,
  EditNews,
  Home,
  Layout,
  Login,
  News,
  NotFound,
  Register,
  SharedLayout,
  Search,
  SingleNews,
} from 'pages';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='news' element={<SharedLayout />}>
              <Route index element={<News />} />
              <Route path='search' element={<Search />} />
              <Route
                path='add'
                element={
                  <AuthRoute>
                    <AddNews newsInputs={newsInputs} />
                  </AuthRoute>
                }
              />
              <Route path=':slug' element={<SingleNews />} />
              <Route
                path='edit/:id'
                element={
                  <AuthRoute>
                    <EditNews />
                  </AuthRoute>
                }
              />
            </Route>
            <Route path='auth' element={<SharedLayout />}>
              <Route
                path='login'
                element={
                  <ProtectedRoute>
                    <Login userInputs={loginInputs} />
                  </ProtectedRoute>
                }
              />
              <Route
                path='register'
                element={
                  <ProtectedRoute>
                    <Register userInputs={registerInputs} />
                  </ProtectedRoute>
                }
              />
              <Route
                path='dashboard'
                element={
                  <AuthRoute>
                    <Dashboard />
                  </AuthRoute>
                }
              />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
