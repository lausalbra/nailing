import React, { useRef, useEffect } from "react";
import { postData } from '../../services/common/common'
import $ from 'jquery'; 

export default function Paypal({json, money, paymentType}) {
 //Obtengo usuario desencriptado
  var cryptoJS = require("crypto-js");
  const user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))

  const paypal = useRef();

  console.log("=======================================He entrado en paypal=======================================")
  console.log(json, money, paymentType)

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
            case "Reserve":
              $.ajax({
                method: "POST",
                contentType: "application/json",
                headers: {
                    "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
                },
                data: json,
                url: "https://nailingtest.herokuapp.com/cita/add",
                success: function (_data) {
                  console.log("Se ha realizado la reserva correctamente",order);
                  window.location.href = '/miscitas';
                },
              });
              break;
            case "NewCentre":
              const urlCentre = "https://nailingtest.herokuapp.com/centros/add/" + user.id;
              postData(urlCentre, json, {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
              });
              window.location.href = '/usuario';
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
