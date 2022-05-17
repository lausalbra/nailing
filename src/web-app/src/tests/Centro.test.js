import { render, screen } from '@testing-library/react';
import { Route } from 'wouter'
import { Centro } from '../views/Centro';


it('check Snapshot', () => {
    render(<Route path="/centrodetalle/:id">
                <Centro />
            </Route>,
            {
                route: '/centrodetalle/0',
            });
    const element = screen.getAllByText("");
    expect(element[0]).toBeInTheDocument();
});