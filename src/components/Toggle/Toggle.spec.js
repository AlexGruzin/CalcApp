import React from 'react';
import { waitFor, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Toggle from './Toggle';

describe('Toggle tests', () => {
  it('Check snapshots of Toggle are equal.', () => {
    const { asFragment } = render(<Toggle name="name" label="custom" value onChange={() => undefined} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Toggle do change value with onChange.', async () => {
    const mockOnChange = jest.fn();
    const { getByLabelText } = render(<Toggle name="name" label="custom" onChange={mockOnChange} />);

    const input = getByLabelText('custom');
    userEvent.click(input);

    await waitFor(() => {
      expect(mockOnChange).toBeCalledTimes(1);
    });
  });
});
