import { CenterDetails } from '../../components/CenterDetails'
import { Nombre } from '../../components/Nombre'
import foto from '../../static/Logo-Inicial.png'
import { Header } from '../../components/Header'

export function Centro () {
  return (
    <>
      <Header />
      <Nombre name='Name' />
      <CenterDetails image={foto} address='C/calle nº1' rating='3' />

    </>

  )
}
