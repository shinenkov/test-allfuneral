import Button from '../../../shared/Button';
import styles from '../styles.module.css';

type RemoveOrganizationModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const RemoveOrganizationModal = ({
  onConfirm,
  onCancel,
}: RemoveOrganizationModalProps) => {
  return (
    <div className={styles.content}>
      <h2 className={styles.title}>Remove the Organization?</h2>

      <p className={styles.message}>
        Are you sure you want to remove this Organization?
      </p>

      <div className={styles.actions}>
        <Button label="No" variant="outlined" onClick={onCancel} />
        <Button label="Yes, remove" variant="filled" onClick={onConfirm} />
      </div>
    </div>
  );
};

export default RemoveOrganizationModal;
