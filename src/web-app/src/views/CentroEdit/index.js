import { CentroEditForm } from "../../components/CentroEditForm"
import { Card } from "../../components/Card"
import { Header } from "../../components/Header"
import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter'

export function CentroEdit({ params }) {
    const { id } = params
    return (
        <>
            <Header />
            <Card title="Editar detalles del centro" component={<CentroEditForm id={id} />}>
            </Card>
        </>



    )
}
