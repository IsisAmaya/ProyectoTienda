const express = require("express");
const { eliminarProducto } = require("../models/producto");
const router = express.Router();

const productoModel = require("../models/producto");



//------------------------ Consultas Basicas 1.1 ---------------------------------


//http://localhost:3000/app/consultas/obtener_uno
router.get("/consultas/obtener_uno", async (req, res) => {
  try {
    const resultado = await productoModel.obtenerUno();
    res.send(resultado);
  } catch (error) {
    response.status(500).send(error);
  }
});


//http://localhost:3000/app/consultas/obtener_dos
router.get("/consultas/obtener_dos", async (req, res) => {
  try {
    const productos = await productoModel.obtenerDos();
    res.send(productos);
  } catch (error) {
    response.status(500).send(error);
  }
});


//http://localhost:3000/app/consultas/obtener_tres
router.get("/consultas/obtener_tres", async (req, res) => {
  try {
    const resultado = await productoModel.obtenerTres();
    res.send(resultado);
  } catch (error) {
    response.status(500).send(error);
  }
});

//http://localhost:3000/app/consultas/obtener_cuatro
router.get("/consultas/obtener_cuatro", async (req, res) => {
  const { rango1, rango2 } = req.body;
  try {
    const resultado = await productoModel.obtenerCuatro(rango1, rango2);
    res.send(resultado);
  } catch (error) {
    response.status(500).send(error);
  }
});


//http://localhost:3000/app/consultas/obtener_cinco/:ciudad
router.get("/consultas/obtener_cinco/:ciudad", async (req, res) => {
  try {
    const resultado = await productoModel.obtenerCinco(req.params.ciudad);
    res.send(resultado);
  } catch (error) {
    response.status(500).send(error);
  }
});


//http://localhost:3000/app/consultas/obtener_seis/:id_carrito_cliente
router.get("/consultas/obtener_seis/:id_carrito_cliente", async (req, res) => {
  try {
    const resultado = await productoModel.obtenerSeis(req.params.id_carrito_cliente);
    res.send(resultado);
  } catch (error) {
    response.status(500).send(error);
  }
});


//http://localhost:3000/app/consultas/obtener_siete/:id_carrito_cliente
router.get("/consultas/obtener_siete/:id_carrito_cliente", async (req, res) => {
  try {
    const resultado = await productoModel.obtenerSiete(req.params.id_carrito_cliente);
    res.send(resultado);
  } catch (error) {
    response.status(500).send(error);
  }
});

//http://localhost:3000/app/consultas/obtener_ocho
router.get("/consultas/obtener_ocho", async (req, res) => {
  try {
    const resultado = await productoModel.obtenerOcho();
    res.send(resultado);
  } catch (error) {
    response.status(500).send(error);
  }
});

//http://localhost:3000/app/consultas/obtener_nueve
router.get("/consultas/obtener_nueve", async (req, res) => {
  try {
    const resultado = await productoModel.obtenerNueve();
    res.send(resultado);
  } catch (error) {
    response.status(500).send(error);
  }
});

//http://localhost:3000/app/consultas/obtener_diez/:id_orden
router.get("/consultas/obtener_diez/:id_orden", async (req, res) => {
  try {
    const resultado = await productoModel.obtenerDiez(req.params.id_orden);
    res.send(resultado);
  } catch (error) {
    response.status(500).send(error);
  }
});



//----------------------- Operaciones de CRUD 1.2 --------------------------------


// http://localhost:3000/app/crud/insertar_categoria
router.post("/crud/insertar_categoria", function (req, res, next) {
  const { Nombre } = req.body;
  if (!Nombre) {
    return res.status(500).send("No ingresaste el nombre de la categoria");
  } else {
    // Si todo va bien, seguimos
    productoModel.insertarCategoria(Nombre);
    return res.send({ message: `Categoria Insertada!` });
  }
});


// http://localhost:3000/app/crud/actualizar_categoria
router.put("/crud/actualizar_categoria/:id", function (req, res, next) {
  const { Id_categoria, Nombre } = req.body;
  productoModel
    .modificarCategoria(req.params.id, Nombre, Id_categoria)
    .then(() => {
      res.send({ message: `Nombre de la categoria modificado!!` });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});



// http://localhost:3000/app/crud/eliminar_categoria/id
router.delete("/crud/eliminar_categoria/:id", function (req, res, next) {
  productoModel
    .eliminarCategoria(req.params.id)
    .then(() => {
      res.send({ message: `Categoria Eliminada!` });
    })
    .catch((err) => {
      return res.status(500).send("Error eliminando");
    });
});

//---------------------------- Operaciones Carrito 1.3 --------------------------------

// http://localhost:3000/app/carrito/crear_carrito/:id_cliente
router.post("/carrito/crear_carrito/:id_cliente", function (req, res, next) {
  const { confirmacion } = req.body;
  if (!confirmacion) {
    return res.status(500).send("No confirmaste la creacion del carrito");
  } else {
    // Si todo va bien, seguimos
    productoModel.crearCarrito(req.params.id_cliente, confirmacion);
    return res.send({ message: `Carrito Creado!` });
  }
});


// http://localhost:3000/app/carrito/agregar_producto/:id_carrito_cliente
router.post("/carrito/agregar_producto/:id_carrito_cliente", function (req, res, next) {
  const { producto, cantidad } = req.body;
  if (!producto || !cantidad) {
    return res.status(500).send("No agregaste el producto o la cantidad");
  } else {
    // Si todo va bien, seguimos
    productoModel.agregarProducto(req.params.id_carrito_cliente, producto, cantidad);
    return res.send({ message: `Producto Agregado!` });
  }
});


//http://localhost:3000/app/carrito/actualizar_cantidad/:id_carrito_cliente
router.put("/carrito/actualizar_cantidad/:id_carrito_cliente", function (req, res, next) {
  const { cantidad, id_producto } = req.body;
  productoModel
    .actualizarCantidad(cantidad, id_producto, req.params.id_carrito_cliente)
    .then(() => {
      res.send({ message: `Cantidad Actualizada!!` });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});


//http://localhost:3000/app/carrito/eliminar_producto/:id_carrito_cliente
router.delete("/carrito/eliminar_producto/:id_carrito_cliente", function (req, res, next) {
  const { id_producto } = req.body;
  productoModel
    .eliminarProducto(id_producto, req.params.id_carrito_cliente)
    .then(() => {
      res.send({ message: `Producto Eliminado!` });
    })
    .catch((err) => {
      return res.status(500).send("Error eliminando");
    });
});


//http://localhost:3000/app/carrito/realizar_compra1/:id_carrito_cliente
router.post("/carrito/realizar_compra1/:id_carrito_cliente", function (req, res, next) {
  const { id_cliente, direccion_entrega, correo_orden } = req.body;
  if (!id_cliente || !direccion_entrega || !correo_orden) {
    return res.status(500).send("No agregaste algun campo requerido");
  } else {
    // Si todo va bien, seguimos
    productoModel.realizarCompra1(id_cliente, direccion_entrega, correo_orden);
    productoModel.realizarCompra2(req.params.id_carrito_cliente);
    return res.send({ message: `Operacion exitosa!!` });
  }
});


//http://localhost:3000/app/carrito/realizar_compra2/:id_carrito_cliente
router.delete("/carrito/realizar_compra2/:id_carrito_cliente", function (req, res, next) {
  productoModel
    .realizarCompra3(req.params.id_carrito_cliente)
    .then(() => {
      res.send({ message: `Carrito vaciado!` });
    })
    .catch((err) => {
      return res.status(500).send("Error eliminando");
    });
});


// http://localhost:3000/app/carrito/consultar_carrito/:id_carrito_cliente
router.get("/carrito/consultar_carrito/:id_carrito_cliente", async (req, res) => {
  try {
    const productos = await productoModel.obtenerCarrito(req.params.id_carrito_cliente);
    res.send(productos);
  } catch (error) {
    response.status(500).send(error);
  }
});


//http://localhost:3000/app/carrito/consultar_orden/:id_cliente
router.get("/carrito/consultar_orden/:id_cliente", async (req, res) => {
  try {
    const productos = await productoModel.obtenerOrden(req.params.id_cliente);
    res.send(productos);
  } catch (error) {
    response.status(500).send(error);
  }
});

//http://localhost:3000/app/carrito/obtener_carrito_cliente
router.get("/carrito/obtener_carrito_cliente", async (req, res) => {
  try {
    const resultado = await productoModel.obtenerCarritoCliente();
    res.send(resultado);
  } catch (error) {
    response.status(500).send(error);
  }
});


//---------------------------------- Operaciones sobre el Usuario/Cliente ---------------------------------

//http://localhost:3000/app/cliente/login/email&contrasena
router.get("/cliente/login/:email&:contrasena", async (req, res) => {
  productoModel
  .login(req.params.email, req.params.contrasena)
  .then((info) => {
    if (info) {
      res.send({ message: ` Bienvenido! `}.message + "\nNombre: " +info.nombre + " " + "\nid_cliente: " +info.id_cliente);
    }
    else {
      return res.status(500).send("Error ingresando");
    }
  })
  .catch((err) => {
    return res.status(200).send("DB Error - Login");
  });
});

//http://localhost:3000/app/cliente/logout/id_cliente
router.get("/cliente/logout/:id_cliente", async (req, res) => {
  productoModel
  .logout(req.params.id_cliente)
  .then((info) => {
    if (info) {
      res.send({ message: ` Adios! `}.message + "\n " + info.nombre);
    }
    else {
      return res.status(500).send("Error saliendo");
    }
  })
  .catch((err) => {
    return res.status(200).send("DB Error - Login");
  });
});


// http://localhost:3000/app/cliente/registro
router.post("/cliente/registro", function (req, res, next) {
  const { Nombre, Email, Contrasena, Telefono, Ciudad } = req.body;
  if (!Nombre || !Email || !Contrasena || !Telefono || !Ciudad) {
    return res.status(500).send("Debe de enviar todos los campos");
  } else {
    // Si todo va bien, seguimos
    productoModel.nuevoUsuario(Nombre, Email, Contrasena, Telefono, Ciudad);
    return res.send({ message: `Registro exitoso!` });
  }
});


// http://localhost:3000/app/cliente/actualizar_cliente/id_cliente
router.put("/cliente/actualizar_cliente/:id_cliente", function (req, res, next) {
  const {Nombre, Email, Contrasena, Telefono, Ciudad} = req.body;
  productoModel
    .actualizarCliente(Nombre, Email, Contrasena, Telefono, Ciudad, req.params.id_cliente)
    .then(() => {
      res.send({ message: `Datos de cliente actualizados!!` });
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
});

// http://localhost:3000/app/cliente/eliminar_cliente/id_cliente
router.delete("/cliente/eliminar_cliente/:id_cliente", function (req, res, next) {
  productoModel
    .eliminarCliente(req.params.id)
    .then(() => {
      res.send({ message: `Cliente Eliminado!` });
    })
    .catch((err) => {
      return res.status(500).send("Error eliminando");
    });
});


//--------------------------------------------------------------------

module.exports = router;