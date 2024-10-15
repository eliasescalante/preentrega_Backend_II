# API - COMMERCE 
### Proyecto final del curso de CODER HOUSE - 
### Programación Backend II: Diseño y Arquitectura Backend

----

### Alumno: Elias Escalante
### Profesor: Samuel Tocaimaza
### Tutor : Saúl Belbey
### Comision : 70085

----

## Descripción del Proyecto

Este servidor proporciona una API para manejar productos y carritos de compra. Los productos y carritos se almacenan en una base de datos y el servidor permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre la misma.
Para acceder a las diferentes opciones de la API es necesario logearse.

## Cómo Ejecutar el Proyecto

- 1 . descargar el repositorio
- 2 . inicia el server con "npm start"
- 3 . la pagina inicial describe los metodos a utilizar

# COMENTARIOS:
## Fue todo un desafio realizar este proyecto. Realice un front basico para que el proyecto sea un poco mas amigable.

# Funcionalidades agregadas en esta ENTREGA:
- `login` : permite iniciar sesion. (solo es visible si no estas logeado en el server)
- `register` : permite registrar un nuevo usuario. / para iniciar en la API es necesario deslogearse y volver a logearse.
- `home` : muestra una vista con un mensaje de bienvenida y un boton para deslogearse. (solo es visible si esta logeado en el server)
- `productos` : Permite ver todos los productos. Solo si estas logeado y permite agregarlos al carrito del usuario logeado.
- `carts` : Permite ver los productos del carrito del usuario logeado.
- `carts`: Permite ver el detalle, ademas de modificar la cantidad de los productos en el carrito ademas de eliminarlos o vaciar el carrito.
- `carts`: Permite tambien finalizar la compra, generando un ticket y mostrandolo en pantalla. El stock del producto se descuenta de la base de datos.
- `realTimerProduct` : Ahora solo puede tener acceso el admin, en esta vista permite eliminar productos, agregar nuevos o modificarlos.
- `carts/:cid/purchase` : Permite finalizar la compra del carrito del usuario logeado. Para esto ya esta definido en el front.
- `admin` : PARA PROBAR EL ADMIN => mail= `eli@eli.com` y pass = `1234`.

# Implementaciones:
- Se agrego el uso de el paquete bcrypt para encriptar la contraseña.
- Se agrego el uso de el paquete jsonwebtoken para generar un token de autenticacion
- se agrego el modelo de usuario a la base de datos y se le asocio un id de un unico carrito.
- Se implemento un sistema de login de usuario que trabaja con jwt. (se utilizo Passport para trabajar con el modelo de usuarios)
- Se implemento la estrategia "current" para extraer cookies que contienen el token para obtener el usuario asociado. (se utliza extractor de cookie)
- Se implemento la estrategia "jwt" para verificar el token y obtener el usuario asociado.

# Temas agregados para la entrega final

- Patron DAO
- Patron Repository
- Variables de entorno
- uso de DTO
- Uso de un modelo de usuario
- Uso de un modelo de carrito
- Uso de un modelo de producto
- Uso de un modelo de ticket

----

#### Funcionalidades del proyecto entregado en backend 1.

- Se cambio la persistencia alojada en data/carts.json y data/products.json por mongodb la cual se hizo el deploy en mongo atlas.
-  `realTimeProducts` : realiza el alta y la eliminacion de un producto en la base de datos que se encuentra en la nube, utilizando el frontend .
- `realTimeProducts` : muestra ademas en tiempo real cuando se agrega un producto y cuando se elimina.
- `products` : ahora muestra todos los productos desde la nueva base de datos en la nube. 
- `products` : permite ademas ver un detalle de cada producto.
- `products` : cada elemento tiene un boton que permite agregar el producto al carrito seleccionado (permite elegir el carrito al cual agregar el producto)
- `products` : permite aplicar filtro sobre el listado general (buscar por categoria, ordenar por precio, visualizar n productos por paginas, elegir la pagina, y navegar por las paginas)
- `carts` : muestra todos los carritos creados.
- `carts` : permite ver el contenido de cada carrito.
- `carts` : permite modificar la cantidad de un producto en el carrito.
- `carts` : permite eliminar un producto del carrito y vaciar el mismo
- `carts` : permite eliminar el carrito.

------

## CAPTURA DEL PROYECTO:
<img src="https://github.com/eliasescalante/preentrega_Backend_II/blob/main/public/img/captura_login.png" width="600" />
<img src="https://github.com/eliasescalante/preentrega_Backend_II/blob/main/public/img/captura_register.png" width="600" />
<img src="https://github.com/eliasescalante/preentrega_Backend_II/blob/main/public/img/capture_home.png" width="600" />
<img src="https://github.com/eliasescalante/proyectoFinal_api_commerce/blob/main/public/img/capture_index.png" width="600" />
<img src="https://github.com/eliasescalante/proyectoFinal_api_commerce/blob/main/public/img/capture_lista_productos.png" width="600" />
<img src="https://github.com/eliasescalante/proyectoFinal_api_commerce/blob/main/public/img/capture_gestion_carritos.png" width="600" />
<img src="https://github.com/eliasescalante/proyectoFinal_api_commerce/blob/main/public/img/capture_detalle_carrito.png" width="600" />
<img src="https://github.com/eliasescalante/proyectoFinal_api_commerce/blob/main/public/img/capture_detalle_producto.png" width="600" />

----

![GitHub repo size](https://img.shields.io/github/repo-size/eliasescalante/preentrega_Backend_II
)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/eliasescalante/preentrega_Backend_II
)
![GitHub last commit](https://img.shields.io/github/last-commit/eliasescalante/preentrega_Backend_II
)
