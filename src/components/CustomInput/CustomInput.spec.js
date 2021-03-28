import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithi18next } from 'config/tests';

import CustomInput from './CustomInput';

describe('CustomInput tests', () => {
  it('Check snapshots of CustomInput with value are equal.', () => {
    const { asFragment } = render(<CustomInput value="test" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Input placeholder rendered', () => {
    const { getByPlaceholderText } = render(<CustomInput placeholder="placeHolded" />);

    const input = getByPlaceholderText('placeHolded');
    expect(input).toBeInTheDocument();
  });

  it('CustomInput label rendered', () => {
    const { getByText } = renderWithi18next(<CustomInput label="customLabel" />);

    const input = getByText('customLabel');
    expect(input).toBeInTheDocument();
  });

  it('New value type working', async () => {
    const mockOnChange = jest.fn();
    const { getByLabelText } = renderWithi18next(<CustomInput onChange={mockOnChange} name="name" label="custom" />);

    const input = getByLabelText('custom');

    await userEvent.type(input, '123');

    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });
});
