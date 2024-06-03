import PropTypes from 'prop-types';
import styles from './app-header-button.module.css';

function HeaderButton({ isActive, icon: Icon, children, href }) {
  return (
    <a href={href} className={`${styles.headerbutton} pt-4 pb-4 pr-5 pl-5`}>
      <Icon type={isActive ? 'primary' : 'secondary'} />
      <span className={`text text_type_main-default ml-2 ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}>
        {children}
      </span>
    </a>
  );
}

HeaderButton.propTypes = {
  isActive: PropTypes.bool,
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};

export default HeaderButton;
