import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { renderWithi18next } from 'config/tests';
import userEvent from '@testing-library/user-event';
import ConfirmResetPassword from './ConfirmResetPassword';

describe('ConfirmResetPassword tests', () => {
  it('Check snapshots of ConfirmResetPassword are equal.', () => {
    const { asFragment } = renderWithi18next(<ConfirmResetPassword confirmPassword={() => undefined} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Press submit to send api request with valid password.', async () => {
    const mockSubmit = jest.fn();
    const { getAllByRole, getByLabelText } = renderWithi18next(<ConfirmResetPassword confirmPassword={mockSubmit} />);
    const btns = getAllByRole('button');
    const input = getByLabelText('password');

    fireEvent.change(input, { target: { value: '12345678' } }); // enter new password

    userEvent.click(btns[0]);
    waitFor(() => {
      expect(mockSubmit).toBeCalledTimes(1);
    });
  });

  it('Press submit to send api request with invalid password.', async () => {
    const mockSubmit = jest.fn();
    const { getAllByRole, getByLabelText } = renderWithi18next(<ConfirmResetPassword confirmPassword={mockSubmit} />);
    const btns = getAllByRole('button');
    const input = getByLabelText('password');

    fireEvent.change(input, { target: { value: '1' } }); // enter new password

    userEvent.click(btns[0]);

    waitFor(() => {
      expect(mockSubmit).toBeCalledTimes(0);
    });
  });
});
