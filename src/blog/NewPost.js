import { useContext, useState } from 'react';
import { BlogContext } from './BlogProvider';
import { Button, Input, PostWrapper, TextArea, Title } from './Styles';

const NewPost = () => {
  const { createPost } = useContext(BlogContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <PostWrapper>
      <Title>
        <Input placeholder="Title..." value={title} onChange={e => setTitle(e.target.value)} />
      </Title>
      <TextArea value={body} onChange={e => setBody(e.target.value)} />
      <Button
        onClick={() => {
          createPost({ title, body });
          setTitle('');
          setBody('');
        }}
      >
        Submit
      </Button>
    </PostWrapper>
  );
};

export default NewPost;
