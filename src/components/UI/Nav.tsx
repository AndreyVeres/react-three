import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <div style={{ position: 'absolute', right: 0, left: 0, display: 'flex', justifyContent: 'center', zIndex: 999, gap: '30px' }}>
      <Link style={{ color: '#fff' }} to={'/build'}>
        build
      </Link>
      <Link style={{ color: '#fff' }} to={'/space'}>
        SPACE
      </Link>
      <Link style={{ color: '#fff' }} to={'/land'}>
        LAND
      </Link>

      {/* <Link style={{ color: '#fff' }} to={'/portal'}>
        PORTAL
      </Link> */}
    </div>
  );
};
