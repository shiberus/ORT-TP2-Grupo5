import mongoose from "mongoose";

const comprobanteDetalleSchema = mongoose.Schema({
  idComprobante: { type: mongoose.Schema.Types.ObjectId, ref: "Comprobante", required: true },
  idTrabajo: { type: mongoose.Schema.Types.ObjectId, ref: "Trabajo", required: true },
});

export default mongoose.model("ComprobanteDetalle", comprobanteDetalleSchema);