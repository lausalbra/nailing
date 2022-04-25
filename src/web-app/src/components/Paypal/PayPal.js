import React, { useRef, useEffect } from "react";
import { postData } from '../../services/common/common'
import $ from 'jquery';

export default function Paypal({ json, money, paymentType }) {

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
          switch (paymentType) {
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
                  console.log("Se ha realizado la reserva correctamente", order);
                  window.location.href = '/miscitas';
                },
              });
              break;
            case "NewCentre":
              const urlCentre = "https://nailingtest.herokuapp.com/centros/add/" + sessionStorage.getItem("userId");
              postData(urlCentre, json, {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(sessionStorage.getItem("userName") + ":" + sessionStorage.getItem("userPassword"))
              }).then(async function () {
                const url = "https://nailingtest.herokuapp.com/login";
                const body = {
                  "user": sessionStorage.getItem("userName"),
                  "password": sessionStorage.getItem("userPassword")
                }
                const headers = {
                  "Content-Type": "application/json",
                  "Authorization": "Basic " + btoa(sessionStorage.getItem("userName") + ":" + sessionStorage.getItem("userPassword"))
              }
                await postData(url, body, {
                  "Content-Type": "application/json",
                }).then(async function (data) {
      
                  const user = data
    
                  sessionStorage.setItem("userId", user.id)
                  sessionStorage.setItem("userName", user.usuario)
                  sessionStorage.setItem("userPassword", sessionStorage.getItem("userPassword"))
                  sessionStorage.setItem("userPasswordCoded", user.password)
                  sessionStorage.setItem("userEmail", user.email)
                  sessionStorage.setItem("userPhone", user.telefono)
                  sessionStorage.setItem("userRole", user.rol)
                  sessionStorage.setItem("userCenter", user.rol === "OWNER" ? user.centro.id : "")
                  sessionStorage.setItem("isLogged", true)
    
                  //Hago la llamada con oauth
  
                  await postData(url, body, headers)
  
                  window.location.href = '/usuario';
                });
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
