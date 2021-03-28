import React from 'react';
import { NAVIGATION_OPTIONS, AUDIT_NAVIGATION_OPTIONS } from 'constants/dashboard';
import * as Routing from 'constants/routing';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './SideNavigation.styles.less';

const SideNavigation = () => {
  const { t } = useTranslation();
  const selectedOption = window.location.pathname;
  let availableRoutes;
  switch (selectedOption) {
    case Routing.AUDIT: {
      availableRoutes = AUDIT_NAVIGATION_OPTIONS;
      break;
    }
    default: {
      availableRoutes = NAVIGATION_OPTIONS;
      break;
    }
  }

  return (
    <div className="side-navigation">
      <img className="side-navigation__logo" src="/svg/logo-purple.svg" alt="Calc logo" />
      {availableRoutes.map(option => {
        const isActive = option.route === selectedOption;
        const routeUniqueClass = `link--${option.route.slice(1)}`;
        return (
          <Link
            className={classNames('side-navigation__link', { isActive }, routeUniqueClass)}
            key={option.route}
            to={isActive ? '#' : option.route} // also pointer-event
            role="button"
          >
            <div className="side-navigation__inner">
              <div className="side-navigation__content">
                <img className="side-navigation__icon" src={`/svg/${option.icon}.svg`} alt="" />
                <h6 className="side-navigation__label">{t(option.label)}</h6>
              </div>
              <div className="side-navigation__marker" />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

SideNavigation.propTypes = {};

SideNavigation.defaultProps = {};

export default SideNavigation;
