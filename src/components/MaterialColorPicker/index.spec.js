import { render, screen } from '@testing-library/react';
import MaterialColorPicker from '../MaterialColorPicker';

test('renders MaterialColorPicker component', () => {
  render(<MaterialColorPicker />);
  const linkElement = screen.getByText(/todo/i);
  expect(linkElement).toBeInTheDocument();
});
