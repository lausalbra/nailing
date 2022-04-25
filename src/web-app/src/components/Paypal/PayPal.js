import React, { useRef, useEffect } from "react";
import { postData, putData } from '../../services/common/common'
import $ from 'jquery';
import { useLocation } from 'wouter'

export default function Paypal({ json, money, paymentType }) {

  const paypal = useRef();

  //Obtengo usuario desencriptado
  var cryptoJS = require("crypto-js");
  const user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))

  const [locationPath, locationPush] = useLocation()

  console.log(user)
  console.log("JSON EN PAYPAL", json)

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
                  "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
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
              const urlCentre = "https://nailingtest.herokuapp.com/centros/add/" + user.id.toString();
              postData(urlCentre, json, {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
              }).then(async function () {
                const url = "https://nailingtest.herokuapp.com/login";
                const body = {
                  "user": user.usuario,
                  "password": user.contrasenya
                }
                const headers = {
                  "Content-Type": "application/json",
                  "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
                }
                const contrasenya = user.contrasenya;
                await postData(url, body, {
                  "Content-Type": "application/json",
                }).then(async function (data) {
      
                const user = data
                user.contrasenya = contrasenya;

                let result = cryptoJS.AES.encrypt(JSON.stringify(user), "NAILING");

                sessionStorage.setItem("userEncriptado", result)
                sessionStorage.setItem("isLogged", true)
    
                  //Hago la llamada con oauth
  
                  await postData(url, body, headers)
  
                  window.location.href = '/usuario';
                });
              });
              break;

            case "BuyPackage":
              const headers = {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
              }

              const urlEditCentro = "https://nailingtest.herokuapp.com/centros/edit"
              const res = await putData(urlEditCentro, json, headers)
                .then(res => {

                  alert("Se ha realizado su compra correctamente \n Es necesario restaurar la sesión para actualizar sus datos \n Disculpe las molestias \n Muchas gracias por confiar en Nailing")

                  return res
                }).catch(ex => {
                  console.log(ex)
                })


              const urlLogout = "https://nailingtest.herokuapp.com/logout"

              const body = {
                "id": user.id,
                "usuario": user.usuario,
                "contrasenya": user.contrasenya,
                "email": user.email,
                "telefono": user.telefono,
                "rol": user.rol
              }


              await postData(urlLogout, body, headers)
                .then(function (_data) {
                }
                  //Tiene que ir al catch porque devuelve 204 y lo pilla como error
                ).catch((_error) => {
                  sessionStorage.setItem("userEncriptado", "")
                  sessionStorage.setItem("isLogged", false)
                  locationPush('/')
                }
                );
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
