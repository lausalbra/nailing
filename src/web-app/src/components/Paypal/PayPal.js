import React, { useRef, useEffect } from "react";
import $ from 'jquery'; 

export default function Paypal({json}) {
 
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
                  value:parseInt(JSON.parse(json).precio),
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
                "Authorization": "Basic " + btoa(sessionStorage.getItem("userName") + ":" + sessionStorage.getItem("userPassword"))
            },
            data: json,
            url: "https://nailingtest.herokuapp.com/cita/add",
            success: function (data) {
              console.log("Se ha realizado la reserva correctamente",order)
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
