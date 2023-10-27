import { useContext } from 'react';
import { BlogContext } from './BlogProvider';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Secured from './Secured';

const Post = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { getPost, deletePost } = useContext(BlogContext);

  const post = getPost({ postId });

  if (!post) return 'Not Found';

  return (
    <div className="panel">
      <div style={{ backgroundColor: '#f2f2f2', padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', marginBottom: 10 }}>
          <div className="text" style={{ flex: 1 }}>
            <b>{post.title}</b>
          </div>
          <Secured forUserId={post.authorId}>
            <Link to={`/edit/${postId}`}>
              <button className="primary">Edit</button>
            </Link>
            <button
              onClick={() => {
                deletePost({ postId });
                navigate('/');
              }}
              className="danger"
            >
              Delete
            </button>
          </Secured>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
};

export default Post;
