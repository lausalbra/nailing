import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useLocation } from 'wouter'


export function UserDetails({ image, email, phone }) {
  const [locationPath, locationPush] = useLocation()

  function handleClick() {
    sessionStorage.setItem("isLogged", false)
    locationPush("/")
  }

  return (
    <Card style={{ backgroundColor: 'rgb(248, 225, 228)' }} sx={{ minWidth: 275 }}>
      <CardContent>
        <div className="flex items-center">
          <img src={image} alt="img" className="w-52 aspect-square rounded-md shadow-md max-w-full float-left bg-white" />
          <div className="ml-5 items-center">
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Teléfono:</strong> {phone}</p>
          </div>
        </div>
      </CardContent>
      <CardActions>
        <button onClick={() => locationPush('/miscitas')} className="border-2 border-purple-300 bg-pink-200 text-black w-96 py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300">Mis reservas</button>
      </CardActions>
      <CardActions>
        <button onClick={() => handleClick()} className="border-2 border-purple-300 bg-pink-200 text-black w-96 py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300">Cerrar Sesión</button>
      </CardActions>
    </Card>

  );
}