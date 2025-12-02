function Tipo({tipo}){
 const {nombre}=tipo
   return(
     <li className="tipo">
        <div className="info-tipo">
            <p className="nombre">Tipo: {nombre}</p>
        </div>
    </li>
   )
}
export default Tipo