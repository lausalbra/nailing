import React, { useRef, useEffect } from "react";
import $ from 'jquery';



export default function Paypal({ json }) {

  //Obtengo usuario desencriptado
  var cryptoJS = require("crypto-js");
  const user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))

  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "EUR",
                  value: parseInt(JSON.parse(json).precio),
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          $.ajax({
            method: "POST",
            contentType: "application/json",
            headers: {
              "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
            },
            data: json,
            url: "https://nailingtest.herokuapp.com/cita/add",
            success: function (data) {
              console.log("Se ha realizado la reserva correctamente", order);
              window.location.href = '/cita';
            },
          });
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [json]);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );

}
