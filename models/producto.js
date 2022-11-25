const conexion = require("../conexion");

module.exports = {


    //------------------------ Consultas Basicas 1.1 ---------------------------------

    //Consulta 1
    obtenerUno() {
        return new Promise((resolve, reject) => {
            conexion.query(`select count(fecha_orden), fecha_orden as numero from ORDEN group by fecha_orden`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },

    //Consulta 2
    obtenerDos() {
        return new Promise((resolve, reject) => {
            conexion.query(`select nombre, descripcion, stock from producto where stock > 1;`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },


    //Consulta 3
    obtenerTres() {
        return new Promise((resolve, reject) => {
            conexion.query(`select count(Id_categoria) as numero, Nombre from((select Id_categoria from PRODUCTO) as p join CATEGORIA using (Id_categoria)) group by Nombre`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },


    //Consulta 4    
    obtenerCuatro(rango1, rango2) {
        return new Promise((resolve, reject) => {
            conexion.query(`select * from ((select Id_producto from PRODUCTO where precio > ?) as p inner join (select * from PRODUCTO where precio < ?) as pp using(Id_producto))`,
                [rango1, rango2],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },

    //Consulta 5
    obtenerCinco(ciudad) {
        return new Promise((resolve, reject) => {
            conexion.query(`select count(Ciudad) as NumeroClientes, Ciudad from CLIENTE where Ciudad = ?`,
                [ciudad],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },

    //Consulta 6
    obtenerSeis(id_carrito_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query(`select c.Id_producto, c.nombre, p.cantidad from(carrito as p inner join producto as c on(p.id_producto=c.id_producto)) where p.id_carrito_cliente = ? group by c.id_producto, c.nombre, p.cantidad`,
                [id_carrito_cliente],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },

    //Consulta 7
    obtenerSiete(id_carrito_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query(`select sum(c.cantidad*p.precio) as Total from(carrito as c inner join producto as p on(c.id_producto=p.id_producto)) where c.id_carrito_cliente = ?`,
                [id_carrito_cliente],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },

    //Consulta 8
    obtenerOcho() {
        return new Promise((resolve, reject) => {
            conexion.query(`select min(precio) as precio, Nombre from PRODUCTO`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },

    //Consulta 9
    obtenerNueve() {
        return new Promise((resolve, reject) => {
            conexion.query(`select * from PRODUCTO where Stock = 0`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },

    //Consulta 10
    obtenerDiez(id_orden) {
        return new Promise((resolve, reject) => {
            conexion.query(`select sum(precio) as Total from detalle_orden where id_orden = ?`,
                [id_orden],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },




    //----------------------- Operaciones de CRUD 1.2 -------------------------

    // insertar nueva categoria
    insertarCategoria(nombre) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into categoria (nombre) values (?)`,
                [nombre], (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
                });
        });
    },

    // actualizar una categoria existente
    modificarCategoria(Id_categoria, Nombre) {
        return new Promise((resolve, reject) => {
            conexion.query(`update tienda.categoria
        set Nombre = ?
        where Id_categoria = ?`,
                [Nombre, Id_categoria],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },


    // eliminar una categoria existente
    eliminarCategoria(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`delete from tienda.categoria
        where Id_categoria = ?`,
                [id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },


    //---------------------------- Operaciones Carrito 1.3 ---------------------------

    //Crear un nuevo carrito 
    crearCarrito(id_cliente, confirmacion) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into carrito_cliente(id_cliente,confirmacion, estado) values(?,?, "comprando") `,
                [id_cliente, confirmacion], (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
                });
        });
    },

    //agregar un producto al carrito
    agregarProducto(id_carrito_cliente, id_producto, cantidad) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into carrito(id_carrito_cliente, id_producto, cantidad) values(?,?,?) `,
                [id_carrito_cliente, id_producto, cantidad], (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
                });
        });
    },

    // actualizar cantidad de un producto en el carrito
    actualizarCantidad(cantidad, id_producto, id_carrito_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query(`update tienda.carrito
                            set cantidad = ?
                            where id_producto= ? and id_carrito_cliente = ?`,
                [cantidad, id_producto, id_carrito_cliente],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },

    // eliminar un producto del carrito
    eliminarProducto(id_producto, id_carrito_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query(`delete from tienda.carrito
        where  id_producto = ? and id_carrito_cliente = ?`,
                [id_producto, id_carrito_cliente],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },

    // primera parte para comprar/ordenar un carrito
    realizarCompra1(id_cliente, direccion_entrega, correo_orden) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into orden (id_cliente, direccion_entrega, correo_orden, fecha_orden,estado_orden) values (?,?,?, NOW(), "aceptada")`,
                [id_cliente, direccion_entrega, correo_orden],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },

    // segunda parte para comprar/ordenar un carrito
    realizarCompra2(id_carrito_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into detalle_orden(id_orden, id_producto, precio, cantidad) 
                        select id_orden, p.id_producto, precio, cantidad 
                        from (
                        (((select * from carrito where id_carrito_cliente = ?) as c 
                        inner join carrito_cliente as cl on (c.id_carrito_cliente = cl.id_carrito_cliente))
                        inner join producto as p on (c.id_producto = p.id_producto))  inner join orden as o on (o.id_cliente = cl.id_cliente)
                        ) `,
                [id_carrito_cliente],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },

    // tercera parte para comprar/ordenar un carrito
    realizarCompra3(id_carrito_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query(`delete from tienda.carrito
        where id_carrito_cliente = ?`,
                [id_carrito_cliente],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },

    // consulta para hacer pruebas sobre el carrito
    obtenerCarrito(id_carrito_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query(`select  id_carrito ,id_producto, cantidad from carrito where id_carrito_cliente = ?`,
                [id_carrito_cliente],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },

    // consulta para hacer pruebas sobre una orden
    obtenerOrden(id_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query(`select * from orden where id_cliente = ?`,
                [id_cliente],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },


    //---------------------------------- Operaciones sobre el Usuario/Cliente ---------------------------------

    login(email, contrasena) {
        return new Promise((resolve, reject) => {
            conexion.query(`select id_cliente, nombre from cliente where email = ? and contrasena = ?`,
                [email, contrasena],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    },

    logout(id_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query(`select nombre from cliente where id_cliente = ?`,
                [id_cliente],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    },

        // modificar cliente
    // http://localhost:3000/app/modificar_cliente/10
    actualizarCliente(Nombre, Email, Contrasena, Telefono, Ciudad, id_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query(`update tienda.cliente
        set Nombre = ?,Email = ?,Contrasena=?,Telefono=?,Ciudad=?
        where id_cliente = ?`,
                [Nombre, Email, Contrasena, Telefono, Ciudad, id_cliente],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },


    //Crear nuevo cliente
    nuevoUsuario(Nombre, Email, Contrasena, Telefono, Ciudad) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into tienda.cliente (Nombre, Email, Contrasena, Telefono, Ciudad) values (?, ?, ?, ?, ?)`,
                [Nombre, Email, Contrasena, Telefono, Ciudad], (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
                });
        });
    },

    // eliminar un cliente existente
    eliminarCliente(id_cliente) {
        return new Promise((resolve, reject) => {
            conexion.query(`delete from tienda.cliente
        where id_cliente = ?`,
                [id_cliente],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },


}