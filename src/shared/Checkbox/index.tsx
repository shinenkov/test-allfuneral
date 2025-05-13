import React from 'react';
import Check from '../../assets/icons/check.svg?react';
import styles from './styles.module.css';

type CheckboxProps = {
  id: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
};

const Checkbox = React.memo((props: CheckboxProps) => {
  const { onChange, id, label, checked, disabled } = props;

  return (
    <div
      className={`${styles.wrapper} ${disabled && styles.disabled}`}
      onClick={!disabled ? onChange : () => false}
    >
      <input
        disabled={disabled}
        id={id}
        type="checkbox"
        className={checked ? styles.checked : ''}
        onChange={!disabled ? onChange : () => false}
        checked={checked}
      />
      <span className={styles.checkmark}>{checked && <Check />}</span>
      <label
        onClick={!disabled ? onChange : () => false}
        className={styles.label}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
});
export default Checkbox;
