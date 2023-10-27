import { useContext, useState } from 'react';
import { Input } from './Common';
import { BlogContext } from './BlogProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(BlogContext);
  const navigate = useNavigate();

  return (
    <div className="panel">
      <Input value={username} onChange={setUsername} placeholder="Username..." />
      <Input value={password} onChange={setPassword} placeholder="Password" type="password" />
      <button
        onClick={() => {
          const result = login({
            username,
            password,
          });

          if (!result) {
            alert('Wrong combination, please try again!');
          } else {
            navigate('/');
          }
        }}
      >
        Log In
      </button>
    </div>
  );
};

export default Login;
