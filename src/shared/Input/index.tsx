import React from 'react';
import styles from './styles.module.css';

type InputProps = {
  label?: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const Input = React.memo((props: InputProps) => {
  const { label, value, onChange, disabled } = props;

  return (
    <input
      className={`${styles.input}`}
      disabled={disabled}
      value={value}
      placeholder={label}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
    />
  );
});
export default Input;
