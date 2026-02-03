import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import Padreadores from '../components/Padreadores'
import Matrizes from '../components/Matrizes'
import Filhotes from '../components/Filhotes'
import NossoCanil from '../components/NossoCanil'
import ConsultoriaVeterinaria from '../components/ConsultoriaVeterinaria'
import Loja from '../components/Loja'
import Depoimentos from '../components/Depoimentos'
import Contato from '../components/Contato'
import SectionDivider from '../components/SectionDivider'

export default function Home() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [hash])

  return (
    <main className="pt-[6rem] sm:pt-[7rem]">
      <Hero />
      <SectionDivider />
      <Padreadores />
      <SectionDivider />
      <Matrizes />
      <SectionDivider />
      <Filhotes />
      <SectionDivider />
      <NossoCanil />
      <SectionDivider />
      <ConsultoriaVeterinaria />
      <SectionDivider />
      <Loja />
      <SectionDivider />
      <Depoimentos />
      <SectionDivider />
      <Contato />
    </main>
  )
}
