import Trabajo from '../models/Trabajo'

export const getTrabajos = async ( req, res ) => {

    try {
        const trabajo = await Trabajo.find()
        res.status(200).json(trabajo)
        
    } catch (error) {
        res.status(500).json({error: "Ocurrió un error"})        
    }
}

export const createTrabajo = async (req,res) => {

    const { categoria, estado, descripcion, costo, idEquipo, idEmpleado, idComponente } = req.body;
    
    if(!categoria || !estado || !costo || !idEquipo){
        return res.status(400).json({error: "Faltan datos"})
    }

    const trabajo = {
        categoria,
        estado,
        costo,
        idEquipo,
    };

    if (descripcion) trabajo.descripcion = descripcion;
    if (idEmpleado) trabajo.idEmpleado = idEmpleado;
    if (idComponente) trabajo.idComponente = idComponente;

    try {
        const nuevoTrabajo = await Trabajo.create(trabajo);
        res.status(201).json(nuevoTrabajo);
    } catch (error) {
        console.error("Error al crear Trabajo:", error);
        res.status(500).json({ error: "Error al crear el Trabajo" });
    }
}

export const getTrabajoById = async (req, res) => {

    try {
        const trabajo = await Trabajo.findById(req.params.id)
        if(trabajo){
            res.json(trabajo)
        }else{
            res.status(404).json({ error: 'Trabajo no encontrado'})
        }
    } catch (error) {
        res.status(500).json({ error: "ID Invalido"})
    }

}

export const deleteTrabajo = async (req, res) => {
    try {
        const trabajoEliminado = await Trabajo.findByIdAndDelete(req.params.id);

        if (trabajoEliminado) {
        res.status(200).json({ mensaje: "Trabajo eliminado correctamente" });
        } else {
        res.status(404).json({ error: "Trabajo no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "ID inválido" });
    }
};

export const updateTrabajo = async (req, res) => {
    try {
        const trabajoActualizado = await Trabajo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
        );

        if (trabajoActualizado) {
        res.status(200).json(trabajoActualizado);
        } else {
        res.status(404).json({ error: "Trabajo no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el trabajo", detalle: error.message });
    }
};
