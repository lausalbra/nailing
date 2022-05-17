import { render, screen } from '@testing-library/react';
import { Route } from 'wouter'

import { CentroEdit } from '../views/CentroEdit';

it('check Snapshot', () => {
    render(<Route path="/centroedit/:id">
            <CentroEdit />
        </Route>,
        {
            route: '/centroedit/0',
        });
    const element = screen.getAllByText("");
    expect(element[0]).toBeInTheDocument();
});