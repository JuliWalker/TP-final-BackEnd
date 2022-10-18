# Proyecto Back-End

## Es un proyecto de **Back-End** de una aplicación de **e-commerce** 


## Variables de Entorno
 - **PORT** - Puerto que utilizara nuestro servidor
 - **JWT_PRIVATE_KEY** - Clave de la firma de nuestro Token
 - **USER_ETHEREAL** - Usuario de nuestro servicio mail
 - **PASS_ETHEREAL** - Password de nuestro servicio mail
 - **MODO** - Elegir si corremos el servidor en modo FORK o CLUSTER
 - **DB_MONGO** - Dirección que nos pasa MONGO DB para conectarnos desde NODE
 
### Para realizar el proyecto se utilizaron las siguientes técnologias

 1. Node Js
 2. Mongo DB
 3. Mongoose
 4. Dotenv
 5. Ejs
 6. Express
 7. Bcrypt
 8. Jsonwebtoken
 9. Nodemon
 10. Nodemailer
 11. WebSockets

### Instalar Dependencias

    npm install

### Levantar el servidor
**Modo Producción**

    npm start

 **Modo Desarrollo (tener instalado Nodemon)**
    
    npm run mon

## Endpoints


## Rutas de usuarios:

Las rutas de los usuarios estan todas dispuestas en EJS, por lo tanto el registro y login de usuarios pueden hacerse levantando el servidor y corriendolo desde el navegador.
Tener en cuenta que si se quisiera usar este proyecto como API Rest hay que hacer modificaciones menores para devolver al front las respuestas requeridas en vez del res.render usados actualmente.

### GET:  /api/users/registro

Desde el navegador, nos envia al render con el formulario de registro.

### POST:  /api/users/registro

Se ejecuta cuando al enviar el formulario de la ruta GET.
Nos crea un usuario en la base de datos y nos manda a la ruta de envio de mail de nuevo usuario.

### GET:  /api/users/errorRegistro

Ruta creada para renderizar el error al crear un nuevo usuario por ingresar un mail ya registrado.

### GET:  /api/users/mailRegistro

Fue una ruta auxiliar creada para mandar el mail de confirmación al nuevo usuario. Si la app se usara como una API REST podria pasarse este codigo a un middleware en vez de una ruta.
Esta ruta nos redirige al login luego de enviar el mail.

### GET:  /api/users/login

Desde el navegador nos renderiza el formulario de Login

### POST:  /api/users/registro

Se ejecuta al enviar el formulario.
Nos crea una sesion y un token de authentificación y nos deja ingresar a la pagina principal de la app.
En este caso el Token se pasa por consola porque no tenemos un front para recibirlo y enviarlo de regreso.
Si queresmos usarlo como API Rest hay que cambiar esta logica por la que esta comentada.

### GET:  /api/users/errorLogin

Ruta creada para renderizar una vista de error en caso de que el usuario y la contraseña no sean validos.

### GET:  /api/users/logout

Ruta creada para confirmar al usuario que la session fue terminada correctamente.


## Endpoints Protegidos (Requieren Token)

Como enviar un token desde Insomnia o Postman?
Completar la seccion Headers con:
**Header: authorization**
**Value: "bearer" + " " + token**

## Rutas de productos

Salvo la ruta get products, las rutas de esta seccion no tienen creadas una vista en EJS, por lo tanto hay que usarlas desde Insomnia o Postman 

### GET:  /api/productos

Esta es la unica ruta que esta armada con EJS, nos muestra tarjetas con la foto e información de los distintos productos cargados.

### POST: /productos/

Guarda un nuevo productos.

**Datos requeridos:**

>   {
>   "nombre": nombre del producto, 
>   "descripcion": descripción del producto,
>   "codigo": codigo del producto (no el ID, el de tracking del comercio)
>   "thumbnail": URL de la imágen lel producto, 
>   "price": precio
>   "stock": stock
>   }

### GET: /api/productos/id del producto

Nos devuelve el producto con el ID enviado por params

### PUT: /api/productos/id del producto

Actualiza un producto

**Datos requeridos:**

>   {
>   "nombre": nombre del producto, 
>   "descripcion": descripción del producto,
>   "codigo": codigo del producto (no el ID, el de tracking del comercio)
>   "thumbnail": URL de la imágen lel producto, 
>   "price": precio
>   "stock": stock
>   }

### DELETE: /productos/id del producto

Elimina un producto con el ID enviado por params


## Rutas de carritos

las rutas de esta seccion no tienen creadas una vista en EJS, por lo tanto hay que usarlas desde Insomnia o Postman 
**Recordar enviar el Token de validacion**

### GET: /api/carritos

Muestra todos los carritos guardados

### POST: /api/carritos

Crea un carrito de compras

**Datos requeridos:**

>   {
>   "productos": es un array de productos con todos los datos del producto mas la cantidad, 
>   "direccion": direccion de entrega
>   }

**Tipo de objeto del array de productos:**

>   {
>   "nombre": nombre del producto, 
>   "descripcion": descripción del producto,
>   "codigo": codigo del producto (no el ID, el de tracking del comercio)
>   "thumbnail": URL de la imágen lel producto, 
>   "price": precio
>   "stock": stock (opcional)
>   "cantidad": cantidad de items a comprar
>   }


### GET: /api/carritos/id del carrito

Muestra el carrito del ID enviado por params

### DELETE: /api/carritos/id del carrito

Elimina un carrito del ID enviado por params

### GET: /api/carritos/id del carrito/productos

Muestra los productos del carrito del ID enviado por params

### POST: /api/carritos/id del carrito/productos

Agrega 1 unidad del producto enviado por body dentro del carrito con el ID enviado por params

**Objeto producto del body:**

>   {
>   "nombre": nombre del producto, 
>   "descripcion": descripción del producto,
>   "codigo": codigo del producto (no el ID, el de tracking del comercio)
>   "thumbnail": URL de la imágen lel producto, 
>   "price": precio
>   "stock": stock (opcional)
>   "cantidad": cantidad de items a comprar
>   }

### DELETE: /api/carritos/id del carrito/productos/id del producto

Elimina un producto del carrito siguiendo el id del carrito y del producto pasados por params

## Rutas del chat

por ahora no logro hacer que corran los scripts en EJS y esta seccion no esta probada.

### GET: /chat

Nos muestra todos los mensajes del chat

### GET: /chat/email del usuario

Nos muestra todos los mensajes del chat correpondientes a ese usuario