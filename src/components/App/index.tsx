import Auth from '../Auth';
import { useAuth } from '../../context/AuthContext';
import Main from '../Main';

const App = () => {
  const { token } = useAuth();

  if (!token) {
    return <Auth />;
  }
  return <Main />;
};

export default App;
