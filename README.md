# Ecommerce Server v 1.0 - Segunda preentrega del curso de CODER HOUSE - 
# Programación Backend I: Desarrollo Avanzado de Backend

----


# Alumno: Elias Escalante
# Tutor : Mariano Damian Macias Gandulfo
# Comision : 70125

----

## Descripción del Proyecto

Este servidor proporciona una API para manejar productos y carritos de compra. Los productos y carritos se almacenan en archivos JSON, y el servidor permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre estos datos.
Se agrego Websockets al proyecto.

## Cómo Ejecutar el Proyecto

- 1 . descargar el repositorio
- 2 . inicia el server con "npm start"
- 3 . la pagina inicial describe los metodos a utilizar


## Funcionalidades pre-entrega 1

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

## Funcionalidades PRE-ENTREGA 2

- Se agrego al proyecto Websockets y se integro el trabajo con vistas.
- Se implemento handlebars
- Se creo la vista **realTimeProducts.handlebars**: 'Permite agregar productos nuevos mediante un formulario al archivo products.json'. El id no se repite y se autogenera, y el status se setea en true desde el servidor.
- Se creo la vista **products.handlebars**: la cual contiene una lista de todos los productos agregados hasta el momento.

----

CAPTURA DEL PROYECTO:

![Captura](https://github.com/eliasescalante/api_e_commerce_v1/blob/main/public/img/capture.png)

----

![GitHub repo size](https://img.shields.io/github/repo-size/eliasescalante/api_e_commerce_v1
)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/eliasescalante/api_e_commerce_v1
)
![GitHub last commit](https://img.shields.io/github/last-commit/eliasescalante/api_e_commerce_v1
)
