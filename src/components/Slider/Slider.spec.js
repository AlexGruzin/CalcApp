import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Slider from './Slider';

describe('Slider tests', () => {
  it('Check snapshots of Slider are equal.', () => {
    const { asFragment } = render(<Slider onChange={() => undefined} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Check Slider do call onChange on user click.', () => {
    const mockOnnChange = jest.fn();
    const { getByDisplayValue } = render(<Slider onChange={mockOnnChange} />);
    const input = getByDisplayValue('50'); // default range percent

    fireEvent.change(input, { target: { value: '80' } });

    expect(mockOnnChange).toBeCalled();
  });
});
