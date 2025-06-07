export type Plato = {
    name: string
    description: string
    image: any
    category: string
    subCategory: string
    score?: number
}

export type Restaurante = {
    id?: number
    name: string
    ranking: number
    menu: string[]
    platos: Plato[]
    logo: any
    topItems: { name: string; score: number }[]
}

const astorPlatos: Plato[] = [
    {
        name: "Bruschettas",
        description: "Pan tostado con tomate, albahaca y aceite de oliva",
        image: require('../assets/images/bruschettas.png'),
        category: "Entrantes",
        subCategory: "Frio",
        score: 4.8
    },
    {
        name: "Ravioles de Ricota",
        description: "Pasta casera rellena con ricota y espinaca, salsa fileto.",
        image: require('../assets/images/ravioles_ricota.png'),
        category: "Primeros",
        subCategory: "Caliente",
        score: 4.7
    },
    {
        name: "Tiramisú",
        description: "Postre italiano con café, mascarpone y cacao.",
        image: require('../assets/images/tiramisu.png'),
        category: "Postres",
        subCategory: "Frio",
        score: 4.2
    },
    {
        name: "Vino Malbec",
        description: "Botella de vino tinto argentino, ideal para carnes.",
        image: require('../assets/images/vino_malbec.png'),
        category: "Bebidas",
        subCategory: "Frio",
        score: 4.0
    }
]

const tacosPlatos: Plato[] = [
    {
        name: "Tacos al Pastor",
        description: "Tacos de cerdo marinado con piña y cebolla.",
        image: require('../assets/images/tacos_al_pastor.png'),
        category: "Primeros",
        subCategory: "Caliente",
        score: 4.9
    },
    {
        name: "Nachos Especiales",
        description: "Totopos con queso, jalapeños y guacamole.",
        image: require('../assets/images/nachos_especiales.png'),
        category: "Entrantes",
        subCategory: "Caliente",
        score: 4.6
    },
    {
        name: "Guacamole",
        description: "Salsa de aguacate con lima, tomate y cebolla.",
        image: require('../assets/images/guacamole.png'),
        category: "Entrantes",
        subCategory: "Frio",
        score: 4.5
    },
    {
        name: "Agua de Horchata",
        description: "Bebida de arroz con canela y leche.",
        image: require('../assets/images/agua_horchata.png'),
        category: "Bebidas",
        subCategory: "Frio",
        score: 4.0
    }
]

export const restaurantsData: Record<string, Restaurante> = {
    astor: {
        id: 1,
        name: "Astor",
        ranking: 4.8,
        menu: ["Entrantes", "Primeros", "Segundos", "Postres", "Bebidas"],
        logo: require('../assets/images/astor_logo.png'),
        platos: astorPlatos,
        topItems: astorPlatos
            .filter(p => p.score !== undefined)
            .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
            .slice(0, 5)
            .map(p => ({ name: p.name, score: p.score ?? 0 }))
    },
    "el-rey-de-los-tacos": {
        id: 2,
        name: "El Rey de los Tacos",
        ranking: 4.5,
        menu: ["Entrantes", "Primeros", "Segundos", "Postres", "Bebidas"],
        logo: require('../assets/images/rey_de_los_tacos_logo.png'),
        platos: tacosPlatos,
        topItems: tacosPlatos
            .filter(p => p.score !== undefined)
            .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
            .slice(0, 5)
            .map(p => ({ name: p.name, score: p.score ?? 0 }))
    }
}

export const restaurantAliases: Record<string, string> = {
    astor2024: "astor",
    tacos2023: "el-rey-de-los-tacos"
}