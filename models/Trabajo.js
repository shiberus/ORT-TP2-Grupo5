import mongoose from "mongoose";

const trabajoSchema = mongoose.Schema({
    categoria: { type: String, enum: ["hardware", "software", "mantenimiento", "diagnóstico"], required: true },
    estado: { type: String, enum: ["pendiente", "esperando repuesto", "en proceso", "finalizado"], required: true },
    descripcion: { type: String },
    costo: { type: Number, required: true },
    idEquipo: { type: mongoose.Schema.Types.ObjectId, ref: "Equipo", required: true },
    idEmpleado: { type: mongoose.Schema.Types.ObjectId, ref: "Empleado" }, 
    }, { timestamps: true });

export default mongoose.model("Trabajo", trabajoSchema)