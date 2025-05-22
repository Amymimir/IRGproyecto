export type Plato = {
    name: string;
    description: string;
    image: string;
    category: string;
};

export type Restaurante = {
    name: string;
    ranking: number;
    menu: string[];
    platos: Plato[];
    logo: any;
    topItems: { name: string; score: number }[];
};

export const restaurantsData: Record<string, Restaurante> = {
    "astor": {
        name: "Astor",
        ranking: 4.8,
        menu: ["Entradas", "Principales", "Postres", "Bebidas"],
        logo: require('../assets/images/astor_logo.png'),
        topItems: [
            { name: "Principales", score: 4.8 },
            { name: "Entradas", score: 4.6 },
            { name: "Postres", score: 4.5 },
            { name: "Bebidas", score: 4.4 },
            { name: "Especiales del Chef", score: 4.3 }
        ],
        platos: [
            {
                name: "Bruschettas",
                description: "Pan tostado con tomate, albahaca y aceite de oliva.",
                image: "https://cdn.pixabay.com/photo/2017/05/07/08/56/bruschetta-2290795_1280.jpg",
                category: "Entradas"
            },
            {
                name: "Ravioles de Ricota",
                description: "Pasta casera rellena con ricota y espinaca, salsa fileto.",
                image: "https://cdn.pixabay.com/photo/2016/11/18/15/27/ravioli-1835473_1280.jpg",
                category: "Principales"
            },
            {
                name: "Tiramisú",
                description: "Postre italiano con café, mascarpone y cacao.",
                image: "https://cdn.pixabay.com/photo/2015/12/08/00/32/tiramisu-1081464_1280.jpg",
                category: "Postres"
            },
            {
                name: "Vino Malbec",
                description: "Botella de vino tinto argentino, ideal para carnes.",
                image: "https://cdn.pixabay.com/photo/2015/07/02/20/28/wine-828405_1280.jpg",
                category: "Bebidas"
            }
        ]
    },
    "el-rey-de-los-tacos": {
        name: "El Rey de los Tacos",
        ranking: 4.5,
        menu: ["Tacos", "Nachos", "Salsas", "Bebidas"],
        logo: require('../assets/images/rey_de_los_tacos_logo.png'),
        topItems: [
            { name: "Tacos al Pastor", score: 4.9 },
            { name: "Nachos Especiales", score: 4.7 },
            { name: "Guacamole", score: 4.5 },
            { name: "Margarita", score: 4.4 },
            { name: "Salsa Picante", score: 2.2 }
        ],
        platos: [
            {
                name: "Tacos al Pastor",
                description: "Tacos de cerdo marinado con piña y cebolla.",
                image: "https://cdn.pixabay.com/photo/2022/03/12/17/32/tacos-7063254_1280.jpg",
                category: "Tacos"
            },
            {
                name: "Nachos Especiales",
                description: "Totopos con queso, jalapeños, guacamole y carne.",
                image: "https://cdn.pixabay.com/photo/2016/11/29/03/35/nachos-1867395_1280.jpg",
                category: "Nachos"
            },
            {
                name: "Salsa Picante",
                description: "Salsa roja casera con chiles mexicanos.",
                image: "https://cdn.pixabay.com/photo/2018/04/01/20/44/salsa-3284162_1280.jpg",
                category: "Salsas"
            },
            {
                name: "Margarita",
                description: "Cóctel mexicano con tequila, limón y sal.",
                image: "https://cdn.pixabay.com/photo/2015/07/30/12/58/margarita-867944_1280.jpg",
                category: "Bebidas"
            }
        ]
    },
    "astor2024": {
        name: "Astor",
        ranking: 4.8,
        menu: ["Entradas", "Principales", "Postres", "Bebidas"],
        logo: require('../assets/images/astor_logo.png'),
        topItems: [
            { name: "Principales", score: 4.8 },
            { name: "Entradas", score: 4.6 },
            { name: "Postres", score: 4.5 },
            { name: "Bebidas", score: 4.4 },
            { name: "Especiales del Chef", score: 4.3 }
        ],
        platos: [
            {
                name: "Bruschettas",
                description: "Pan tostado con tomate, albahaca y aceite de oliva.",
                image: "https://cdn.pixabay.com/photo/2017/05/07/08/56/bruschetta-2290795_1280.jpg",
                category: "Entradas"
            },
            {
                name: "Ravioles de Ricota",
                description: "Pasta casera rellena con ricota y espinaca, salsa fileto.",
                image: "https://cdn.pixabay.com/photo/2016/11/18/15/27/ravioli-1835473_1280.jpg",
                category: "Principales"
            },
            {
                name: "Tiramisú",
                description: "Postre italiano con café, mascarpone y cacao.",
                image: "https://cdn.pixabay.com/photo/2015/12/08/00/32/tiramisu-1081464_1280.jpg",
                category: "Postres"
            },
            {
                name: "Vino Malbec",
                description: "Botella de vino tinto argentino, ideal para carnes.",
                image: "https://cdn.pixabay.com/photo/2015/07/02/20/28/wine-828405_1280.jpg",
                category: "Bebidas"
            }
        ]
    },
    "tacos2023": {
        name: "El Rey de los Tacos",
        ranking: 4.5,
        menu: ["Tacos", "Nachos", "Salsas", "Bebidas"],
        logo: require('../assets/images/rey_de_los_tacos_logo.png'),
        topItems: [
            { name: "Tacos al Pastor", score: 4.9 },
            { name: "Nachos Especiales", score: 4.7 },
            { name: "Guacamole", score: 4.5 },
            { name: "Margarita", score: 4.4 },
            { name: "Salsa Picante", score: 2.2 }
        ],
        platos: [
            {
                name: "Tacos al Pastor",
                description: "Tacos de cerdo marinado con piña y cebolla.",
                image: "https://cdn.pixabay.com/photo/2022/03/12/17/32/tacos-7063254_1280.jpg",
                category: "Tacos"
            },
            {
                name: "Nachos Especiales",
                description: "Totopos con queso, jalapeños, guacamole y carne.",
                image: "https://cdn.pixabay.com/photo/2016/11/29/03/35/nachos-1867395_1280.jpg",
                category: "Nachos"
            },
            {
                name: "Salsa Picante",
                description: "Salsa roja casera con chiles mexicanos.",
                image: "https://cdn.pixabay.com/photo/2018/04/01/20/44/salsa-3284162_1280.jpg",
                category: "Salsas"
            },
            {
                name: "Margarita",
                description: "Cóctel mexicano con tequila, limón y sal.",
                image: "https://cdn.pixabay.com/photo/2015/07/30/12/58/margarita-867944_1280.jpg",
                category: "Bebidas"
            }
        ]
    }
};

export const restaurantAliases: Record<string, string> = {
    astor2024: "astor",
    tacos2023: "el-rey-de-los-tacos"
};