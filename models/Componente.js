import mongoose from "mongoose";

const componenteSchema = mongoose.Schema({
    nombre: {type: String, required: true},
    costo: { type: Number, required: true }
})

export default mongoose.model("Componente", componenteSchema)