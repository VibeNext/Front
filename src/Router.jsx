import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TopNavigation from './components/common/TopNavigation.jsx';
import TopNavigationBeforeLogin from './components/common/TopnNavigationBeforeLogin';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <div>
              <TopNavigationBeforeLogin />
              <TopNavigation />

              <h>kk</h>
              <h>kk</h>
              <h>kk</h>
              <h>kk</h>

              <h>kk</h>
              <h>kk</h>
              <h>kk</h>
              <h>kk</h>
              <h>kk</h>
              <h>kk</h>

              <h>kk</h>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
