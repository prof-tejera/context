import { useContext } from 'react';

import Blog from './Blog';
import BlogProvider, { BlogContext } from './BlogProvider';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Editor from './Editor';
import Post from './Post';
import Login from './Login';
import Nav from './Nav';

const Inner = () => {
  const { currentUser } = useContext(BlogContext);

  const commonRoutes = (
    <>
      <Route path="/" element={<Blog />} />
      <Route path="/post/:postId" element={<Post />} />
    </>
  );

  let routes = null;

  if (!currentUser) {
    routes = (
      <Routes>
        {commonRoutes}
        <Route path="/login" element={<Login />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        {commonRoutes}
        <Route path="/create" element={<Editor />} />
        <Route path="/edit/:postId" element={<Editor />} />
      </Routes>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Nav />
      {routes}
    </div>
  );
};

const App = () => {
  return (
    <BlogProvider>
      <BrowserRouter>
        <Inner />
      </BrowserRouter>
    </BlogProvider>
  );
};

export default App;
