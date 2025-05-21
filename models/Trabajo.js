import mongoose from "mongoose";

const trabajoSchema = mongoose.Schema({
    categoria: { type: String, required: true},
    estado: { type: String, required: true},
    idFactura: { type: String, required: true},
    descripcion: { type: String, required: false},
    costo: {type: Number, required: true}
}, { timestamps: true});

export default mongoose.model("Trabajo", trabajoSchema);