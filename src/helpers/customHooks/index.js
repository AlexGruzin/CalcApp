import { useEffect, useState, useMemo } from 'react';
import i18n from 'i18next';

export const useOutsideClick = ref => {
  const [eventClick, setEventClick] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setEventClick(event);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return [eventClick];
};

export const useTranslateOptions = options =>
  useMemo(() => {
    const transArr = options.map(option => ({
      ...option,
      label: i18n.t(option.label),
    }));

    return transArr;
  }, [options, i18n.t]);
