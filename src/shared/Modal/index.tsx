import { ReactNode } from 'react';
import styles from './styles.module.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={(e) => handleOverlayClick(e)}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
};

export default Modal;
