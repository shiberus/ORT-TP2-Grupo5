import mongoose from "mongoose";

const facturaDetalleSchema = mongoose.Schema({
    idFactura: { type: mongoose.Schema.Types.ObjectId, ref: "Factura", required: true },
    idTrabajo: { type: mongoose.Schema.Types.ObjectId, ref: "Trabajo", required: true },
    costoIndividual: { type: Number, required: true },
    componentes: { type: mongoose.Schema.Types.ObjectId, ref: "Componente" }
});

export default mongoose.model("FacturaDetalle", facturaDetalleSchema)