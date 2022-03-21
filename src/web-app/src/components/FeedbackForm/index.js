/*import React, { Component, Fragment } from 'react'*/
import React, { Fragment } from 'react'
import Select from 'react-select';
import emailjs from 'emailjs-com';
import { init } from '@emailjs/browser';
import { useLocation } from 'wouter'
init("SSSEYnY7yNub2grYD");

export function FeedbackForm() {

    const [locationPath, locationPush] = useLocation()


    const options = [
        { value: "no", label: "No" },
        { value: "si", label: "Si" },
    ];

    function enviaEmail(e) {
        e.preventDefault();
        emailjs.sendForm('service_05gcu5d', 'template_qo0x0x4', e.target, 'SSSEYnY7yNub2grYD').then(res => {
            alert("Se ha enviado correctamente. Muchas gracias por su aportación");
            console.log(res);
            locationPush('/')

        })

    }

    return (

        <form className='grid border-2 border-pink-300 p-5 rounded-md w-1/2' onSubmit={enviaEmail} >
            <label className='text-lg' htmlFor="name"> Nombre:</label>
            <input className="border-black border-2  rounded-sm mb-4" name="name" type="text" id="name" required minlength="2" maxlength="20" />

            <label className='text-lg' htmlFor="lastname"> Apellidos:</label>
            <input className="border-black border-2  rounded-sm mb-4" name="lastname" type="text" id="lastname" required minlength="2" maxlength="20" />

            <label className='text-lg' htmlFor="email"> Email:</label>
            <input className="border-black border-2  rounded-sm mb-4" name="email" type="email" id="email" required minlength="8" />


            <label className='text-lg' htmlFor="name">¿Crees que el diseño de la web resulta intuitivo?</label>
            <Fragment><Select name="Q1" options={options} /></Fragment>

            <label className='text-lg' htmlFor="name">¿Crees que es fácil de manejar?</label>
            <Fragment><Select name="Q2" options={options} /></Fragment>

            <label className='text-lg' htmlFor="name">¿Has encontrado fallos? </label>
            <Fragment><Select name="Q3" options={options} /></Fragment>

            <label className='text-lg' htmlFor="error"> Cuáles:</label>
            <input className="border-black border-2  rounded-sm mb-4 h-10 break-normal" name="error" type="text" id="error" />

            <label className='text-lg' htmlFor="feedback"> Danos tu opinión:</label>
            <input className="border-black border-2  rounded-sm mb-4 h-10 break-normal" name="feedback" type="text" id="feedback" required minlength="20" />

            <input className="border-black border-2 mb-4 cursor-pointer hover:bg-pink-200 hover:border-pink-200 duration-300 rounded-3xl" type="submit" value="Enviar" />

        </form>
    )

}