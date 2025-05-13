import Button from '../../shared/Button';
import { useAuth } from '../../context/AuthContext';
import styles from './styles.module.css';
import Input from '../../shared/Input';
import { useState } from 'react';

const Auth = () => {
  const [login, setLogin] = useState<string>('USERNAME');
  const [password, setPassword] = useState<string>('');
  const { setToken } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch('proxy/auth?user=USERNAME');
      const token = response.headers.get('Authorization');
      if (token) {
        setToken(token);
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Input
          label="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <Input
          label="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button label="Login" variant="filled" onClick={handleLogin} />
      </div>
    </div>
  );
};

export default Auth;
