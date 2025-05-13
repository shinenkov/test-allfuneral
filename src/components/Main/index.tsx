import styles from './styles.module.css';
import CompanyDetails from '../CompanyDetails';
import MainSidebar from '../MainSidebar';
import NavigationSidebar from '../NavigationSidebar';
import Contact from '../Contacts';
import Photos from '../Photos';
import { useAuth } from '../../context/AuthContext';
import Header from '../Header';
import { useEffect } from 'react';
import { selectCompany, useGetCompanyAsyncQuery } from '../../store/company';
import Loading from '../Loading';
import { selectContact, useGetContactAsyncQuery } from '../../store/contact';
import { useAppSelector } from '../../api/hooks';

const Main = () => {
  const { token } = useAuth();
  const {
    refetch,
    isLoading: isCompany,
    isSuccess,
  } = useGetCompanyAsyncQuery({ auth: token as string, id: '12' });
  const company = useAppSelector(selectCompany);
  const contact = useAppSelector(selectContact);
  const { refetch: loadContact } = useGetContactAsyncQuery(
    {
      auth: token as string,
      id: company?.contactId as string,
    },
    { skip: !isSuccess || !company?.contactId }
  );

  useEffect(() => {
    if (!token) {
      return;
    } else {
      refetch();
    }
  }, [refetch, token]);

  useEffect(() => {
    if (isSuccess) {
      loadContact();
    }
  }, [isSuccess, loadContact]);

  return (
    <div className={styles.layout}>
      <MainSidebar />
      <div className={styles.content}>
        <NavigationSidebar />
        <main className={styles.main}>
          {isCompany && <Loading height={'216px'} />}
          {company && isSuccess && (
            <div className={styles.wrapper}>
              <Header company={company} />
              <CompanyDetails company={company} />
              {contact ? (
                <Contact contact={contact} />
              ) : (
                <Loading height={'192px'} />
              )}
              <Photos company={company} />
            </div>
          )}
          {(!company || !isSuccess) && !isCompany && (
            <h2 style={{ textAlign: 'center', marginTop: '20px' }}>
              No company found.
            </h2>
          )}
        </main>
      </div>
    </div>
  );
};

export default Main;
