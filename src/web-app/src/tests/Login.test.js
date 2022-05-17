import { render, screen } from '@testing-library/react';
import { Login } from '../views/Login';

it('check Snapshot', () => {
    sessionStorage.setItem("userEncriptado", "U2FsdGVkX1/MWIrweZAA41GGkQ1wyFBpkEyYQANLwG/R7ViKdndzO6YoG1etIfBlElJUegRlJ2dataLo5NIxWMdvRxBxfGmvLdsPFl1j6nilqh6lYFzt0htFBbWir4DeB8RwQ0XX1guXOCSP0YgRvIfunxgTdUAnT0kQTeBSOqXxMW4jytBnDBH9f2XEy8JawMzxXJlpHtCOV7spmm2LMQ==");
    render(<Login/>);
    const element = screen.getByText("Iniciar Sesión");
    expect(element).toBeInTheDocument();
});