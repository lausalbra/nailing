import { render, screen } from '@testing-library/react';
import { CentroAdd } from '../views/CentroAdd';

it('check Snapshot', () => {
    render(<CentroAdd />);
    const element = screen.getByText("Registrar centro");
    expect(element).toBeInTheDocument();
});