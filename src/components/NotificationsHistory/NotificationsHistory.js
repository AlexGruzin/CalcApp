import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import reduce from 'lodash/reduce';
import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';
import startOfToday from 'date-fns/startOfToday';
import { arrayToKeyedObject } from 'helpers/generic';
import startOfYesterday from 'date-fns/startOfYesterday';
import endOfYesterday from 'date-fns/endOfYesterday';
import * as Routing from 'constants/routing';
import { useHistory } from 'react-router-dom';
import { useOutsideClick } from 'helpers/customHooks';
import classNames from 'classnames';
import { PREDEFINED_NOTIFICATIONS } from './notifications';

import './NotificationsHistory.styles.less';

const NotificationsHistory = ({ className, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState(arrayToKeyedObject(data, 'id'));
  const componentRef = useRef(null);
  const [outsideEvent] = useOutsideClick(componentRef);
  const { t } = useTranslation();
  const history = useHistory();

  const todayEvents = useMemo(() => Object.values(events).filter(event => isAfter(event.date, startOfToday())), [
    events,
  ]);

  const yesterdayEvents = useMemo(
    () =>
      Object.values(events).filter(
        event => isAfter(event.date, startOfYesterday()) && isBefore(event.date, endOfYesterday())
      ),
    [events]
  );

  const olderEvents = useMemo(() => Object.values(events).filter(event => isBefore(event.date, startOfYesterday())), [
    events,
  ]);

  const handleAutoClose = useEffect(() => {
    if (isOpen) setIsOpen(false);
  }, [outsideEvent]);

  const markAsRead = useCallback(event => {
    event.preventDefault();
    event.stopPropagation(); // this button in on the another button
    const { id } = event.currentTarget.dataset;

    setEvents(prevState => ({ ...prevState, [id]: { ...prevState[id], read: true } }));
  }, []);

  const removeEvent = useCallback(event => {
    event.preventDefault();
    event.stopPropagation(); // this button in on the another button
    const { id } = event.currentTarget.dataset;

    setEvents(prevState =>
      arrayToKeyedObject(
        Object.values(prevState).filter(item => !(+item.id === +id)),
        'id'
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setEvents(prevState => reduce(prevState, (res, item) => ({ [item.id]: { ...item, read: true } }), {}));
  }, []);

  const EventBlock = event => {
    const { id, date, read, type } = event;
    const { title, message, link } = type ? PREDEFINED_NOTIFICATIONS[type] : event;

    const click = () => {
      if (link) history.push(link);
    };

    return (
      <div key={id + date} className="notify-blc" onClick={click}>
        {!read && (
          <button className="notify-blc__dot-button" type="button" data-id={id} onClick={markAsRead}>
            <div className="notify-blc__read-dot" />
          </button>
        )}
        <div className="notify-blc__icon">
          <img className="notify-h__icon" src="/svg/exclamation.svg" alt="exclamation" />
        </div>
        <div className="notify-blc__data">
          <div className="notify-blc__title-block">
            <h5 className="notify-blc__title">{title}</h5>
          </div>
          <div className="notify-blc__message">{message}</div>
        </div>
        <button className="notify-h__close-btn" type="button" data-id={id} onClick={removeEvent}>
          <img className="notify-h__close-icon" src="/svg/cancel.svg" alt="cancel" />
        </button>
      </div>
    );
  };

  return (
    <div ref={componentRef} className={classNames('notify-h', className)}>
      <button className="notify-h__button" type="button" onClick={() => setIsOpen(!isOpen)}>
        <img className="notify-h__icon" src="/svg/bell.svg" alt="bell" />
      </button>
      {isOpen && (
        <div className="notify-h__hidden-block">
          <div className="notify-h__hidden-top">
            {Object.values(events).length ? (
              <>
                <h3>{t('Notifications')}</h3>
                <button type="button" onClick={markAllAsRead} className="notify-h__mark-btn">
                  {t('Mark all as read')}
                </button>
              </>
            ) : (
              <h3>{t('No Notifications')}</h3>
            )}
            <div className="notify-h__hidden-list">
              {todayEvents.length ? (
                <>
                  <div className="notify-h__day-line-wrap">
                    <h4 className="notify-h__day">{t('Today')}</h4>
                    <div className="notify-h__day-line" />
                  </div>
                  {todayEvents.map(EventBlock)}
                </>
              ) : null}
              {yesterdayEvents.length ? (
                <>
                  <div className="notify-h__day-line-wrap">
                    <h4 className="notify-h__day">{t('Yesterday')}</h4>
                    <div className="notify-h__day-line" />
                  </div>
                  {yesterdayEvents.map(EventBlock)}
                </>
              ) : null}
              {olderEvents.length ? (
                <>
                  <div className="notify-h__day-line-wrap">
                    <h4 className="notify-h__day">{t('Older')}</h4>
                    <div className="notify-h__day-line" />
                  </div>
                  {olderEvents.map(EventBlock)}
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

NotificationsHistory.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
};

NotificationsHistory.defaultProps = {
  className: '',
  data: [],
};

export default NotificationsHistory;
