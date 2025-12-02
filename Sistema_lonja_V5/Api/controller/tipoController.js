import { tipo } from "../models/tipo.js";

const crearTipo = async (req,res,next) => {
    const datos=req.body
    console.log(datos)
    const tipos = new tipo(datos)
    try{
        await tipos.save()
        res.json({
            mensaje:"Se creo el tipo"
        })
    }catch(error){
        console.log(error)
        next()
    }  
}

const eliminarTipo=async(req,res,next)=>{
    try{
        console.log(req.params.id)
        const tipos=await tipo.findByIdAndDelete({_id:req.params.id},
            req.body,{
                new:true
            })
            res.json(tipos)
       
    }catch(error){
         res.send(error)
        next()
    }
    
}

const consultaTipos=async(req,res,next)=>{
          
    try{
        const tipos=await tipo.find({})
        res.json(tipos)
    }catch(error){
        console.log(error)
        next()
    }
    
}

const actualizarTipo=async(req,res,next)=>{
          
    try{
        console.log(req.params.id)
        const tipos=await tipo.findByIdAndUpdate({_id:req.params.id},
            req.body,{
                new:true
            })
            res.json(tipos)
       
    }catch(error){
         res.send(error)
        next()
    }    
}

const consultaIdTipo=async(req,res,next)=>{
          
    try{
        const tipos=await tipo.findById(req.params.id)
        if(!tipos){
            res.json({
                mensaje:"El tipo no existe"
            })
            next
        }
        res.json(tipos)
    }catch(error){
         res.send(error)
        next()
    }
    
}

export{
    crearTipo,
    eliminarTipo,
    consultaIdTipo,
    consultaTipos,
    actualizarTipo
}