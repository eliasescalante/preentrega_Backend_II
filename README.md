# API - COMMERCE - v.1.0
### Proyecto final del curso de CODER HOUSE - 
### Programación Backend II: Diseño y Arquitectura Backend

----

### Alumno: Elias Escalante
### Profesor: Samuel Tocaimaza
### Tutor : Saúl Belbey
### Comision : 70085

----

## Descripción del Proyecto

Este servidor proporciona una API para gestionar productos y carritos de compra, almacenados en una base de datos MongoDB. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) tanto para productos como para carritos. Además, los usuarios pueden agregar productos al carrito y, al finalizar la compra, el sistema genera un ticket con el valor total de la transacción, descontando automáticamente del stock los productos adquiridos. Para acceder a las diferentes funciones de la API, es necesario iniciar sesión.
----

## Cómo Ejecutar el Proyecto

- 1 . descargar el repositorio
- 2 . inicia el server con "npm start"
- 3 . la pagina inicial describe los metodos a utilizar

# COMENTARIOS:
## Fue todo un desafio realizar este proyecto. Realice un front basico para que el proyecto sea un poco mas amigable y se pueda probar las diferentes fucniones

# Funcionalidades agregadas en esta ENTREGA:
- `login` : permite iniciar sesion. (solo es visible si no estas logeado en el server).
- `register` : permite registrar un nuevo usuario. / para iniciar en la API es `necesario deslogearse y volver a logearse.`
- `home` : muestra una vista con un mensaje de bienvenida y un boton para deslogearse. (solo es visible si estas logeado en el server)
- `productos` : Permite ver todos los productos solo si estas logeado y permite agregarlos al carrito del usuario.
- `carts` : Permite ver los productos del carrito del usuario logeado.
- `carts`: Permite ver el detalle, ademas de modificar la cantidad de los productos en el carrito y tambien eliminarlos o vaciar el carrito.
- `carts`: Permite tambien finalizar la compra, generando un ticket y mostrandolo en pantalla. El stock del producto se descuenta de la base de datos. y al finalizar vacia el carrito
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
