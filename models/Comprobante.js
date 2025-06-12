import mongoose from "mongoose";

const comprobanteSchema = mongoose.Schema({
    idCliente: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cliente' }, //id del cliente que ingreso el componente
    finalizado: { type: Boolean, default: false }, //si el comprobante esta finalizado. Esto para que no puedan agregar mas detalles/trabajos al comprobante.
}, { timestamps: true });

export default mongoose.model("Comprobante", comprobanteSchema); 