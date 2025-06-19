import mongoose from "mongoose";

const empleadoSchema = mongoose.Schema({
    nombre: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    rol: { type: String, required: true},
    profile_pic: { type: String},
    activo: { type: Boolean, default: true},
}, { timestamps: true});

export default mongoose.model("Empleado", empleadoSchema);