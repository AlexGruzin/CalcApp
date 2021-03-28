import React from 'react';
import { fireEvent, waitFor, render } from '@testing-library/react';
import { renderWithi18next } from 'config/tests';
import { BrowserRouter } from 'react-router-dom';
import * as Routing from 'constants/routing';

import SideNavigation from './SideNavigation';

describe('SideNavigation tests', () => {
  it('Check snapshots of SideNavigation are equal.', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <SideNavigation />
      </BrowserRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('Check SideNavigation do redirect.', async () => {
    const { getAllByRole } = render(
      <BrowserRouter>
        <SideNavigation />
      </BrowserRouter>
    );
    const links = getAllByRole('button');

    await fireEvent.click(links[1]); // forecast

    await waitFor(() => {
      expect(window.location.pathname).toEqual(Routing.FORECAST);
    });
  });
});
