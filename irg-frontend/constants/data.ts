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

const astorPlatos: Plato[] = [
    {
        name: "Bruschettas",
        description: "Pan tostado con tomate, albahaca y aceite de oliva.",
        image: "https://cdn.pixabay.com/photo/2017/05/07/08/56/bruschetta-2290795_1280.jpg",
        category: "Entradas"
    },
    {
        name: "Carpaccio de Ternera",
        description: "Finas láminas de ternera con parmesano y rúcula.",
        image: "https://cdn.pixabay.com/photo/2017/06/17/18/08/carpaccio-2410510_1280.jpg",
        category: "Entradas"
    },
    {
        name: "Croquetas de Jamón",
        description: "Croquetas caseras con jamón ibérico.",
        image: "https://cdn.pixabay.com/photo/2020/02/23/10/42/croquettes-4873262_1280.jpg",
        category: "Entradas"
    },
    {
        name: "Ravioles de Ricota",
        description: "Pasta casera rellena con ricota y espinaca, salsa fileto.",
        image: "https://cdn.pixabay.com/photo/2016/11/18/15/27/ravioli-1835473_1280.jpg",
        category: "Principales"
    },
    {
        name: "Solomillo al Malbec",
        description: "Solomillo de ternera con salsa de vino tinto.",
        image: "https://cdn.pixabay.com/photo/2020/02/27/08/14/steak-4882696_1280.jpg",
        category: "Principales"
    },
    {
        name: "Risotto de Setas",
        description: "Arroz cremoso con mezcla de setas y parmesano.",
        image: "https://cdn.pixabay.com/photo/2017/06/02/18/24/risotto-2360814_1280.jpg",
        category: "Principales"
    },
    {
        name: "Tiramisú",
        description: "Postre italiano con café, mascarpone y cacao.",
        image: "https://cdn.pixabay.com/photo/2015/12/08/00/32/tiramisu-1081464_1280.jpg",
        category: "Postres"
    },
    {
        name: "Panqueque de Dulce de Leche",
        description: "Clásico panqueque relleno de dulce de leche.",
        image: "https://cdn.pixabay.com/photo/2016/03/05/20/02/crepes-1238736_1280.jpg",
        category: "Postres"
    },
    {
        name: "Flan Casero",
        description: "Con crema y caramelo líquido.",
        image: "https://cdn.pixabay.com/photo/2017/10/10/21/46/flan-2839229_1280.jpg",
        category: "Postres"
    },
    {
        name: "Vino Malbec",
        description: "Botella de vino tinto argentino, ideal para carnes.",
        image: "https://cdn.pixabay.com/photo/2015/07/02/20/28/wine-828405_1280.jpg",
        category: "Bebidas"
    },
    {
        name: "Agua Mineral",
        description: "Botella de agua natural sin gas.",
        image: "https://cdn.pixabay.com/photo/2016/02/23/17/59/water-1215051_1280.jpg",
        category: "Bebidas"
    },
    {
        name: "Spritz",
        description: "Cóctel italiano con Aperol, prosecco y soda.",
        image: "https://cdn.pixabay.com/photo/2022/01/05/10/24/spritz-6917139_1280.jpg",
        category: "Bebidas"
    },
];

const tacosPlatos: Plato[] = [
    {
        name: "Tacos al Pastor",
        description: "Tacos de cerdo marinado con piña y cebolla.",
        image: "https://cdn.pixabay.com/photo/2022/03/12/17/32/tacos-7063254_1280.jpg",
        category: "Tacos"
    },
    {
        name: "Tacos de Pollo",
        description: "Tortilla con pollo grillado, pico de gallo y queso.",
        image: "https://cdn.pixabay.com/photo/2022/05/07/14/52/taco-7179305_1280.jpg",
        category: "Tacos"
    },
    {
        name: "Tacos Veganos",
        description: "Tortilla con guiso de lentejas, palta y lechuga.",
        image: "https://cdn.pixabay.com/photo/2020/07/17/10/05/tacos-5413300_1280.jpg",
        category: "Tacos"
    },
    {
        name: "Nachos Especiales",
        description: "Totopos con queso, jalapeños, guacamole y carne.",
        image: "https://cdn.pixabay.com/photo/2016/11/29/03/35/nachos-1867395_1280.jpg",
        category: "Nachos"
    },
    {
        name: "Nachos Clásicos",
        description: "Totopos con queso cheddar derretido.",
        image: "https://cdn.pixabay.com/photo/2020/09/16/04/52/nachos-5573974_1280.jpg",
        category: "Nachos"
    },
    {
        name: "Nachos con Chili",
        description: "Totopos con frijoles picantes y crema agria.",
        image: "https://cdn.pixabay.com/photo/2016/11/20/09/06/nachos-1837477_1280.jpg",
        category: "Nachos"
    },
    {
        name: "Salsa Picante",
        description: "Salsa roja casera con chiles mexicanos.",
        image: "https://cdn.pixabay.com/photo/2018/04/01/20/44/salsa-3284162_1280.jpg",
        category: "Salsas"
    },
    {
        name: "Guacamole",
        description: "Salsa de aguacate con lima, tomate y cebolla.",
        image: "https://cdn.pixabay.com/photo/2016/11/18/15/17/guacamole-1834641_1280.jpg",
        category: "Salsas"
    },
    {
        name: "Salsa Verde",
        description: "Salsa mexicana con tomatillo y cilantro.",
        image: "https://cdn.pixabay.com/photo/2015/05/03/12/45/avocado-751908_1280.jpg",
        category: "Salsas"
    },
    {
        name: "Margarita",
        description: "Cóctel mexicano con tequila, limón y sal.",
        image: "https://cdn.pixabay.com/photo/2015/07/30/12/58/margarita-867944_1280.jpg",
        category: "Bebidas"
    },
    {
        name: "Agua de Horchata",
        description: "Bebida de arroz, canela y leche.",
        image: "https://cdn.pixabay.com/photo/2020/03/27/06/35/horchata-4970974_1280.jpg",
        category: "Bebidas"
    },
    {
        name: "Cerveza Mexicana",
        description: "Botella de cerveza estilo lager.",
        image: "https://cdn.pixabay.com/photo/2016/03/05/20/07/beer-1238756_1280.jpg",
        category: "Bebidas"
    }
];

export const restaurantsData: Record<string, Restaurante> = {
    "astor": {
        name: "Astor",
        ranking: 4.8,
        menu: ["Entradas", "Principales", "Postres", "Bebidas"],
        logo: require('../assets/images/astor_logo.png'),
        topItems: [],
        platos: astorPlatos
    },
    "astor2024": {
        name: "Astor",
        ranking: 4.8,
        menu: ["Entradas", "Principales", "Postres", "Bebidas"],
        logo: require('../assets/images/astor_logo.png'),
        topItems: [],
        platos: astorPlatos
    },
    "el-rey-de-los-tacos": {
        name: "El Rey de los Tacos",
        ranking: 4.5,
        menu: ["Tacos", "Nachos", "Salsas", "Bebidas"],
        logo: require('../assets/images/rey_de_los_tacos_logo.png'),
        topItems: [],
        platos: tacosPlatos
    },
    "tacos2023": {
        name: "El Rey de los Tacos",
        ranking: 4.5,
        menu: ["Tacos", "Nachos", "Salsas", "Bebidas"],
        logo: require('../assets/images/rey_de_los_tacos_logo.png'),
        topItems: [],
        platos: tacosPlatos
    }
};

export const restaurantAliases: Record<string, string> = {
    astor2024: "astor",
    tacos2023: "el-rey-de-los-tacos"
};