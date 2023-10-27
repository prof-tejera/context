import { useContext } from 'react';
import { BlogContext } from './BlogProvider';
import { Link } from 'react-router-dom';
import Secured from './Secured';

const Blog = () => {
  const { posts } = useContext(BlogContext);

  return (
    <div className="panel">
      <div className="header">
        <div className="text">Posts</div>
        <Secured>
          <Link to="/create">
            <button>+</button>
          </Link>
        </Secured>
      </div>
      {posts.map(p => (
        <div key={p.id}>
          <div style={{ backgroundColor: '#f2f2f2', padding: 20, marginBottom: 20 }}>
            <Link to={`/post/${p.id}`}>
              <b>{p.title}</b>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
