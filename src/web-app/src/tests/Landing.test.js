import { render, screen } from '@testing-library/react';
import { Landing } from '../views/Landing';

it('check Snapshot', () => {
    sessionStorage.setItem("userEncriptado", "U2FsdGVkX1/MWIrweZAA41GGkQ1wyFBpkEyYQANLwG/R7ViKdndzO6YoG1etIfBlElJUegRlJ2dataLo5NIxWMdvRxBxfGmvLdsPFl1j6nilqh6lYFzt0htFBbWir4DeB8RwQ0XX1guXOCSP0YgRvIfunxgTdUAnT0kQTeBSOqXxMW4jytBnDBH9f2XEy8JawMzxXJlpHtCOV7spmm2LMQ==");
    render(<Landing/>);
    const element = screen.getByText("Gracias por visitar Nailing . Aquí vas a poder reservar citas de forma autónoma de una manera sencilla e intuitiva conociendo en todo momento del proceso el coste y duración de la reserva.");
    expect(element).toBeInTheDocument();
});