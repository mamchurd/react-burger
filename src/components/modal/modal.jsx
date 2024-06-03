import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

function Modal(props) {
  useEffect(() => {
    const handleEscPressed = (e) => {
      if (e.key === 'Escape') props.onClose(e);
    };

    document.addEventListener('keydown', handleEscPressed, false);
    return () => {
      document.removeEventListener('keydown', handleEscPressed, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles.dialog}>
        <div className={`${styles.header} ml-10 mt-10 mr-10`}>
          <div className={`${styles.caption} text text_type_main-large`}>{props.caption}</div>
          <div className={styles['closeBtn']}>
            <CloseIcon type='primary' onClick={props.onClose} />
          </div>
        </div>
        <div className={styles.content}>{props.children}</div>
      </div>
      <ModalOverlay onClose={props.onClose} />
    </div>,
    document.getElementById('modal')
  );
}

Modal.propTypes = {
  caption: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
  onClose: PropTypes.func.isRequired
};

export default Modal;
