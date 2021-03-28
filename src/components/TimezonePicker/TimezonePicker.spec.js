import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithi18next } from 'config/tests';

import { defaultTimezoneOption } from 'constants/settings';
import TimezonePicker from './TimezonePicker';

describe('TimezonePicker tests', () => {
  it('Check snapshots of TimezonePicker are equal.', () => {
    const { asFragment } = renderWithi18next(<TimezonePicker />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Menu could be opened.', async () => {
    const mockOnOpen = jest.fn();
    const { getByText } = renderWithi18next(<TimezonePicker onMenuOpen={mockOnOpen} />);

    const input = getByText(defaultTimezoneOption.label);
    fireEvent.mouseDown(input);

    await waitFor(() => {
      expect(mockOnOpen).toBeCalledTimes(1);
    });
  });

  it('New value could be selected from opened menu.', async () => {
    const mockOnChange = jest.fn();
    const { getByText, container } = renderWithi18next(<TimezonePicker menuIsOpen onChange={mockOnChange} />);

    await waitFor(() => {
      expect(container.querySelector('.custom-timezone-picker__menu')).toBeInTheDocument();
    });

    const option = getByText('(GMT-7:00) Arizona');
    fireEvent.click(option);

    expect(mockOnChange).toBeCalledTimes(1);
  });
});
