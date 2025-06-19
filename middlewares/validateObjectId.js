import * as val from '../utils/Validador.js';

export const validateId = (req, res, next) => {
  if (val.validarObjectId(req.params.id)) {
    next()
  } else {
    res.status(400).json({error: "Id inválido"})
  }
}