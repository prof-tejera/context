import React, { useState } from 'react';
import { usePersistedState } from '../hooks';
export const BlogContext = React.createContext({});

const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
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
          setSelectedPostId(id);
        },
        retrievePost: ({ postId }) => posts.find(post => `${post.id}` === `${postId}`),
        updatePost: post => {
          const updatedPosts = posts.map(p => (p.id === post.id ? post : p));
          setPosts(updatedPosts);
        },
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
