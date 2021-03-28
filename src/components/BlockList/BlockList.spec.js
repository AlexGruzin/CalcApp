import React from 'react';
import { waitFor, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ADVERTISING_CHANNELS } from 'constants/audit';

import BlockList from './BlockList';

describe('BlockList tests', () => {
  it('Check snapshots of BlockList are equal.', () => {
    const { asFragment } = render(
      <BlockList items={ADVERTISING_CHANNELS} title="title" handleClick={() => undefined} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('BlockList do call handleClick on item click.', async () => {
    const mockOnClick = jest.fn();
    const { getAllByRole } = render(
      <BlockList items={ADVERTISING_CHANNELS} className="name" handleClick={mockOnClick} />
    );

    const btn = getAllByRole('button');
    userEvent.click(btn[0]);

    await waitFor(() => {
      expect(mockOnClick).toBeCalledTimes(1);
    });
  });
});
