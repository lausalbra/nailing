import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText('Gracias por visitar Nailing . Aquí vas a poder reservar citas de forma autónoma de una manera sencilla e intuitiva conociendo en todo momento del proceso el coste y duración de la reserva.');
  expect(linkElement).toBeInTheDocument();
});
