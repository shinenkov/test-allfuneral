import Button from '../../../shared/Button';
import Input from '../../../shared/Input';
import styles from '../styles.module.css';

type OrganizationNameModalProps = {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

const OrganizationNameModal = ({
  value,
  onChange,
  onSave,
  onCancel,
}: OrganizationNameModalProps) => {
  return (
    <div className={styles.content}>
      <h2 className={styles.title}>Specify the Organization's name</h2>
      <Input
        label="Organization name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className={styles.actions}>
        <Button label="Cancel" variant="outlined" onClick={onCancel} />
        <Button label="Save changes" variant="filled" onClick={onSave} />
      </div>
    </div>
  );
};

export default OrganizationNameModal;
