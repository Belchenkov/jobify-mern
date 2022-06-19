import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from 'react-router-dom';

import Landing from './pages/Landing';
import Register from './pages/Register';
import Error from './pages/Error';
import AllJobs from './pages/dashboard/AllJobs'
import Profile from './pages/dashboard/Profile';
import SharedLayout from './pages/dashboard/SharedLayout';
import Stats from './pages/dashboard/Stats';
import AddJob from './pages/dashboard/AddJob';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route
                  path='/'
                  element={
                      <ProtectedRoute>
                          <SharedLayout />
                      </ProtectedRoute>
                  }
              >
                  <Route index element={<Stats />} />
                  <Route path='all-jobs' element={<AllJobs />} />
                  <Route path='add-job' element={<AddJob />} />
                  <Route path='profile' element={<Profile />} />
              </Route>
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
