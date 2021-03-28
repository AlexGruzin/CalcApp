import React from 'react';
import { fireEvent, waitFor, render } from '@testing-library/react';
import { renderWithi18next } from 'config/tests';

import CalendarInput from './CalendarInput';

describe('CalendarInput tests', () => {
  it('Check snapshots of CalendarInput are equal.', () => {
    const { asFragment } = render(<CalendarInput start={new Date('1995-12-17T03:24:00')} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Menu could be opened by mouse click.', async () => {
    const { getByRole, container } = render(<CalendarInput />);

    const icon = getByRole('button');
    fireEvent.click(icon);

    await waitFor(() => {
      expect(container.querySelector('.react-datepicker-popper')).toBeInTheDocument();
    });
  });

  it('New date could be selected from opened menu.', async () => {
    const mockOnChange = jest.fn();
    const { getByText, container } = renderWithi18next(<CalendarInput isOpen onChange={mockOnChange} />);

    await waitFor(() => {
      expect(container.querySelector('.react-datepicker-popper')).toBeInTheDocument();
    });

    const option = getByText('15'); // 15 - day number of some month
    fireEvent.click(option);

    expect(mockOnChange).toHaveBeenCalled();
  });
});
