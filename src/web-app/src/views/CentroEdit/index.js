import { CentroEditForm } from "../../components/CentroEditForm"
import { Card } from "../../components/Card"
import { Header } from "../../components/Header"
import React from 'react';

export function CentroEdit({ params }) {
    const { id } = params
    return (
        <>
            <Header />
            <Card title="Editar detalles del centro" component={<CentroEditForm id={id}/>} className="font-josefin-sans">
            </Card>
        </>



    )
}
