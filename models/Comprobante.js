import mongoose from "mongoose";

const comprobanteSchema = mongoose.Schema({
    idCliente: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cliente' }, //id del cliente que ingreso el componente
    monto: { type: Number, required: true }, //costo del servicio
    idComponente: { type: String, required: true}, //id del componente que ingreso
    idTrabajo: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Trabajo' }, //id del trabajo que se realizo
    idEmpleado: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Empleado' } //id del empleado que genero el comprobante
}, { timestamps: true });

export default mongoose.model("Comprobante", comprobanteSchema); 