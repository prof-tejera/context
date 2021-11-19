import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const BlogContext = React.createContext({});

const routes = {
  HOME: '/',
};

const BlogProvider = ({ children }) => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'First Post',
      body: 'Lorem ipsum <b>dolor</b> sit amet consectetur adipisicing elit. Quisquam, quidem.',
    },
    {
      id: 2,
      title: 'Second Post',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.',
    },
  ]);

  const [selectedPostId, setSelectedPostId] = useState(null);

  return (
    <BlogContext.Provider
      value={{
        selectedPostId,
        setSelectedPostId,
        posts,
        createPost: ({ title, body }) => {
          const id = posts.length + 1;
          setPosts([...posts, { id, title, body }]);
          navigate(routes.HOME);
        },
        retrievePost: ({ postId }) => posts.find(post => `${post.id}` === `${postId}`),
        updatePost: post => {
          const updatedPosts = posts.map(p => (p.id === post.id ? post : p));
          setPosts(updatedPosts);
        },
        deletePost: ({ postId }) => {
          const updatedPosts = posts.filter(p => p.id !== postId);
          setPosts(updatedPosts);
        },
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
