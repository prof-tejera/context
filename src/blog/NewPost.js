import { useContext, useState } from 'react';
import { BlogContext } from '../context/BlogProvider';
import Editor from './Editor';
import { Button, Input, PostWrapper, Title } from './Styles';

const NewPost = () => {
  const { createPost } = useContext(BlogContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  return (
    <PostWrapper>
      <Title>
        <Input placeholder="Title..." value={title} onChange={e => setTitle(e.target.value)} />
      </Title>
      <Editor value={body} onChange={setBody} />
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
