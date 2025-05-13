import { FC } from 'react';
import styles from './styles.module.css';
import Company from '../../assets/icons/company.svg?react';
import Contractor from '../../assets/icons/contractor.svg?react';
import Account from '../../assets/icons/account.svg?react';
import Button from '../../shared/Button';

const NavigationSidebar: FC = () => {
  const navItems = [
    {
      id: 'organizations',
      label: 'Organizations',
      icon: Company,
      isActive: true,
    },
    {
      id: 'contractors',
      label: 'Contractors',
      icon: Contractor,
      isActive: false,
    },
    {
      id: 'clients',
      label: 'Clients',
      icon: Account,
      isActive: false,
    },
  ];

  return (
    <nav className={styles.navigation}>
      <div className={styles.companyInfo}>
        <h1>Oak Tree Cemetery</h1>
        <span>Process Manager</span>
      </div>
      <div className={styles.navItems}>
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={item.isActive ? 'filled' : 'outlined'}
            onClick={() => false}
            icon={<item.icon />}
            label={item.label}
          />
          // <button
          //   key={item.id}
          //   className={`${styles.navItem} ${item.isActive ? styles.active : ''}`}
          // >
          //   <item.icon className={styles.icon} />
          //   <span>{item.label}</span>
          // </button>
        ))}
      </div>
    </nav>
  );
};

export default NavigationSidebar;
