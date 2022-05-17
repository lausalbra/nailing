import { render, screen } from '@testing-library/react';
import { Usuario } from '../views/Usuario';

it('check Snapshot', () => {
    sessionStorage.setItem("userEncriptado", "U2FsdGVkX1/MWIrweZAA41GGkQ1wyFBpkEyYQANLwG/R7ViKdndzO6YoG1etIfBlElJUegRlJ2dataLo5NIxWMdvRxBxfGmvLdsPFl1j6nilqh6lYFzt0htFBbWir4DeB8RwQ0XX1guXOCSP0YgRvIfunxgTdUAnT0kQTeBSOqXxMW4jytBnDBH9f2XEy8JawMzxXJlpHtCOV7spmm2LMQ==");
    render(<Usuario/>);
    const element = screen.getByText("Cerrar Sesión");
    expect(element).toBeInTheDocument();
});