# API - COMMERCE 
# Primera pre-entrega del curso de CODER HOUSE - 
# Programación Backend II: Diseño y Arquitectura Backend

----

# Alumno: Elias Escalante
# Profesor: Samuel Tocaimaza
# Tutor : Saúl Belbey
# Comision : 70085

----

## Descripción del Proyecto

Este servidor proporciona una API para manejar productos y carritos de compra. Los productos y carritos se almacenan en una base de datos y el servidor permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre la misma.
Se agrego Websockets al proyecto y vistas con plantillas (Motores de Plantillas "Handlebars"). Ademas de usar MongoDB como persistencia de los datos. (DB subida en la nube)
Se usa como ODM la libreria mongoose.
En esta pre-entrega se agrego un "login", "registro de usuarios nuevos" y una vista "home".

## Cómo Ejecutar el Proyecto

- 1 . descargar el repositorio
- 2 . inicia el server con "npm start"
- 3 . la pagina inicial describe los metodos a utilizar

# Funcionalidades agregadas en esta pre-entrega:
- `login` : permite iniciar sesion.
- `register` : permite registrar un nuevo usuario.
- `home` : muestra una vista con un mensaje de bienvenida y un boton para deslogearse.

# Implementaciones:
- Se agrego el uso de el paquete bcrypt para encriptar la contraseña.
- Se agrego el uso de el paquete jsonwebtoken para generar un token de autenticacion
- se agrego el modelo de usuario a la base de datos y se le asocio un id de un unico carrito.
- Se implemento un sistema de login de usuario que trabaja con jwt. (se utilizo Passport para trabajar con el modelo de usuarios)
- Se implemento la estrategia "current" para extraer cookies que contienen el token para obtener el usuario asociado. (se utliza extractor de cookie)
- Se implemento la estrategia "jwt" para verificar el token y obtener el usuario asociado.

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

### Node.js
<div align="center">
    <img src="https://img.icons8.com/color/48/000000/nodejs.png" alt="Node.js Logo" width="48"/>
</div>

### Express.js
<div align="center">
    <img src="https://img.icons8.com/ios/50/000000/express-js.png" alt="Express.js Logo" width="48"/>
</div>

### JavaScript
<div align="center">
    <img src="https://img.icons8.com/color/48/000000/javascript.png" alt="JavaScript Logo" width="48"/>
</div>

----


----
