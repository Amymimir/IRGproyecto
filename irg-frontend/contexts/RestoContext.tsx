import { createContext, useContext, useState, ReactNode } from 'react';
import { restaurantsData, Restaurante, Plato } from '../constants/data';

type RestoContextType = {
    restaurantes: Record<string, Restaurante>;
    actualizarPlato: (codigo: string, index: number, nuevoPlato: Plato) => void;
    agregarPlato: (codigo: string, nuevoPlato: Plato) => void;
    eliminarPlato: (codigo: string, index: number) => void;
};

const RestoContext = createContext<RestoContextType | undefined>(undefined);

export function RestoProvider({ children }: { children: ReactNode }) {
    const [restaurantes, setRestaurantes] = useState(restaurantsData);

    const actualizarPlato = (codigo: string, index: number, nuevoPlato: Plato) => {
        setRestaurantes(prev => {
            const copia = { ...prev };
            copia[codigo].platos[index] = nuevoPlato;
            return copia;
        });
    };

    const agregarPlato = (codigo: string, nuevoPlato: Plato) => {
        setRestaurantes(prev => {
            const copia = { ...prev };
            copia[codigo].platos.push(nuevoPlato);
            return copia;
        });
    };

    const eliminarPlato = (codigo: string, index: number) => {
        setRestaurantes(prev => {
            const copia = { ...prev };
            copia[codigo].platos.splice(index, 1);
            return copia;
        });
    };

    return (
        <RestoContext.Provider value={{ restaurantes, actualizarPlato, agregarPlato, eliminarPlato }}>
            {children}
        </RestoContext.Provider>
    );
}

export function useRestaurantes() {
    const context = useContext(RestoContext);
    if (!context) throw new Error('useRestaurantes debe usarse dentro de RestoProvider');
    return context;
}