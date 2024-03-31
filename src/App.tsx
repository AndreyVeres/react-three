import { Navigate, Route, Routes } from 'react-router-dom';
import { Space } from './pages/space';
import { Nav } from './components/UI/Nav';
import { Land } from './pages/land';
import { BuildPage } from './pages/car';
import { GhostPage } from './pages/Ghost';
import { PortalPage } from './pages/Portal';
import { MedievalPage } from './pages/medieval/page';
import { Suspense } from 'react';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Suspense fallback={null}>
          <Route path='/' element={<Navigate to={'/build'} />} />
          <Route path='/land' element={<Land />} />
          <Route path='/space' element={<Space />} />
          <Route path='/build' element={<BuildPage />} />
          <Route path='/ghost' element={<GhostPage />} />
          <Route path='/portal' element={<PortalPage />} />
          <Route path='/med' element={<MedievalPage />} />
        </Suspense>
      </Routes>
    </>
  );
}

export default App;
