import { especie } from "../models/especie.js"

const crearEspecie = async (req,res,next) => {
    const datos=req.body
    console.log(datos)
    const especies = new especie(datos)
    try{
        await especies.save()
        res.json({
            mensaje:"Se creo la especie"
        })
    }catch(error){
        console.log(error)
        next()
    }  
}

const eliminarEspecie=async(req,res,next)=>{
    try{
        console.log(req.params.id)
        const especies=await especie.findByIdAndDelete({_id:req.params.id},
            req.body,{
                new:true
            })
            res.json(especies)
       
    }catch(error){
         res.send(error)
        next()
    }
    
}

const consultaEspecies=async(req,res,next)=>{
          
    try{
        const especies=await especie.find({})
        res.json(especies)
    }catch(error){
        console.log(error)
        next()
    }
    
}

const actualizarEspecie=async(req,res,next)=>{      
    try{
        console.log(req.params.id)
        const especies=await especie.findByIdAndUpdate({_id:req.params.id},
            req.body,{
                new:true
            })
            res.json(especies)
       
    }catch(error){
         res.send(error)
        next()
    }    
}

const consultaIdEspecie=async(req,res,next)=>{
          
    try{
        const especies=await especie.findById(req.params.id)
        if(!especies){
            res.json({
                mensaje:"La especie no existe"
            })
            next
        }
        res.json(especies)
    }catch(error){
         res.send(error)
        next()
    }
    
}

const cambiarEstadoEspecie = async(req,res,next) => {
    try{
        const { id } = req.params;

        const especieEncontrada = await especie.findById(id);

        if (!especieEncontrada) {
            return res.status(404).json({ mensaje: "Especie no encontrada" });
        }

        especieEncontrada.estado = !especieEncontrada.estado;
    
        const especieActualizada = await especieEncontrada.save();

        res.json({
            mensaje: "Estado de especie actualizado correctamente",
            especie: especieActualizada
        });
       
    }catch(error){
        console.error(error);
        if (error.kind === 'ObjectId') {
             return res.status(400).json({ mensaje: "ID de especie no válido" });
        }
        res.status(500).json({ mensaje: "Error al actualizar el estado de la especie" });
    }  
};

export{
    crearEspecie,
    eliminarEspecie,
    consultaIdEspecie,
    consultaEspecies,
    actualizarEspecie,
    cambiarEstadoEspecie
}