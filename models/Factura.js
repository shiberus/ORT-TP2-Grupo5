import mongoose from "mongoose";

const facturaSchema = mongoose.Schema({
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
    monto: {type: Number, required: true},
    fecha: {type: Date, required: true}
}, {timestamps: true})

export default mongoose.model("Factura", facturaSchema)