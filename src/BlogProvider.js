import React, { useState } from 'react';
import { makeId } from './util';
import { usePersistedState } from './hooks';

export const BlogContext = React.createContext({});

const users = [
  {
    id: makeId(),
    username: 'user1',
    password: 'cGFzc3dvcmQx',
  },
  {
    id: makeId(),
    username: 'user2',
    password: 'cGFzc3dvcmQy',
  },
  {
    id: makeId(),
    username: 'user3',
    password: 'cGFzc3dvcmQz',
  },
];

const BlogProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = usePersistedState('blog-user', null);
  const [posts, setPosts] = useState([]);

  return (
    <BlogContext.Provider
      value={{
        currentUser,
        login: ({ username, password }) => {
          const user = users.find(u => {
            return u.username === username && btoa(password) === u.password;
          });

          if (user) {
            setCurrentUser(user);
            return true;
          }

          return false;
        },
        logout: () => setCurrentUser(null),
        posts,
        postCount: posts.length,
        deletePost: ({ postId }) => setPosts(posts.filter(x => x.id !== postId)),
        getPost: ({ postId }) => {
          return posts.find(p => p.id === postId);
        },
        savePost: ({ id, title, content }) => {
          const updatedPost = {
            authorId: currentUser.id,
            id: id ?? makeId(),
            title,
            content,
          };

          if (id) {
            // Updating existing post
            const updatedPosts = posts.map(p => (p.id === id ? updatedPost : p));
            setPosts(updatedPosts);
          } else {
            // Creating a new one
            setPosts([...posts, updatedPost]);
          }

          return updatedPost;
        },
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogProvider;
