import { Navigate, Route, Routes } from 'react-router-dom';
import { Space } from './pages/space';
import { Nav } from './components/UI/Nav';
import { Land } from './pages/land';
import { BuildPage } from './pages/car';
import { GhostPage } from './pages/Ghost';
import { PortalPage } from './pages/Portal';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Navigate to={'/space'} />} />
        <Route path='/land' element={<Land />} />
        <Route path='/space' element={<Space />} />
        <Route path='/build' element={<BuildPage />} />
        <Route path='/ghost' element={<GhostPage />} />
        <Route path='/portal' element={<PortalPage/>} />
      </Routes>
    </>
  );
}

export default App;
