import { createContext, useContext, useState, ReactNode } from 'react'
import { restaurantsData, Restaurante, Plato } from '../constants/data'

type RestoContextType = {
    restaurantes: Record<string, Restaurante>
    actualizarPlato: (codigo: string, index: number, nuevoPlato: Plato) => void
    agregarPlato: (codigo: string, nuevoPlato: Plato) => void
    eliminarPlato: (codigo: string, index: number) => void
    votarPlato: (codigo: string, index: number, nuevoScore: number) => void
}

const RestoContext = createContext<RestoContextType | undefined>(undefined)

export function RestoProvider({ children }: { children: ReactNode }) {
    const [restaurantes, setRestaurantes] = useState(restaurantsData)

    const actualizarTopItems = (platos: Plato[]) => {
        return platos
            .filter(p => typeof p.score === 'number')
            .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
            .slice(0, 5)
            .map(p => ({ name: p.name, score: p.score ?? 0 }))
    }

    const actualizarPlato = (codigo: string, index: number, nuevoPlato: Plato) => {
        setRestaurantes(prev => {
            const copia = { ...prev }
            copia[codigo].platos[index] = nuevoPlato
            copia[codigo].topItems = actualizarTopItems(copia[codigo].platos)
            return copia
        })
    }

    const agregarPlato = (codigo: string, nuevoPlato: Plato) => {
        setRestaurantes(prev => {
            const copia = { ...prev }
            copia[codigo].platos.push(nuevoPlato)
            copia[codigo].topItems = actualizarTopItems(copia[codigo].platos)
            return copia
        })
    }

    const eliminarPlato = (codigo: string, index: number) => {
        setRestaurantes(prev => {
            const copia = { ...prev }
            copia[codigo].platos.splice(index, 1)
            copia[codigo].topItems = actualizarTopItems(copia[codigo].platos)
            return copia
        })
    }

    const votarPlato = (codigo: string, index: number, nuevoScore: number) => {
        setRestaurantes(prev => {
            const copia = { ...prev }
            const plato = copia[codigo].platos[index]

            if (plato.score === undefined) {
                plato.score = nuevoScore
            } else {
                plato.score = (plato.score + nuevoScore) / 2
            }

            copia[codigo].topItems = actualizarTopItems(copia[codigo].platos)
            return copia
        })
    }

    return (
        <RestoContext.Provider value={{ restaurantes, actualizarPlato, agregarPlato, eliminarPlato, votarPlato }}>
            {children}
        </RestoContext.Provider>
    )
}

export function useRestaurantes() {
    const context = useContext(RestoContext)
    if (!context) throw new Error('useRestaurantes debe usarse dentro de RestoProvider')
    return context
}