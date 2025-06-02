import { createContext, useContext, useRef, useState } from 'react'

type SearchContextType = {
    nombresPlatos: string[]
    setNombresPlatos: (nombres: string[]) => void
    buscarYScroll: (nombre: string) => void
    setBuscarYScroll: (fn: (nombre: string) => void) => void
}

const SearchContext = createContext<SearchContextType>({
    nombresPlatos: [],
    setNombresPlatos: () => { },
    buscarYScroll: () => { },
    setBuscarYScroll: () => { },
})

export function CartaSearchProvider({ children }: { children: React.ReactNode }) {
    const [nombresPlatos, setNombresPlatos] = useState<string[]>([])
    const scrollFunctionRef = useRef<(nombre: string) => void>(() => { })

    const buscarYScroll = (nombre: string) => {
        scrollFunctionRef.current(nombre)
    }

    const setBuscarYScroll = (fn: (nombre: string) => void) => {
        scrollFunctionRef.current = fn
    }

    return (
        <SearchContext.Provider
            value={{ nombresPlatos, setNombresPlatos, buscarYScroll, setBuscarYScroll }}
        >
            {children}
        </SearchContext.Provider>
    )
}

export function useCartaSearch() {
    return useContext(SearchContext)
}