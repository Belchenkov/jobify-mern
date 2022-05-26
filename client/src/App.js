import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router-dom';

import Landing from './pages/Landing';
import Register from './pages/Register';
import Error from './pages/Error';
import Dashboard from './pages/Dashboard';

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route
                  path='/'
                  element={<Dashboard />}
              />
              <Route
                  path='/register'
                  element={<Register />}
              />
              <Route
                  path='/landing'
                  element={<Landing />}
              />
              <Route
                  path='*'
                  element={<Error />}
              />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
