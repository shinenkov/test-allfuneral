import Button from '../../shared/Button';
import Modal from '../../shared/Modal';
import OrganizationNameModal from '../modals/OrganizationNameModal';
import styles from './styles.module.css';
import Edit from '../../assets/icons/edit.svg?react';
import Trash from '../../assets/icons/trash.svg?react';
import Chevron from '../../assets/icons/chevron.svg?react';
import { useState } from 'react';
import RemoveOrganizationModal from '../modals/RemoveOrganizationModal';
import {
  useDeleteCompanyAsyncMutation,
  usePatchCompanyAsyncMutation,
} from '../../store/company';
import { useAuth } from '../../context/AuthContext';
import { CompanyType } from '../../store/company/model/types';

const Header = ({ company }: { company: CompanyType }) => {
  const { token } = useAuth();
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [orgName, setOrgName] = useState(company.name);

  const [updateCompany] = usePatchCompanyAsyncMutation();
  const [deleteCompany] = useDeleteCompanyAsyncMutation();

  const handleSave = () => {
    setIsNameModalOpen(false);
    updateCompany({ name: orgName, id: company.id, auth: token });
  };

  const handleConfirm = () => {
    setIsRemoveModalOpen(false);
    deleteCompany({ id: company.id, auth: token });
  };

  return (
    <div className={styles.header}>
      <div className={styles.prev}>
        <Button icon={<Chevron />} variant="outlined" onClick={() => {}} />
      </div>
      <h2 className={styles.title}>{company.name}</h2>
      <div className={styles.buttons}>
        <Button
          icon={<Edit />}
          variant="outlined"
          onClick={() => setIsNameModalOpen(true)}
        />
        <Modal
          isOpen={isNameModalOpen}
          onClose={() => setIsNameModalOpen(false)}
        >
          <OrganizationNameModal
            value={orgName}
            onChange={setOrgName}
            onSave={() => handleSave()}
            onCancel={() => setIsNameModalOpen(false)}
          />
        </Modal>
        <Button
          icon={<Trash />}
          variant="outlined"
          onClick={() => setIsRemoveModalOpen(true)}
        />
        <Modal
          isOpen={isRemoveModalOpen}
          onClose={() => setIsRemoveModalOpen(false)}
        >
          <RemoveOrganizationModal
            onConfirm={() => handleConfirm()}
            onCancel={() => setIsRemoveModalOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
};
export default Header;
