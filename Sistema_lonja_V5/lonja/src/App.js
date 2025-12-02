import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { useAuth } from "./AuthContext";

import Login from "./pages/login";
import RutaProtegida from "./component/RutaProtegida";

import Empleados from "./component/empleados/Empleados";
import NuevoEmpleado from "./component/empleados/NuevoEmpleado";
import EditarEmpleado from "./component/empleados/EditarEmpleado";

import Compras from "./component/compra/Compras";
import NuevaCompra from "./component/compra/NuevaCompra"
import EditarCompra from "./component/compra/EditarCompra";

import Compradores from "./component/comprador/Compradores";
import NuevoComprador from "./component/comprador/NuevoComprador";
import EditarComprador from "./component/comprador/EditarComprador";

import Especies from "./component/especie/Especies";
import NuevaEspecie from "./component/especie/NuevaEspecie";
import EditarEspecie from "./component/especie/EditarEspecie";

import Lotes from "./component/lote/Lotes";
import NuevoLote from "./component/lote/NuevoLote";
import EditarLote from "./component/lote/EditarLote";

import Tipos from "./component/tipo/Tipos";

import Reporte from "./component/reporteDiario/Reporte"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<RutaProtegida />}>
          <Route path="/" element={<Login />} />

          {/* Empleado */}
          <Route path="/empleado" element={<Empleados />} />
          <Route path="/empleado/nuevo" element={<NuevoEmpleado />} />
          <Route path="/empleado/editar/:id" element={<EditarEmpleado />} />

          {/* Compra */}
          <Route path="/compra" element={<Compras />} />
          <Route path="/compra/nueva" element={<NuevaCompra />} />
          <Route path="/compra/editar/:id" element={<EditarCompra />} />

          {/* Compradores */}
          <Route path="/compradores" element={<Compradores />} />
          <Route path="/comprador/nuevo" element={<NuevoComprador />} />
          <Route path="/comprador/editar/:id" element={<EditarComprador />} />

          {/* Especies */}
          <Route path="/especies" element={<Especies />} />
          <Route path="/especie/nueva" element={<NuevaEspecie />} />
          <Route path="/especie/editar/:id" element={<EditarEspecie />} />

          {/* Lotes */}
          <Route path="/lotes" element={<Lotes />} />
          <Route path="/lote/nuevo" element={<NuevoLote />} />
          <Route path="/lote/editar/:id" element={<EditarLote />} />

          {/* Tipos */}
          <Route path="/tipos" element={<Tipos />} />

          {/* Reporte */}
          <Route path="/reporte" element={<Reporte />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;