import { useContext } from 'react';
import { BlogContext } from './BlogProvider';
import { Link } from 'react-router-dom';

const Nav = () => {
  const { currentUser, logout } = useContext(BlogContext);

  return (
    <nav>
      <Link to="/">My Blog</Link>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex' }}>
        {currentUser && (
          <>
            <div style={{ marginRight: 10 }}>Hi, {currentUser.username}</div>
            <button onClick={() => logout()}>Log Out</button>
          </>
        )}
        {!currentUser && <Link to="/login">Log In</Link>}
      </div>
    </nav>
  );
};

export default Nav;
