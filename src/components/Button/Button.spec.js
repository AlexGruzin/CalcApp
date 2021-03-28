import React from 'react';
import { waitFor, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';

describe('Slider tests', () => {
  it('Check snapshots of Slider are equal.', () => {
    const { asFragment } = render(<Button title="title" onChange={() => undefined} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Slider do call onClick.', async () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(<Button title="title" onClick={mockOnClick} />);

    const btn = getByText('title');
    userEvent.click(btn);

    await waitFor(() => {
      expect(mockOnClick).toBeCalledTimes(1);
    });
  });
  // it.skip('Slider renders spinner when promise provided.', () => {}); // loadingPromise
  // it.skip('Slider renders spinner when isLoading.', () => {}); // isLoading
});
