/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { API_URL, RequestManager } from '../../components/RestUtils'
import { Servicio } from '../../components/Servicio'
import { ServiciosBox } from '../../components/ServiciosBox'
import { RegistroServiciosCentroForm } from '../RegistroServiciosCentroForm'

export function ServiciosList() {

    const centerId = sessionStorage.getItem('userCenter')

    const [listTipos, setTipos] = useState([])
    const [updaterTipos, updateTipos] = useState(0)
    const [listBases, setBases] = useState([])
    const [updaterBases, updateBases] = useState(0)
    const [listDisenos, setDisenos] = useState([])
    const [updaterDisenos, updateDisenos] = useState(0)
    const [listFormas, setFormas] = useState([])
    const [updaterFormas, updateFormas] = useState(0)
    const [listTamanos, setTamanos] = useState([])
    const [updaterTamanos, updateTamanos] = useState(0)
    const [listDecoraciones, setDecoraciones] = useState([])
    const [updaterDecoraciones, updateDecoraciones] = useState(0)
    const [listAcabados, setAcabados] = useState([])
    const [updaterAcabados, updateAcabados] = useState(0)
    // eslint-disable-next-line no-unused-vars
    const [locationPath, locationPush] = useLocation()

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const updater = {
        'tipos' : async function() { await sleep(500); updateTipos(updaterTipos + 1) },
        'bases' : async function() { await sleep(500); updateBases(updaterBases + 1) },
        'disenyos' : async function() { await sleep(500); updateDisenos(updaterDisenos + 1) },
        'formas' : async function() { await sleep(500); updateFormas(updaterFormas + 1) },
        'tamanyos' : async function() { await sleep(500); updateTamanos(updaterTamanos + 1) },
        'decoraciones' : async function() { await sleep(500); updateDecoraciones(updaterDecoraciones + 1) },
        'acabados' : async function() { await sleep(500); updateAcabados(updaterAcabados + 1) }
    }

    const url_tipos = API_URL + '/tipos/centro/' + centerId + '/list'
    useEffect(() => {
        RequestManager(url_tipos, 'GET', 'ServiciosList (tipos)', null, locationPush, (items) => setTipos(items), null)
      }, [updaterTipos])
    
    const url_bases = API_URL + '/bases/centro/' + centerId + '/list'
    useEffect(() => {
        RequestManager(url_bases, 'GET', 'ServiciosList (bases)', null, locationPush, (items) => setBases(items), null)
      }, [updaterBases])

    const url_disenos = API_URL + '/disenyos/centro/' + centerId + '/list'
    useEffect(() => {
        RequestManager(url_disenos, 'GET', 'ServiciosList (diseños)', null, locationPush, (items) => setDisenos(items), null) 
      }, [updaterDisenos])

    const url_formas = API_URL + '/formas/centro/' + centerId + '/list'
    useEffect(() => {
        RequestManager(url_formas, 'GET', 'ServiciosList (formas)', null, locationPush, (items) => setFormas(items), null)
      }, [updaterFormas])
    
    const url_tamanos = API_URL + '/tamanyos/centro/' + centerId + '/list'
    useEffect(() => {
         RequestManager(url_tamanos, 'GET', 'ServiciosList (tamaños)', null, locationPush, (items) => setTamanos(items), null) 
      }, [updaterTamanos])

    const url_decoraciones = API_URL + '/decoraciones/centro/' + centerId + '/list'
    useEffect(() => {
        RequestManager(url_decoraciones, 'GET', 'ServiciosList (decoraciones)', null, locationPush, (items) => setDecoraciones(items), null)
      }, [updaterDecoraciones])
    
    const url_acabados = API_URL + '/acabados/centro/' + centerId + '/list'
    useEffect(() => {
          RequestManager(url_acabados, 'GET', 'ServiciosList (acabados)', null, locationPush, (items) => setAcabados(items), null)
      }, [updaterAcabados])
    
    function getForms(data, semiurl) {
        let agrupados = {}
        data.forEach(function(value) {
            var key = value.tiempo + '-' + value.coste
    
            if(!agrupados[key]) {
                agrupados[key] = [value]
            } else {
                let elements = agrupados[key]
                elements.push(value)
                agrupados[key] = elements
            }
        })

        return Object.keys(agrupados).map(function(key) {
            return <Servicio key={key}
                personalizaciones={agrupados[key]}
                deleteFunc={() => borrarServicio(agrupados[key], semiurl)}/>
        })
    }

    function borrarServicio (servicios, semiurl) {
        servicios.forEach(function(ser) {
            const url_del = API_URL + '/' + semiurl + '/delete/' + ser.id
            RequestManager(url_del, 'DELETE', 'ServiciosList (delete)', null, locationPush, null, null)
        })
        updater[semiurl]()
    }

    return (
        <>
            <ServiciosBox title="TIPOS" pers={getForms(listTipos, 'tipos')}/>
            <ServiciosBox title="BASES" pers={getForms(listBases, 'bases')}/>
            <ServiciosBox title="DISEÑOS" pers={getForms(listDisenos, 'disenyos')}/>
            <ServiciosBox title="FORMAS" pers={getForms(listFormas, 'formas')}/>
            <ServiciosBox title="TAMAÑOS" pers={getForms(listTamanos, 'tamanyos')}/>
            <ServiciosBox title="DECORACIONES" pers={getForms(listDecoraciones, 'decoraciones')}/>
            <ServiciosBox title="ACABADOS" pers={getForms(listAcabados, 'acabados')}/>
            <RegistroServiciosCentroForm updater={updater}/>
        </>
    )

}