import { useState, useCallback } from 'react';
import styles from './styles.module.css';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import Edit from '../../assets/icons/edit.svg?react';
import Check from '../../assets/icons/check.svg?react';
import Delete from '../../assets/icons/delete.svg?react';
import { usePatchContactAsyncMutation } from '../../store/contact';
import Loading from '../Loading';
import { useAuth } from '../../context/AuthContext';
import { ContactType } from '../../store/contact/model/types';
import { formatPhoneNumber, unformatPhoneNumber } from './utils';

type ContactFormType = {
  responsiblePerson: string;
  phone: string;
  email: string;
};

const Contact = ({ contact }: { contact: ContactType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { token } = useAuth();

  const [updateContcat, { isLoading }] = usePatchContactAsyncMutation();

  const [formData, setFormData] = useState<ContactFormType>({
    responsiblePerson: `${contact.firstname} ${contact.lastname}`, // David Rosenberg
    phone: contact?.phone ?? '', // 17025552345
    email: contact?.email ?? '', // david_rosenberg88@gmail.com
  });

  const handleSaveChanges = useCallback(() => {
    setIsEditing(false);
    if (!contact) return;
    const { responsiblePerson, phone, email } = formData;
    const newContact = {
      firstname: responsiblePerson.split(' ')[0],
      lastname: responsiblePerson.split(' ')[1] ?? '',
      phone: unformatPhoneNumber(phone),
      email,
    };
    updateContcat({
      id: contact.id,
      auth: token,
      ...newContact,
    });
  }, [contact, formData, token, updateContcat]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    if (contact) {
      setFormData({
        ...contact,
        responsiblePerson: `${contact.firstname} ${contact.lastname}`,
      });
    }
  }, [contact]);

  const handleInputChange = useCallback(
    (field: keyof ContactFormType) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
          ...prev,
          [field]: e.target.value,
        }));
      },
    []
  );

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatPhoneNumber(e.target.value);
      setFormData((prev) => ({
        ...prev,
        phone: formatted,
      }));
    },
    []
  );

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loading height="144px" />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Contacts</h2>
          <div className={styles.actions}>
            <Button
              label="Save changes"
              variant="flattened"
              icon={<Check />}
              onClick={handleSaveChanges}
            />
            <Button
              label="Cancel"
              variant="flattened"
              icon={<Delete />}
              onClick={handleCancel}
            />
          </div>
        </div>

        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Responsible person:</label>
            <Input
              value={formData.responsiblePerson}
              onChange={handleInputChange('responsiblePerson')}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Phone number:</label>
            <Input
              value={formatPhoneNumber(formData.phone)}
              onChange={handlePhoneChange}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>E-mail:</label>
            <Input
              value={formData.email}
              onChange={handleInputChange('email')}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Contacts</h2>
        <Button
          variant="flattened"
          icon={<Edit />}
          label="Edit"
          onClick={() => setIsEditing(true)}
        />
      </div>

      <div className={styles.details}>
        <div className={styles.row}>
          <label className={styles.label}>Responsible person:</label>
          <span className={styles.value}>{formData.responsiblePerson}</span>
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Phone number:</label>
          <span className={styles.value}>
            {formatPhoneNumber(formData.phone)}
          </span>
        </div>
        <div className={styles.row}>
          <label className={styles.label}>E-mail:</label>
          <span className={styles.value}>{formData.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
