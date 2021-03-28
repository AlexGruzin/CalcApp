import React from 'react';
import { fireEvent, waitFor, render } from '@testing-library/react';
import { renderWithi18next } from 'config/tests';

import CustomSelect from './CustomSelect';

const mockOptions = [
  {
    label: 'label1',
    value: 'value1',
  },
  {
    label: 'label2',
    value: 'value2',
  },
  {
    label: 'label3',
    value: 'value3',
  },
];

describe('CustomSelect tests', () => {
  it('Check snapshots of CustomSelect are equal.', () => {
    const { asFragment } = render(
      <CustomSelect defaultValue={mockOptions[0]} options={mockOptions} label="label" name="name" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Menu could be opened to show options.', async () => {
    const mockOnOpen = jest.fn();
    const { getByText } = render(<CustomSelect value={mockOptions[0]} options={mockOptions} onMenuOpen={mockOnOpen} />);

    const input = getByText(mockOptions[0].label);
    fireEvent.mouseDown(input);

    await waitFor(() => {
      expect(mockOnOpen).toBeCalledTimes(1);
    });
  });

  it('New value could be selected from opened menu.', async () => {
    const mockOnChange = jest.fn();
    const { getByText, container } = renderWithi18next(
      <CustomSelect menuIsOpen defaultValue={mockOptions[0]} options={mockOptions} onChange={mockOnChange} />
    );

    await waitFor(() => {
      expect(container.querySelector('.custom-select__menu')).toBeInTheDocument();
    });

    const option = getByText('label2');
    fireEvent.click(option);

    expect(mockOnChange).toBeCalled();
  });
});
