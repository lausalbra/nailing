import { RegistroCentroForm } from "../../components/RegistroCentroForm"
import { Card } from "../../components/Card"
import { Header } from "../../components/Header"
import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter'

export function CentroAdd({ params }) {
    const { id } = params
    return (
        <>
            <Header />
            <Card title="Registrar centro" component={<RegistroCentroForm id={id} />}>
            </Card>
        </>



    )
}
