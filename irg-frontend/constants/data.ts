export type Restaurante = {
    name: string;
    ranking: number;
    menu: string[];
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
            { name: "Especiales del Chef", score: 4.3 },
        ]
    },
    "el-rey-de-los-tacos": {
        name: "El Rey de los Tacos",
        ranking: 4.5,
        menu: ["Tacos", "Nachos", "Salsas", "Bebidas"],
        logo: require('../assets/images/rey_de_los_tacos_logo.png'),
        topItems: [
            { name: 'Tacos al Pastor', score: 4.9 },
            { name: 'Nachos Especiales', score: 4.7 },
            { name: 'Guacamole', score: 4.5 },
            { name: 'Margarita', score: 4.4 },
            { name: 'Salsa Picante', score: 2.2 },
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
            { name: "Especiales del Chef", score: 4.1 },
        ]
    },
    "tacos2023": {
        name: "El Rey de los Tacos",
        ranking: 4.5,
        menu: ["Tacos", "Nachos", "Salsas", "Bebidas"],
        logo: require('../assets/images/rey_de_los_tacos_logo.png'),
        topItems: [
            { name: 'Tacos al Pastor', score: 4.9 },
            { name: 'Nachos Especiales', score: 4.7 },
            { name: 'Guacamole', score: 4.5 },
            { name: 'Margarita', score: 4.4 },
            { name: 'Salsa Picante', score: 4.2 },
        ]
    },
};

export const restaurantAliases: Record<string, string> = {
    astor2024: "astor",
    tacos2023: "el-rey-de-los-tacos"
};