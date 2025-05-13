import React from 'react';
import styles from './styles.module.css';

type ButtonProps = {
  label?: string;
  onClick: () => void;
  disabled?: boolean;
  variant: 'filled' | 'outlined' | 'flattened';
  icon?: React.ReactElement;
  style?: React.CSSProperties;
};

const Button = React.memo((props: ButtonProps) => {
  const { label, onClick, disabled, variant, icon, style } = props;

  return (
    <button
      disabled={disabled}
      style={style}
      className={
        label
          ? `${styles.button} ${styles[variant]}`
          : `${styles.iconButton} ${variant === 'filled' ? styles[variant] : ''}`
      }
      onClick={onClick}
    >
      {icon && icon}
      {label && <label>{label}</label>}
    </button>
  );
});

export default Button;
