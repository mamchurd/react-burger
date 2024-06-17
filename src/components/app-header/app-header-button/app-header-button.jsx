import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import styles from './app-header-button.module.css';

function HeaderButton({ icon: Icon, children, href }) {
  return (
    <NavLink to={href} className={`${styles.headerbutton} pt-4 pb-4 pr-5 pl-5`}>
      {({ isActive }) => (
        <>
          <Icon type={isActive ? 'primary' : 'secondary'} />
          <span
            className={`text text_type_main-default ml-2 ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}
          >
            {children}
          </span>
        </>
      )}
    </NavLink>
  );
}

HeaderButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};

export default HeaderButton;
