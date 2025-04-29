import React from 'react';
import styles from './styles.module.css';

type ButtonProps = {
  label?: string;
  onClick: () => void;
  disabled?: boolean;
  variant: 'filled' | 'outlined' | 'flattened';
  icon?: React.ReactElement
};

const Button = React.memo((props: ButtonProps) => {
  const {
    label,
    onClick,
    disabled,
    variant,
    icon,
  } = props;

  return (
    <button
      disabled={disabled}
      className={label ?
         `${styles.button} ${styles[variant]}` : 
         `${styles.iconButton} ${variant === 'filled' ? styles[variant]: ''}`}
      onClick={onClick}
    >
      {icon && (icon)}
      {label && (<label>{label}</label>)}
    </button>
  );
});
export default Button;
