import React, { useRef, useEffect } from "react";
import { postData, putData } from '../../services/common/common'
import $ from 'jquery';
import { useLocation } from 'wouter'

export default function Paypal({ json, money, paymentType }) {

  const paypal = useRef();

  //Obtengo usuario desencriptado
  var cryptoJS = require("crypto-js");

  let user

  try {
    user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))
  } catch (error) {
    user = {
      contrasenya: null,
      email: null,
      id: null,
      rol: null,
      telefono: null,
      usuario: null,
      centro: null
    }
  }


  const [locationPath, locationPush] = useLocation()
  console.log(locationPath);

  console.log(user)
  console.log("JSON EN PAYPAL", json)

  const urlEditCentro = "https://nailingtest.herokuapp.com/centros/edit"
  const urlLogout = "https://nailingtest.herokuapp.com/logout"
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
  }

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
                success: function (__data) {
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
                const headers2 = {
                  "Content-Type": "application/json",
                  "Authorization": "Basic " + btoa(user.usuario + ":" + user.contrasenya)
                }
                const contrasenya = user.contrasenya;
                await postData(url, body, {
                  "Content-Type": "application/json",
                }).then(async function (data) {

                  const user2 = data
                  user2.contrasenya = contrasenya;

                  let result = cryptoJS.AES.encrypt(JSON.stringify(user2), "NAILING");

                  sessionStorage.setItem("userEncriptado", result)
                  sessionStorage.setItem("isLogged", true)

                  //Hago la llamada con oauth

                  await postData(url, body, headers2)

                  window.location.href = '/usuario';
                });
              });
              break;

            case "BuyPackage":


              const res = await putData(urlEditCentro, json, headers)
                .then(res2 => {
                  return res2
                }).catch(ex => {
                  console.log(ex)
                })
              console.log(res)

              locationPush("/logout")

              break;

            case "PagarCreditosAtrasados":

              await putData(urlEditCentro, json, headers)
                .then(res2 => {

                  return res2
                }).catch(ex => {
                  console.log(ex)
                })

              locationPush("/logout")

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
