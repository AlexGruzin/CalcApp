import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithi18next } from 'config/tests';
import ConfirmUser from './ConfirmUser';

describe('ConfirmUser tests', () => {
  it('Check snapshots of ConfirmUser are equal.', async () => {
    const { asFragment } = render(<ConfirmUser confirmUser={() => undefined} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Press submit to send api request (new member) with valid password.', async () => {
    const mockSubmit = jest.fn();
    const { getAllByRole, getByLabelText, asFragment } = renderWithi18next(<ConfirmUser confirmUser={mockSubmit} />);
    const btns = getAllByRole('button');
    const input = getByLabelText('password');

    fireEvent.change(input, { target: { value: '12345678' } }); // enter password
    userEvent.click(btns[0]);

    waitFor(() => {
      expect(mockSubmit).toBeCalledTimes(1);
    });
  });

  it('Press submit to send api request (new member) with invalid password.', async () => {
    const mockSubmit = jest.fn();
    const { getAllByRole, getByLabelText } = renderWithi18next(<ConfirmUser confirmUser={mockSubmit} />);
    const btns = getAllByRole('button');
    const input = getByLabelText('password');

    fireEvent.change(input, { target: { value: '1' } }); // enter password

    userEvent.click(btns[0]);

    waitFor(() => {
      expect(mockSubmit).toBeCalledTimes(0);
    });
  });
});
