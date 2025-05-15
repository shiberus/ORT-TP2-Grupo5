import mongoose from "mongoose";

const equipoSchema = mongoose.Schema({
    nombre: { type: String, required: true},
    modelo: { type: String, required: true},
    idCliente: { type: String, required: true}
}, { timestamps: true});

export default mongoose.model("Equipo", equipoSchema);