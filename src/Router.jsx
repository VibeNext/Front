import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage.jsx';
import LearningStepPage from './pages/LearningStepPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import MissionPage_01 from './pages/MissionPage_01.jsx';
import MissionPage_02 from './pages/MissionPage_02.jsx';
import MissionPage_03 from './pages/MissionPage_03.jsx';
import MyPage from './pages/mypage.jsx';
import SignUpPage from './pages/SignUppage.jsx';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/mypage' element={<MyPage />} />

        {/* 학습 단계 목록 */}
        <Route path='/learningstep' element={<LearningStepPage />} />
        {/* Step 01 (순차) */}
        <Route
          path='/step/1/mission/:missionId'
          element={<MissionPage_01 key={window.location.pathname} />}
        />

        {/* Step 02 (조건) */}
        <Route
          path='/step/2/mission/:missionId'
          element={<MissionPage_02 key={window.location.pathname} />}
        />

        {/* Step 03 (반복) */}
        <Route
          path='/step/3/mission/:missionId'
          element={<MissionPage_03 key={window.location.pathname} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
