import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { BasicRating } from "../Rating";

export function CenterDetails({image, provincia, rating}) {
  return (
    <Card style={{backgroundColor: 'rgb(248, 225, 228)'}} sx={{ minWidth: 275 }}>
      <CardContent>
      <div className="flex items-center">
            <img src={image} alt="img" className="w-52 aspect-square rounded-md shadow-md max-w-full float-left bg-white" />
            <div className="ml-5 items-center">
                <p><strong>Provincia:</strong> {provincia}</p>
                <p><BasicRating value={rating} readOnly /></p>
            </div>
        </div>
      </CardContent>
      <CardActions>
            <button id="1" className="border-2 border-purple-300 bg-pink-200 text-black w-96 py-3 rounded-md text-1xl font-medium hover:bg-purple-300 transition duration-300"
                /* onClick={(event) => setState({ isPaneOpen: false, id: event.target.id, name: event.target.innerText, buttons: []})} */>Realizar reserva</button>
      </CardActions>
    </Card>
  );
}