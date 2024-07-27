# Ecommerce Server

Este proyecto es un servidor para gestionar productos y carritos de compra para una plataforma de comercio electrónico, desarrollado con Node.js y Express.

## Descripción del Proyecto

Este servidor proporciona una API para manejar productos y carritos de compra. Los productos y carritos se almacenan en archivos JSON, y el servidor permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre estos datos.

## Funcionalidades

- **Gestión de Productos**:
  - **Listar Todos los Productos**: `GET /api/products`
  - **Obtener Producto por ID**: `GET /api/products/:pid`
  - **Agregar Nuevo Producto**: `POST /api/products`
  - **Actualizar Producto**: `PUT /api/products/:pid`
  - **Eliminar Producto**: `DELETE /api/products/:pid`

- **Gestión de Carritos**:
  - **Crear Nuevo Carrito**: `POST /api/carts`
  - **Listar Productos en un Carrito**: `GET /api/carts/:cid`
  - **Agregar Producto a un Carrito**: `POST /api/carts/:cid/product/:pid`

## Estructura de Archivos

- **`src/`**: Contiene el código fuente del servidor.
  - **`routes/`**: Contiene los archivos de rutas para productos y carritos.
    - **`products.js`**: Rutas y lógica para manejar productos.
    - **`carts.js`**: Rutas y lógica para manejar carritos.
  - **`index.js`**: Archivo principal que configura el servidor y las rutas.

- **`data/`**: Contiene los archivos JSON para almacenar productos y carritos.
  - **`products.json`**: Datos de los productos.
  - **`carts.json`**: Datos de los carritos.

- **`public/`**: Contiene archivos estáticos y documentación.
  - **`index.html`**: Documentación de la API en formato HTML.

## Cómo Ejecutar el Proyecto

1 . descarga el repositorio
2 . inicia el server con "npm start"
3 . la pagina inicial describe los metodos a utilizar
