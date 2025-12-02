import express from "express"
import { crearTipo, consultaTipos, consultaIdTipo, actualizarTipo, eliminarTipo } from "../controller/tipoController.js"
import { actualizarEspecie, consultaEspecies, consultaIdEspecie, crearEspecie, eliminarEspecie, cambiarEstadoEspecie } from "../controller/especieController.js";
import { crearLote, consultarLotes } from "../controller/loteController.js";
import { crearCompra, consultarCompras, consultarComprasFecha, eliminarCompra } from "../controller/compraController.js";
import { crearComprador, consultarCompradores, consultaCompradorId, editarComprador, eliminarComprador } from "../controller/compradorController.js";
import { crearUsuario, editarUsuario, eliminarUsuario, consultaUsuarios, consultaUsuarioId } from "../controller/usuarioController.js";
import { login } from "../controller/loginController.js";

const router=express.Router();

//rutas de tipo
router.post("/crear-tipo", crearTipo)
router.get('/consulta-tipos', consultaTipos)
router.get('/consulta-tipos-id/:id', consultaIdTipo)
router.put("/actualizar-tipo/:id",actualizarTipo)
router.delete("/eliminar-tipo/:id",eliminarTipo)

//rutas de especie
router.post("/crear-especie", crearEspecie)
router.get('/consulta-especies', consultaEspecies)
router.get('/consulta-especies-id/:id', consultaIdEspecie)
router.put("/actualizar-especie/:id",actualizarEspecie)
router.delete("/eliminar-especie/:id",eliminarEspecie)
router.put("/cambiar-estado-especie/:id", cambiarEstadoEspecie)

//rutas de lote
router.post('/crear-lote', crearLote)
router.get('/consulta-lotes', consultarLotes)
//router.get('/consulta-lotes-id/:id', consultaIdLote)
//router.put("/actualizar-lote/:id",actualizarLote)
//router.delete("/eliminar-lote/:id",eliminarLote)

//rutas de compra
router.post('/crear-compra', crearCompra)
router.get('/consulta-compras', consultarCompras)
router.get('/consulta-compras-fecha', consultarComprasFecha)
//router.put("/actualizar-compra/:id",actualizarCompra)
router.delete("/eliminar-compra/:id",eliminarCompra)

//rutas de comprador
router.post('/crear-comprador', crearComprador)
router.get('/consulta-compradores', consultarCompradores)
router.get('/consulta-comprador-id/:id', consultaCompradorId)
router.put("/actualizar-comprador/:id",editarComprador)
router.delete("/eliminar-comprador/:id",eliminarComprador)

//rutas de usuario
router.post('/crear-usuario', crearUsuario)
router.put('/editar-usuario/:id',editarUsuario)
router.delete('/eliminar-usuario/:id', eliminarUsuario)
router.get('/consultar-usuarios', consultaUsuarios)
router.get('/consultar-usuario-id/:id', consultaUsuarioId)


//ruta del login
router.post('/validar-credenciales', login)

export default router