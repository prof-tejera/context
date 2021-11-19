import './App.css';
import Blog from './blog/Blog';
import Editor from './blog/Editor';
import RoutedBlog from './blog/RoutedBlog';
import Games from './games/Games';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const App = () => <Games />;

export default App;
