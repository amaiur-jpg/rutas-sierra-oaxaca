# Rumbo Tlacuache · Rutas y Caminatas de Sierra (Oaxaca)

Catálogo y fichas técnicas de caminatas de montaña para el guía local Rumbo Tlacuache en Oaxaca, México. Desarrollado en React y Next.js con Tailwind CSS, optimizado para móvil (360 px) y escritorio, con persistencia local mediante `localStorage`.

- **URL de previsualización en vivo:** [https://rutas-sierra-oaxaca.webapp-project.com](https://rutas-sierra-oaxaca.webapp-project.com)
- **Identidad visual:** Paleta oficial (#2F5D50, #B5532A, #F3EEE1, #1E2B26, #D9A441) con tipografías Bitter (títulos y encabezados) y Karla (textos técnicos y lectura).

---

## 1. Cómo arrancar el proyecto en local

### Requisitos:
- Node.js 18 o superior.
- Gestor de paquetes `npm`.

### Comandos:
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar el servidor de desarrollo
npm run dev
```

El servidor estará accesible en `http://localhost:3000`.

### Estructura de carpetas:
- `src/app/`: Páginas de la aplicación (catálogo principal en `page.tsx`, `catalogo.tsx` y fichas de ruta dinámicas en `ruta/[slug]/`).
- `src/components/`: Componentes reutilizables de UI (insignias de cupo `cupo-badge.tsx`, cabecera `site-header.tsx`, gráficos topográficos en SVG `topo-art.tsx`).
- `src/lib/`: Lógica de datos sintéticos (`rutas.ts`) y control reactivo de estado y almacenamiento local (`reservas.ts`).
- `public/img/`: Recursos estáticos e imágenes optimizadas del hero.

---

## 2. Qué funcionalidades están simuladas y cómo se comportan

1. **Gestión y control de cupos:**
   - Todo el estado de reservas se gestiona puramente en el cliente a través de la API `localStorage` del navegador.
   - La clave utilizada en el almacenamiento local es:
     ```text
     sierra_oaxaca_rutas_v1
     ```
   - **Botón «Apartar mi lugar»:** Al enviar el formulario con el nombre del excursionista (mínimo 3 letras), se descuenta automáticamente 1 lugar del cupo disponible para esa caminata y se almacena la reserva asociada a ese navegador.
   - **Prevención de reservas duplicadas:** Una vez apartado el lugar, el formulario se sustituye por un mensaje de confirmación que muestra el nombre registrado y un botón para **«Soltar mi lugar»**.
   - **Botón «Soltar mi lugar»:** Libera la reserva, devolviendo +1 cupo al contador de la caminata (hasta su máximo inicial) y habilitando de nuevo el formulario.
   - **Estados reactivos de disponibilidad:**
     - **Disponible:** Más de 2 cupos restantes (badge en tono bosque suave).
     - **Últimos lugares:** 1 o 2 cupos restantes (badge en tono ocre de aviso).
     - **Agotada:** 0 cupos restantes (badge en tono arcilla/alerta). El botón «Apartar mi lugar» queda deshabilitado (`disabled`) con cursor bloqueado y mensaje explícito de «Salida agotada».

2. **Compartir por WhatsApp:**
   - Cada ficha técnica incluye el botón **«Compartir por WhatsApp»**.
   - Genera dinámicamente un enlace que abre directamente WhatsApp (`https://wa.me/?text=...`) con el mensaje prearmado y codificado:
     > *«¡Hola! Miren esta ruta: [Nombre de ruta]. Salida: Sábado 7:00 hs. Punto de encuentro: San Antonio Cuajimoloyas (frente a la panadería comunitaria). Dificultad: [Dificultad]. ¿Quién se suma?»*
   - No fija ningún número de teléfono en la URL para permitir compartirlo en grupos, chats individuales o abrir WhatsApp Web/App libremente.

3. **Logística y punto de encuentro:**
   - La hora de salida general está fijada para los sábados a las 7:00 hs con grupos reducidos de máximo 10 personas.
   - El punto de encuentro está documentado en cada ficha técnica: *San Antonio Cuajimoloyas (frente a la panadería comunitaria)*.

---

## 3. Datos sintéticos precargados y cómo reiniciarlos

El catálogo inicial cuenta con las **7 caminatas oficiales del briefing**, cubriendo todos los casos de prueba requeridos:

1. **Cascadas de Cuajimoloyas:** 9 km, +380 m, 5 h, dificultad media, $950 MXN (10 lugares disponibles).
2. **Bosque de niebla de Benito Juárez:** 7 km, +250 m, 4 h, dificultad fácil, $780 MXN (8 lugares disponibles).
3. **Mirador de La Cumbre Ixtepeji:** 12 km, +620 m, 6 h, dificultad media, $1.100 MXN (2 lugares - Caso *Últimos lugares*).
4. **Travesía Latuvi a Amatlán:** 16 km, +540 m, 7 h, dificultad alta, $1.450 MXN (6 lugares disponibles).
5. **Cañada de Llano Grande:** 10 km, +410 m, 5 h, dificultad media, $980 MXN (0 lugares - Caso *Agotada* con botón deshabilitado).
6. **Paso de los Encinos:** 6 km, +190 m, 3 h, dificultad fácil, $690 MXN (9 lugares disponibles).
7. **Cresta del Cerro Negro:** 18 km, +910 m, 8 h, dificultad alta, $1.650 MXN (5 lugares disponibles).

### Cómo reiniciar los datos:
Para restaurar los cupos a su estado original existen dos opciones:
1. **Desde la interfaz:** Hacer clic en el enlace del pie de página (footer): **«Volver a los datos sintéticos»**. Esto limpia el almacenamiento y regenera las 7 rutas con sus cupos base al instante.
2. **Desde la consola de desarrollo del navegador:** Ejecutar:
   ```javascript
   localStorage.removeItem('sierra_oaxaca_rutas_v1');
   location.reload();
   ```

---

## 4. Decisiones de diseño e interfaz

- **Identidad visual rural y de montaña:** Se utilizó la paleta de colores natural especificada por el cliente:
  - Verde bosque profundo (`#2F5D50`) y pino oscuro (`#1E2B26`) para estructura, navegación y contrastes.
  - Tono tierra/arcilla (`#B5532A`) para precios, elementos de acción y advertencias de agotado.
  - Tono ocre cálido (`#D9A441`) para badges de cupo ajustado e iconos de equipamiento.
  - Fondo papel arena suave (`#F3EEE1`) para dar calidez y legibilidad sin fatiga visual.
- **Tipografías:** Se seleccionó `Bitter` de Google Fonts para dar personalidad rústica a los títulos principales, combinada con `Karla` para una lectura clara de las fichas numéricas y datos de altimetría.
- **Optimización móvil (360 px):** Cabecera fotográfica cálida de amanecer sobre copas de pino con contraste de texto reforzado mediante sombras tipográficas y pastillas translúcidas. Permite que el catálogo y la primera tarjeta asomen en el primer pliegue de pantalla sin exigir scroll ciego.
- **Curvas de nivel en SVG (`topo-art.tsx`):** Cada caminata cuenta con un encabezado vectorial generado proceduralmente que evoca mapas de curvas de nivel topográficas con semillas variables según la ruta.
