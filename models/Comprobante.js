import mongoose from "mongoose";

const comprobanteSchema = mongoose.Schema({
    idCliente: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cliente' }, //id del cliente que ingreso el componente
}, { timestamps: true });

export default mongoose.model("Comprobante", comprobanteSchema); 