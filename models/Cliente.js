import mongoose from "mongoose";

const clienteSchema = mongoose.Schema({
    nombre: { type: String, required: true},
    email: { type: String, required: true},
    telefono: { type: String, required: true},
    direccion: { type: String},
}, { timestamps: true});

export default mongoose.model("Cliente", clienteSchema);