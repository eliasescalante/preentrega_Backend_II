# E-commerce Server v 1.0 - Segunda preentrega del curso de CODER HOUSE - 
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


## Funcionalidades primera pre-entrega

- **Gestión de Carritos**:
  - **Crear Nuevo Carrito**: `POST /api/carts`
  - **Listar Productos en un Carrito**: `GET /api/carts/:cid`
  - **Agregar Producto a un Carrito**: `POST /api/carts/:cid/product/:pid`

----
- **Gestión de Productos**: FUE REEMPLAZADO POR VISTA "products, realTimeProducts"
  - **Listar Todos los Productos**: `GET /api/products`
  - **Obtener Producto por ID**: `GET /api/products/:pid`
  - **Agregar Nuevo Producto**: `POST /api/products`
  - **Actualizar Producto**: `PUT /api/products/:pid`
  - **Eliminar Producto**: `DELETE /api/products/:pid`
----
## Funcionalidades PRE-ENTREGA 2

- Se agrego al proyecto Websockets y se integro el trabajo con vistas.
- Se implemento handlebars.
- Se creo la vista **realTimeProducts.handlebars**: 'Permite agregar productos nuevos mediante un formulario al archivo products.json'. El id no se repite y se autogenera, y el status se setea en true desde el servidor.
- Cada elemento que aparece en la vista `realTimerProducts` tiene un boton que borra el producto de la vista y tambien del archivo products.json
- Se creo la vista **products.handlebars**: la cual contiene una lista de todos los productos agregados hasta el momento.
- se utilizo sweetAlert2 para los mensajes emergentes.
- Se utilizo CSS nativo para los estilos.

----

CAPTURA DEL PROYECTO:
![Captura](https://github.com/eliasescalante/api_e_commerce_v1/blob/main/public/img/capture_index.png)
![Captura](https://github.com/eliasescalante/api_e_commerce_v1/blob/main/public/img/capture.png)
![Captura](https://github.com/eliasescalante/api_e_commerce_v1/blob/main/public/img/capture_lista_de_productos.png)
![Captura](https://github.com/eliasescalante/api_e_commerce_v1/blob/main/public/img/capture_lista_producto_borrar.png)
![Captura](https://github.com/eliasescalante/api_e_commerce_v1/blob/main/public/img/capture_realTimeProducts_agregar.png)

----

![GitHub repo size](https://img.shields.io/github/repo-size/eliasescalante/api_e_commerce_v1
)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/eliasescalante/api_e_commerce_v1
)
![GitHub last commit](https://img.shields.io/github/last-commit/eliasescalante/api_e_commerce_v1
)
