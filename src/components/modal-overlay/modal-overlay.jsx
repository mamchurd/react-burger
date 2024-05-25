import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay(props) {
    return (
        <div className={styles.overlay} onClick={props.onClose}></div>
    );
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;