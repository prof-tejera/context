import { useContext } from 'react';
import BlogProvider, { BlogContext } from '../context/BlogProvider';
import NewPost from './NewPost';
import Post from './Post';
import { BlogStyle, PostWrapper, Title } from './Styles';

const Blog = () => {
  const { selectedPostId, setSelectedPostId, posts } = useContext(BlogContext);
  if (selectedPostId) return <Post postId={selectedPostId} editable />;

  return (
    <div style={{ display: 'flex' }}>
      <div>
        {posts.map(post => (
          <PostWrapper key={post.id} onClick={() => setSelectedPostId(post.id)}>
            <Title>{post.title}</Title>
          </PostWrapper>
        ))}
      </div>
      <NewPost />
    </div>
  );
};

const Wrapped = () => {
  return (
    <BlogProvider>
      <BlogStyle />
      <Blog />
    </BlogProvider>
  );
};

export default Wrapped;
