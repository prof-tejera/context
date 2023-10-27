import { useContext } from 'react';
import { BlogContext } from './BlogProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { useUrlState } from './hooks';

const Editor = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { getPost, savePost } = useContext(BlogContext);

  const selectedPost = postId && getPost({ postId });

  const [title, setTitle] = useUrlState({ key: 'title', initialValue: selectedPost?.title });
  const [content, setContent] = useUrlState({ key: 'content', initialValue: selectedPost?.content });

  return (
    <div className="panel">
      <input
        placeholder="title..."
        className="input"
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="content..."
        className="textarea"
        value={content}
        onChange={e => {
          setContent(e.target.value);
        }}
      />
      <button
        className="primary"
        onClick={() => {
          const updatedPost = savePost({
            id: selectedPost?.id,
            title,
            content,
          });

          navigate(`/post/${updatedPost.id}`);
        }}
      >
        Save
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default Editor;
