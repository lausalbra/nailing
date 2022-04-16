import { RegistroCentroForm } from "../../components/RegistroCentroForm"
import { Card } from "../../components/Card"
import { Header } from "../../components/Header"
import React from 'react';

export function CentroAdd() {
    return (
        <>
            <Header />
            <Card title="Registrar centro" component={<RegistroCentroForm />} className="font-josefin-sans">
            </Card>
        </>



    )
}
