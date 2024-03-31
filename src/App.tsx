import { Navigate, Route, Routes } from 'react-router-dom';
import { Space } from './pages/space';
import { Nav } from './components/UI/Nav';
import { Land } from './pages/land';
import { BuildPage } from './pages/car';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Navigate to={'/build'} />} />
        <Route path='/land' element={<Land />} />
        <Route path='/space' element={<Space />} />
        <Route path='/build' element={<BuildPage />} />
      </Routes>
    </>
  );
}

export default App;
