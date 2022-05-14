import { render, screen } from '@testing-library/react';
import { BookingsList } from '../views/BookingsList';

it('check Snapshot', () => {
    render(<BookingsList />);
    const element = screen.getByText("Seleccione una provincia");
    expect(element).toBeInTheDocument();
});