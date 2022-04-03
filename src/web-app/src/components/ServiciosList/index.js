import React, { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { API_URL, RequestManager } from '../../components/RestUtils'
import { Servicio } from '../../components/Servicio'
import { RegistroServiciosCentroForm } from "../RegistroServiciosCentroForm"

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

    const updater = {
        'tipos' : function() { updateTipos(updaterTipos + 1) },
        'bases' : function() { updateBases(updaterBases + 1) },
        'disenyos' : function() { updateDisenos(updaterDisenos + 1) },
        'formas' : function() { updateFormas(updaterFormas + 1) },
        'tamanyos' : function() { updateTamanos(updaterTamanos + 1) },
        'decoraciones' : function() { updateDecoraciones(updaterDecoraciones + 1) },
        'acabados' : function() { updateAcabados(updaterAcabados + 1) }
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
            <h1><strong>TIPOS</strong></h1>
            {getForms(listTipos, 'tipos')}
            <h1><strong>BASES</strong></h1>
            {getForms(listBases, 'bases')}
            <h1><strong>DISEÑOS</strong></h1>
            {getForms(listDisenos, 'disenyos')}
            <h1><strong>FORMAS</strong></h1>
            {getForms(listFormas, 'formas')}
            <h1><strong>TAMAÑOS</strong></h1>
            {getForms(listTamanos, 'tamanyos')}
            <h1><strong>DECORACIONES</strong></h1>
            {getForms(listDecoraciones, 'decoraciones')}
            <h1><strong>ACABADOS</strong></h1>
            {getForms(listAcabados, 'acabados')}
            <RegistroServiciosCentroForm updater={updater}/>
        </>
    )

}