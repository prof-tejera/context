import { useContext } from 'react';
import { BlogContext } from './BlogProvider';

const Secured = ({ forUserId, children, fallBack }) => {
  const { currentUser } = useContext(BlogContext);

  if (!currentUser) return fallBack;

  if (forUserId && forUserId !== currentUser.id) return fallBack;

  return children;
};

export default Secured;
