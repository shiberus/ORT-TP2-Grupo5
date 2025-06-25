import mongoose from "mongoose";
import { ESTADOS_TRABAJO } from "../constants/trabajosEnum.js";

const trabajoSchema = mongoose.Schema({
    //categoria: { type: String, enum: CATEGORIAS_TRABAJO, required: true },
    estado: { type: String, enum: ESTADOS_TRABAJO},
    descripcion: { type: String },
    costo: { type: Number},
    idEquipo: { type: mongoose.Schema.Types.ObjectId, ref: "Equipo", required: true },
    idEmpleado: { type: mongoose.Schema.Types.ObjectId, ref: "Empleado" }, 
    idComponente: {type: mongoose.Schema.Types.ObjectId, ref: "Componente" }
    }, { timestamps: true });

export default mongoose.model("Trabajo", trabajoSchema)