Nuestra API REST nos permite modular un ecommerce que cuenta con una variada cantidad de transacciones que se pueden realizar en base a consultas SQL enlazadas con Node.Js.
Entre las consultas que podemos realizar se encuentran por ejemplo:

## Saber los productos disponibles en la tienda  
//http://localhost:3000/app/consultas/obtener_dos


## Número de productos por categoria  
//http://localhost:3000/app/consultas/obtener_tres

## Producto disponible en un rango de precios 
//http://localhost:3000/app/consultas/obtener_cuatro

## Insertar, actualizar y eliminar categorias de productos
// http://localhost:3000/app/crud/insertar_categoria

// http://localhost:3000/app/crud/actualizar_categoria

// http://localhost:3000/app/crud/eliminar_categoria/id


## Login y Logout
//http://localhost:3000/app/cliente/login/email&contrasena

//http://localhost:3000/app/cliente/logout/id_cliente



## Crear un carrito de compras
// http://localhost:3000/app/carrito/crear_carrito/:id_cliente


##El precio total de los prodcutos en un carrito
//http://localhost:3000/app/consultas/obtener_seis/:id_carrito_cliente


Entre otras muchas otras funciones.




# MySQL y Node - Conexión

By [Parzibyte](https://parzibyte.me/blog)

Tutorial en: https://parzibyte.me/blog/2019/06/27/conexion-node-js-mysql-express/


Generada con [express-generator](https://parzibyte.me/blog/2019/06/21/generar-app-express-node-express-generator/)

## Instalar dependencias

Ejecuta:

`npm install`

## Base de datos
Instala MySQL, crea tu base de datos y agrega la tabla ubicada en *esquema.sql*
  

## Ejecutar

Para ejecutar en modo debug:

`set debug=crud-mysql:* & npm start`

Para ejecutar normalmente:  

`npm start`

Después, visita:

http://localhost:3000/productos
