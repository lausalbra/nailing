export const API_URL = 'https://nailingtest.herokuapp.com'


/**
 * Realiza una petición REST
 * @param  {String} url Endpoint de la petición
 * @param  {String} method Método de la petición (GET, POST, DELETE)
 * @param  {String} origin Nombre del componente que ejecuta la función
 * @param  {String} destiny Ruta destino a la que redirigir después de ejecutar la petición
 * @param  {Function} locationPush Hook locationPush creado en el componente
 * @param  {Function} callback Función a ejecutar a partir del resultado de la petición
 * @param  {Object} post Objeto a enviar en la petición
 */
export function RequestManager(url, method, origin, destiny, locationPush, callback, post) {

    //Obtengo usuario desencriptado
    var cryptoJS = require("crypto-js");

    let user = {}

    if (sessionStorage.getItem("userEncriptado") !== null && sessionStorage.getItem("userEncriptado") !== "") {
        console.log(sessionStorage.getItem("userEncriptado"))
        user = JSON.parse(cryptoJS.AES.decrypt(sessionStorage.getItem("userEncriptado"), "NAILING").toString(cryptoJS.enc.Utf8))
    } else {
        user.rol = "empty"
    }

    const xhr = new XMLHttpRequest()
    const isLogged = sessionStorage.getItem("isLogged")
    xhr.open(method, url)
    if (isLogged === 'true') {
        xhr.setRequestHeader("Authorization", "Basic " + btoa(user.usuario + ":" + user.contrasenya))
    }
    xhr.send(post)
    xhr.onload = function () {
        if (this.status === 200) {
            try {
                console.log(origin + ': Petición Rest exitosa')
                if (method === 'GET') {
                    callback(JSON.parse(this.responseText))
                } else if (destiny !== null) {
                    locationPush(destiny)
                }
            } catch (e) {
                console.log(origin + ': Excepción capturada al procesar la petición REST')
                sessionStorage.setItem('errorMessage', 'Ha ocurrido una excepción procesando el endpoint [' + url + ']: ' + e)
                locationPush('/error')
            }
        } else {
            console.warn(origin + ': Error en la petición REST: ' + this.status)
            sessionStorage.setItem('errorMessage', 'El endpoint [' + url + '] ha devuelto error ' + this.status)
            locationPush('/error')
        }
    }
}