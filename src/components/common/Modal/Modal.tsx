import React from 'react';
import css from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={css.modalOverlay}>
      <div className={css.modalContent}>
        <div className={css.modalHeader}>
          <h2>{title}</h2>
          <button className={css.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={css.modalBody}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
