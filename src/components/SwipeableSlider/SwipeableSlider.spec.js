import React from 'react';
import { waitFor, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SLIDES_DATA } from 'constants/auth';

import SwipeableSlider from './SwipeableSlider';

describe('SwipeableSlider tests', () => {
  it('Check snapshots of SwipeableSlider are equal.', () => {
    const { asFragment } = render(<SwipeableSlider slides={SLIDES_DATA} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Check SwipeableSlider click right change slide.', () => {
    const mockOnChange = jest.fn();
    const { getAllByRole } = render(<SwipeableSlider onChange={mockOnChange} slides={SLIDES_DATA} />);
    const btnArrow = getAllByRole('button');
    userEvent.click(btnArrow[1]);

    expect(mockOnChange).toBeCalledWith(1);
  });

  it('Check SwipeableSlider click left change slide.', () => {
    const mockOnChange = jest.fn();
    const { getAllByRole } = render(<SwipeableSlider onChange={mockOnChange} slides={SLIDES_DATA} />);
    const btnArrow = getAllByRole('button');

    userEvent.click(btnArrow[0]);
    expect(mockOnChange).toBeCalledWith(-1);
  });

  it('Check SwipeableSlider click indicator change slide.', () => {
    const mockOnChange = jest.fn();
    const { container } = render(<SwipeableSlider onChange={mockOnChange} slides={SLIDES_DATA} />);
    const btnIndicator = container.querySelectorAll('.indicator-button');

    userEvent.click(btnIndicator[2]);
    expect(mockOnChange).toBeCalledWith(2);
  });
});
