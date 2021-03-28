import React from 'react';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next'
import i18n from "./i18nForTests";
import jsdom from 'jsdom';
const { JSDOM } = jsdom;

/*
 * jest-dom
 * https://github.com/testing-library/jest-dom
 */
import '@testing-library/jest-dom/extend-expect';

/*
 * jest-fetch-mock
 * https://github.com/jefflau/jest-fetch-mock
 */
require('jest-fetch-mock').enableMocks();

if (global.document) {
  global.document.createRange = () => ({
    setStart: () => {
    },
    setEnd: () => {
    },
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
    createContextualFragment: str => JSDOM.fragment(str),
    // createContextualFragment: str => document.createElement('hr'),
  });
  global.open = () => undefined;
}

export const renderWithi18next = Component => {
  const Comp = React.cloneElement(Component, {
    changeLanguage: lng => {
      i18n.changeLanguage(lng);
      rerender(<I18nextProvider i18n={i18n}>{Comp}</I18nextProvider>);
    }
  });
  const defaultRender = render(
    <I18nextProvider i18n={i18n}>{Component}</I18nextProvider>
  );
  const { rerender } = defaultRender;
  return defaultRender;
};


// /**
//  * Wraps a component with an Intl Provider.
//  * @param {Object} component The component to render
//  */
// const withTestIntl = component => <IntlProvider locale="en">{component}</IntlProvider>;
//
// /*
//  * https://testing-library.com/docs/example-react-intl
//  */
// export const renderWithReactIntl = component => render(withTestIntl(component));

