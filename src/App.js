import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { loginInputs, registerInputs } from 'data';
import {
  About,
  Dashboard,
  EditNews,
  Home,
  Layout,
  Login,
  News,
  NotFound,
  Register,
  SharedLayout,
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
              <Route path=':slug' element={<SingleNews />} />
              <Route path='edit/:id' element={<EditNews />} />
            </Route>
            <Route path='auth' element={<SharedLayout />}>
              <Route
                path='login'
                element={<Login userInputs={loginInputs} />}
              />
              <Route
                path='register'
                element={<Register userInputs={registerInputs} />}
              />
              <Route path='dashboard' element={<Dashboard />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
