import { useContext, useEffect, useState } from 'react';
import { BlogContext } from '../context/BlogProvider';
import Editor from './Editor';
import { Link } from 'react-router-dom';
import { Body, Input, FakeLink, PostWrapper, Title } from './Styles';

const Inner = ({ post, routed }) => {
  const { updatePost, setSelectedPostId } = useContext(BlogContext);

  const [values, setValues] = useState({
    title: post.title,
    body: post.body,
  });

  useEffect(() => {
    updatePost({
      ...post,
      ...values,
    });
  }, [values]);

  return (
    <PostWrapper>
      {routed && <Link to="/">All Posts</Link>}
      {!routed && <FakeLink onClick={() => setSelectedPostId(null)}>All Posts</FakeLink>}
      <Title>
        <Input
          value={post.title}
          onChange={e => {
            setValues(v => ({ ...v, title: e.target.value }));
          }}
        />
      </Title>
      <Body>
        <Editor
          value={post.body}
          onChange={newBody => {
            setValues(v => ({ ...v, body: newBody }));
          }}
        />
      </Body>
    </PostWrapper>
  );
};

const Post = ({ postId, routed }) => {
  const { retrievePost } = useContext(BlogContext);
  const post = retrievePost({ postId });

  if (!post) return <div>Not Found</div>;

  return <Inner post={post} routed={routed} />;
};

export default Post;
