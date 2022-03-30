import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default class MyApp extends React.Component{
    render(){
        const onSuccess = (payment)=>{
            console.log('El pago se ha realizado', payment)
        }  
        const onCancel = (data)=>{
            console.log('El pago se ha cancelado',data)
        }  
        const onError = (err)=>{
            console.log('Error',err)
        }
        let env ='sandbox'
        let currency = 'EUR'
        let total =  22

        const client = {
            sandbox: 'ARCpRl6MHcl1bOhlxFRMWoNS7BBaOAcYyf2wSTqqcfeKz7qcw6Hbf4hw6QkN7IdWQqs0S9UjGo39nD_C',
            production: 'test',

        }       
        return(
            <PaypalExpressBtn
                env={env}
                client={client}
                currency={currency}
                total={total}
                onError={onError}
                onSuccess={onSuccess}
                onCancel={onCancel}
                />
        )
            } 
        
    
    
    }

