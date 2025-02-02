import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends Component {
    componentDidMount() {
        console.log('Modal mounted');
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        console.log('Modal unmounted');
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        console.log('Key down:', event.code);
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    };

    handleBackdropClick = (event) => {
        console.log('Backdrop click:', event.currentTarget === event.target);
        if (event.currentTarget === event.target) {
            this.props.onClose();
        }
    };

    render() {
        const { largeImageUrl, alt } = this.props;

        return (
          <div className={styles.overlay} onClick={this.handleBackdropClick}>
            <div className={styles.modal}>
              <div className={styles['image-container']}>
                <img src={largeImageUrl} alt={alt} />
              </div>
            </div>
          </div>
        );
    }
}

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
