export type Plato = {
    name: string
    description: string
    image: any
    category: string
    score?: number
}

export type Restaurante = {
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
        category: "Entradas",
        score: 4.8
    },
    {
        name: "Carpaccio de Ternera",
        description: "Finas láminas de ternera con parmesano y rúcula.",
        image: require('../assets/images/carpaccio_ternera.png'),
        category: "Entradas",
        score: 4.4
    },
    {
        name: "Croquetas de Jamón",
        description: "Croquetas caseras con jamón ibérico.",
        image: require('../assets/images/croquetas_jamon.png'),
        category: "Entradas",
        score: 4.3
    },
    {
        name: "Ravioles de Ricota",
        description: "Pasta casera rellena con ricota y espinaca, salsa fileto.",
        image: require('../assets/images/ravioles_ricota.png'),
        category: "Principales",
        score: 4.7
    },
    {
        name: "Solomillo al Malbec",
        description: "Solomillo de ternera con salsa de vino tinto.",
        image: require('../assets/images/solomillo_malbec.png'),
        category: "Principales",
        score: 4.6
    },
    {
        name: "Risotto de Setas",
        description: "Arroz cremoso con mezcla de setas y parmesano.",
        image: require('../assets/images/risotto_setas.png'),
        category: "Principales",
        score: 4.5
    },
    {
        name: "Tiramisú",
        description: "Postre italiano con café, mascarpone y cacao.",
        image: require('../assets/images/tiramisu.png'),
        category: "Postres",
        score: 4.2
    },
    {
        name: "Panqueque de Dulce de Leche",
        description: "Clásico panqueque relleno de dulce de leche.",
        image: require('../assets/images/panqueque_dulce.png'),
        category: "Postres",
        score: 4.1
    },
    {
        name: "Flan Casero",
        description: "Con crema y caramelo líquido.",
        image: require('../assets/images/flan_casero.png'),
        category: "Postres",
        score: 4.3
    },
    {
        name: "Vino Malbec",
        description: "Botella de vino tinto argentino, ideal para carnes.",
        image: require('../assets/images/vino_malbec.png'),
        category: "Bebidas",
        score: 4.0
    },
    {
        name: "Agua Mineral",
        description: "Botella de agua natural sin gas.",
        image: require('../assets/images/agua_mineral.png'),
        category: "Bebidas",
        score: 3.8
    },
    {
        name: "Spritz",
        description: "Cóctel italiano con Aperol, prosecco y soda.",
        image: require('../assets/images/spritz.png'),
        category: "Bebidas",
        score: 4.2
    }
]

const tacosPlatos: Plato[] = [
    {
        name: "Tacos al Pastor",
        description: "Tacos de cerdo marinado con piña y cebolla.",
        image: require('../assets/images/tacos_al_pastor.png'),
        category: "Tacos",
        score: 4.9
    },
    {
        name: "Tacos de Pollo",
        description: "Tortilla con pollo grillado, pico de gallo y queso.",
        image: require('../assets/images/tacos_pollo.png'),
        category: "Tacos",
        score: 4.4
    },
    {
        name: "Tacos Veganos",
        description: "Tortilla con guiso de lentejas, palta y lechuga.",
        image: require('../assets/images/tacos_veganos.png'),
        category: "Tacos",
        score: 4.3
    },
    {
        name: "Nachos Especiales",
        description: "Totopos con queso, jalapeños, guacamole y carne.",
        image: require('../assets/images/nachos_especiales.png'),
        category: "Nachos",
        score: 4.7
    },
    {
        name: "Nachos Clásicos",
        description: "Totopos con queso cheddar derretido.",
        image: require('../assets/images/nachos_clasicos.png'),
        category: "Nachos",
        score: 4.1
    },
    {
        name: "Nachos con Chili",
        description: "Totopos con frijoles picantes y crema agria.",
        image: require('../assets/images/nachos_con_chili.png'),
        category: "Nachos",
        score: 4.0
    },
    {
        name: "Salsa Picante",
        description: "Salsa roja casera con chiles mexicanos.",
        image: require('../assets/images/salsa_picante.png'),
        category: "Salsas",
        score: 4.2
    },
    {
        name: "Guacamole",
        description: "Salsa de aguacate con lima, tomate y cebolla.",
        image: require('../assets/images/guacamole.png'),
        category: "Salsas",
        score: 4.5
    },
    {
        name: "Salsa Verde",
        description: "Salsa mexicana con tomatillo y cilantro.",
        image: require('../assets/images/salsa_verde.png'),
        category: "Salsas",
        score: 4.1
    },
    {
        name: "Margarita",
        description: "Cóctel mexicano con tequila, limón y sal.",
        image: require('../assets/images/margarita.png'),
        category: "Bebidas",
        score: 4.4
    },
    {
        name: "Agua de Horchata",
        description: "Bebida de arroz, canela y leche.",
        image: require('../assets/images/agua_horchata.png'),
        category: "Bebidas",
        score: 4.0
    },
    {
        name: "Cerveza Mexicana",
        description: "Botella de cerveza estilo lager.",
        image: require('../assets/images/cerveza_mexicana.png'),
        category: "Bebidas",
        score: 4.2
    }
]

export const restaurantsData: Record<string, Restaurante> = {
    astor: {
        name: "Astor",
        ranking: 4.8,
        menu: ["Entradas", "Principales", "Postres", "Bebidas"],
        logo: require('../assets/images/astor_logo.png'),
        topItems: astorPlatos
            .filter(p => p.score !== undefined)
            .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
            .slice(0, 5)
            .map(p => ({ name: p.name, score: p.score ?? 0 })),
        platos: astorPlatos
    },
    astor2024: {
        name: "Astor",
        ranking: 4.8,
        menu: ["Entradas", "Principales", "Postres", "Bebidas"],
        logo: require('../assets/images/astor_logo.png'),
        topItems: astorPlatos
            .filter(p => p.score !== undefined)
            .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
            .slice(0, 5)
            .map(p => ({ name: p.name, score: p.score ?? 0 })),
        platos: astorPlatos
    },
    "el-rey-de-los-tacos": {
        name: "El Rey de los Tacos",
        ranking: 4.5,
        menu: ["Tacos", "Nachos", "Salsas", "Bebidas"],
        logo: require('../assets/images/rey_de_los_tacos_logo.png'),
        topItems: tacosPlatos
            .filter(p => p.score !== undefined)
            .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
            .slice(0, 5)
            .map(p => ({ name: p.name, score: p.score ?? 0 })),
        platos: tacosPlatos
    },
    tacos2023: {
        name: "El Rey de los Tacos",
        ranking: 4.5,
        menu: ["Tacos", "Nachos", "Salsas", "Bebidas"],
        logo: require('../assets/images/rey_de_los_tacos_logo.png'),
        topItems: tacosPlatos
            .filter(p => p.score !== undefined)
            .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
            .slice(0, 5)
            .map(p => ({ name: p.name, score: p.score ?? 0 })),
        platos: tacosPlatos
    }
}

export const restaurantAliases: Record<string, string> = {
    astor2024: "astor",
    tacos2023: "el-rey-de-los-tacos"
}