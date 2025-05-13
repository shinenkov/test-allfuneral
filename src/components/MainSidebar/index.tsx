import { FC } from 'react';
import styles from './styles.module.css';
import Logo from '../../assets/icons/logo.svg?react';
import Company from '../../assets/icons/company.svg?react';
import Search from '../../assets/icons/search.svg?react';
import Settings from '../../assets/icons/settings.svg?react';
import SignOut from '../../assets/icons/signOut.svg?react';
import Button from '../../shared/Button';
import { useAuth } from '../../context/AuthContext';

const MainSidebar: FC = () => {
  const { setToken } = useAuth();
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <Logo className={styles.logo} />
      </div>
      <div className={styles.nav}>
        <div className={styles.navTop}>
          <Button icon={<Company />} onClick={() => {}} variant="filled" />
          <Button icon={<Search />} onClick={() => {}} variant="filled" />
        </div>
        <div className={styles.navBottom}>
          <div className={styles.separator} />
          <Button icon={<Settings />} onClick={() => {}} variant="filled" />
          <Button
            icon={<SignOut />}
            onClick={() => setToken(null)}
            variant="filled"
          />
        </div>
      </div>
    </div>
  );
};

export default MainSidebar;
