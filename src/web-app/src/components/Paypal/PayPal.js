import React, { useRef, useEffect } from "react";
import { postData } from '../../services/common/common'
import $ from 'jquery'; 

export default function Paypal({json, money, paymentType}) {
 
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (_data, actions, _err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Pago a Nailing",
                amount: {
                  currency_code: "EUR",
                  value: money,
                },
              },
            ],
          });
        },
        onApprove: async (_data, actions) => {
          const order = await actions.order.capture();
          switch({paymentType}){
            case "Reserve":
              $.ajax({
                method: "POST",
                contentType: "application/json",
                headers: {
                    "Authorization": "Basic " + btoa(sessionStorage.getItem("userName") + ":" + sessionStorage.getItem("userPassword"))
                },
                data: json,
                url: "https://nailingtest.herokuapp.com/cita/add",
                success: function (_data) {
                  console.log("Se ha realizado la reserva correctamente",order);
                  window.location.href = '/cita';
                },
              });
              break;
            case "NewCentre":
              const urlCentre = "https://nailingtest.herokuapp.com/centros/add/" + sessionStorage("userId");
              postData(urlCentre, json, {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(sessionStorage.getItem("userName") + ":" + sessionStorage.getItem("userPassword"))
              });
              break;
            default:
              break;
          }
          
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [json, money, paymentType]);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
 
}
