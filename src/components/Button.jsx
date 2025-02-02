import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ onClick, isVisible }) => {
    if (!isVisible) return null;

    return (
      <section className={styles.buttonSection}>
        <button className={styles.buttoncls} onClick={onClick}>
          Load more
        </button>
      </section>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    isVisible: PropTypes.bool.isRequired
};

export default Button;