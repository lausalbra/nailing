import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import "./Center.css";
import { BasicRating } from "../Rating";

export function CenterDetails({image, address, rating}) {
  return (
    <Card class="card" sx={{ minWidth: 275 }}>
      <CardContent>
      <div className="flex items-center">
            <img src={image} alt="img" className="max-w-full float-left bg-white" />
            <div className="ml-5 items-center">
                <p><strong>Dirección:</strong> {address}</p>
                <p><BasicRating name="read-only" value={rating} readOnly /></p>
            </div>
        </div>
      </CardContent>
      <CardActions>
            <button className="border-2 border-pink-300 text-black px-32 py-3 rounded-md text-1xl font-medium hover:bg-pink-300 transition duration-300">Realizar reserva</button>
      </CardActions>
    </Card>
  );
}
