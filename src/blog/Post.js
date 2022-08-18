import { useContext, useEffect, useState } from 'react';
import { BlogContext } from './BlogProvider';
import { Body, Input, FakeLink, PostWrapper, Title, TextArea } from './Styles';

const InnerPost = ({ post }) => {
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
      <FakeLink onClick={() => setSelectedPostId(null)}>All Posts</FakeLink>
      <Title>
        <Input
          value={post.title}
          onChange={e => {
            setValues(v => ({ ...v, title: e.target.value }));
          }}
        />
      </Title>
      <Body>
        <TextArea
          value={post.body}
          onChange={e => {
            setValues(v => ({ ...v, body: e.target.value }));
          }}
        />
      </Body>
    </PostWrapper>
  );
};

const Post = ({ postId }) => {
  const { retrievePost } = useContext(BlogContext);
  const post = retrievePost({ postId });

  if (!post) return <div>Not Found</div>;

  return <InnerPost post={post} />;
};

export default Post;
