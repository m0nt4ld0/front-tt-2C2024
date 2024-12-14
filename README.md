# Agencia de Viajes - Proyecto Frontend

Este proyecto es parte del curso Talento Tech - 2C 2024, enfocado en el desarrollo frontend con JavaScript. La aplicación es una agencia de viajes que permite a los usuarios explorar y reservar destinos turísticos en varios países de América Latina.

## Descripción del Proyecto

La agencia de viajes ofrece una interfaz interactiva y fácil de usar para que los usuarios puedan buscar información sobre destinos turísticos, ver imágenes, y obtener detalles relevantes para planificar sus viajes. Utiliza APIs externas para obtener datos actualizados y proporcionar una experiencia enriquecida al usuario.

## Características Principales
- **Búsqueda de Destinos**: Los usuarios pueden buscar destinos turísticos por país y obtener información detallada.
- **Galería de Imágenes**: Integración con la API de Unsplash para mostrar imágenes atractivas de los destinos.
- **Información Geográfica**: Uso de la API de Geonames para proporcionar datos geográficos y de localización.
- **Carrito de Compras**: El sitio ofrece la capacidad de agregar destinos al carrito de compras.

## Tecnologías Utilizadas
- **JavaScript**: Para la lógica del frontend.
- **Node.js**: Para el manejo de funciones serverless en Netlify.
- **APIs Externas**: Geonames y Unsplash para datos geográficos e imágenes.

## Configuración del Entorno
Para ejecutar este proyecto localmente, asegúrate de tener configuradas las variables de entorno necesarias en un archivo `.env`:

```
GEONAMES_API_KEY=tu_api_key_aqui
UNSPLASH_API_KEY=tu_api_key_aqui
```

## Instrucciones para Ejecutar el Proyecto Localmente

Para ejecutar este proyecto en tu entorno local, sigue los siguientes pasos:

1. **Instalar Netlify CLI**: Asegúrate de tener instalado Netlify CLI. Si no lo tienes, instálalo ejecutando:
   ```bash
   npm install -g netlify-cli
   ```

2. **Iniciar sesión en Netlify**: Autentícate con tu cuenta de Netlify usando el comando:
   ```bash
   netlify login
   ```

3. **Navegar al directorio del proyecto**: Abre la terminal y navega al directorio raíz del proyecto:
   ```bash
   cd c:/Desarrollo/front-tt-2C2024
   ```

4. **Ejecutar el proyecto localmente**: Utiliza el siguiente comando para iniciar un servidor de desarrollo local:
   ```bash
   netlify dev
   ```

   Este comando servirá tu sitio localmente, detectará y ejecutará cualquier función serverless automáticamente, y cargará las variables de entorno desde tu archivo `.env`.

5. **Acceder al servidor local**: Una vez que el servidor esté en funcionamiento, abre un navegador y navega a `http://localhost:8888` para ver tu sitio.

Con estos pasos, podrás desarrollar y probar el proyecto en tu máquina local de manera efectiva.

## Despliegue
El proyecto está configurado para ser desplegado en Netlify. Asegúrate de configurar las variables de entorno en el panel de Netlify para que la aplicación funcione correctamente.

---
Este proyecto es una excelente oportunidad para aplicar conocimientos de JavaScript y trabajar con APIs modernas para crear aplicaciones web interactivas y útiles.
=======
# Sitio web de viajes y turismo - Frontend

**URL del proyecto:** [https://m0nt4ld0.github.io/front-tt-2C2024/](https://m0nt4ld0.github.io/front-tt-2C2024/)

## Descripción

Este proyecto es un sitio web de reserva de viajes desarrollado como parte del curso **JavaScript Talento Tech** en la edición del segundo cuatrimestre de 2024. Permite a los usuarios buscar y reservar vuelos, hoteles, paquetes turísticos, y actividades en diversos destinos. Su diseño está enfocado en ofrecer una experiencia intuitiva y amigable para la planificación y reserva de viajes.

## Características

- **Reserva de vuelos:** Búsqueda de vuelos por destino, fecha y preferencia de asientos.
- **Reservas de hoteles:** Opciones de búsqueda por ciudad, tipo de alojamiento y fechas de estadía.
- **Paquetes turísticos:** Paquetes completos que incluyen vuelos y alojamiento.
- **Actividades turísticas:** Catálogo de actividades y tours en varios destinos.
- **Interfaz responsive:** Optimizada para dispositivos móviles, tablets y escritorio.
  
## Tecnologías Utilizadas

- **HTML5** y **CSS3**: Estructura y diseño del sitio.
- **JavaScript**: Funcionalidad de búsqueda y filtros.
- **Bootstrap**: Estilos y componentes responsivos.
- **GitHub Pages**: Hosting del sitio.

## Instalación y Configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/m0nt4ld0/front-tt-2C2024.git