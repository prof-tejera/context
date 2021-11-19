import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import NewPost from './NewPost';
import { BlogStyle, Button, PostWrapper, Title } from './Styles';
import BlogProvider, { BlogContext } from '../context/BlogProvider';
import Post from './Post';

const Blog = () => {
  const { posts } = useContext(BlogContext);

  return (
    <div>
      {posts.map(post => (
        <PostWrapper key={post.id}>
          <Link to={`/post/${post.id}`}>
            <Title>{post.title}</Title>
          </Link>
        </PostWrapper>
      ))}
      <Link to="/create">
        <Button>Create Post</Button>
      </Link>
    </div>
  );
};

const RoutedPost = () => {
  const { id } = useParams();
  return <Post postId={id} routed />;
};

const Wrapped = () => {
  return (
    <Router>
      <BlogProvider>
        <BlogStyle />
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/create" element={<NewPost />} />
          <Route path="/post/:id" element={<RoutedPost />} />
        </Routes>
      </BlogProvider>
    </Router>
  );
};

export default Wrapped;
