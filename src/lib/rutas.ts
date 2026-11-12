export type Dificultad = 'fácil' | 'media' | 'alta';
export type Ruta = {
  slug: string; nombre: string; zona: string; km: number; desnivel: number; horas: number;
  dificultad: Dificultad; precio: number; alturaMax: number; lugares: number; descripcion: string;
};
const PUNTO = 'Templo de Santo Domingo, centro de Oaxaca. Cita 6:45 hs para salida puntual a las 7:00 hs. Regreso antes de las 17:00 hs';
export const PUNTO_ENCUENTRO = PUNTO;
export const SALIDA = 'Sábado 7:00 hs';
export const CUPO_MAX = 10;
export const rutas: Ruta[] = [
  { slug: 'cascadas-de-cuajimoloyas', nombre: 'Cascadas de Cuajimoloyas', zona: 'Sierra Norte', km: 9, desnivel: 380, horas: 5, dificultad: 'media', precio: 950, alturaMax: 3150, lugares: 10,
    descripcion: 'Un sendero entre pinos y encinos que baja hasta el rumor del agua escondida en la sierra. El camino alterna tramos de sombra fresca con miradores abiertos al valle. Llegarás a las cascadas con las piernas cansadas y el ánimo lleno.' },
  { slug: 'bosque-de-niebla-de-benito-juarez', nombre: 'Bosque de niebla de Benito Juárez', zona: 'Sierra Norte', km: 7, desnivel: 250, horas: 4, dificultad: 'fácil', precio: 780, alturaMax: 2900, lugares: 8,
    descripcion: 'La niebla se enreda entre los troncos cubiertos de musgo y el bosque parece de otro mundo. Es una caminata amable, ideal para quien empieza o quiere ir sin prisa. El guía te cuenta qué plantas y aves salen al paso.' },
  { slug: 'mirador-de-la-cumbre-ixtepeji', nombre: 'Mirador de La Cumbre Ixtepeji', zona: 'Sierra Juárez', km: 12, desnivel: 620, horas: 6, dificultad: 'media', precio: 1100, alturaMax: 3250, lugares: 2,
    descripcion: 'Una subida constante que premia con una vista amplia sobre las montañas de la Sierra Juárez. El aire se vuelve fino y frío cerca de la cima. Es una ruta de ritmo firme, pensada para quien ya tiene costumbre de caminar.' },
  { slug: 'travesia-latuvi-a-amatlan', nombre: 'Travesía Latuvi a Amatlán', zona: 'Pueblos Mancomunados', km: 16, desnivel: 540, horas: 7, dificultad: 'alta', precio: 1450, alturaMax: 2800, lugares: 6,
    descripcion: 'Una travesía larga que une dos pueblos por antiguos caminos comunitarios entre bosque y cañadas. Exige buena condición, pero regala una jornada completa de sierra auténtica. Se camina a paso constante y con paradas para reponer fuerzas.' },
  { slug: 'canada-de-llano-grande', nombre: 'Cañada de Llano Grande', zona: 'Sierra Norte', km: 10, desnivel: 410, horas: 5, dificultad: 'media', precio: 980, alturaMax: 3050, lugares: 0,
    descripcion: 'Una cañada serena que se abre a praderas altas donde sopla el viento de la sierra. El recorrido combina bajadas suaves y repechos cortos. Es de las salidas más pedidas del cuaderno de ruta.' },
  { slug: 'paso-de-los-encinos', nombre: 'Paso de los Encinos', zona: 'San Antonio Cuajimoloyas', km: 6, desnivel: 190, horas: 3, dificultad: 'fácil', precio: 690, alturaMax: 2950, lugares: 9,
    descripcion: 'Un paseo corto entre encinos centenarios, perfecto para una mañana tranquila en la montaña. El terreno es amable y el paso relajado. Una buena puerta de entrada a la sierra de Oaxaca.' },
  { slug: 'cresta-del-cerro-negro', nombre: 'Cresta del Cerro Negro', zona: 'Sierra Norte Alta', km: 18, desnivel: 910, horas: 8, dificultad: 'alta', precio: 1650, alturaMax: 3400, lugares: 5,
    descripcion: 'La ruta más exigente del cuaderno: una cresta larga y expuesta al viento, con la mayor altura de todas las salidas. Pide buena forma física y ganas de esfuerzo. La recompensa es un horizonte de montañas hasta donde alcanza la vista.' },
];
export const getRuta = (slug: string) => rutas.find((r) => r.slug === slug);
export const peso = (n: number) => `$${n.toLocaleString('es-MX')} MXN`.replace(/,/g, '.');
export const cupoEstado = (n: number) => (n >= 4 ? 'disponible' : n >= 1 ? 'ultimos' : 'agotada') as 'disponible' | 'ultimos' | 'agotada';
