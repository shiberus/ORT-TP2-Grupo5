import mongoose from 'mongoose';

/**
 * Valida que un string no esté vacío y que su longitud esté dentro de un rango determinado.
 *
 * @param {string} s - El string a validar.
 * @param {number} [min=1] - Longitud mínima permitida (por defecto 1).
 * @param {number} [max=100] - Longitud máxima permitida (por defecto 100).
 * @returns {boolean} - Devuelve true si el string es válido, false en caso contrario.
 */
export const validarString = (s, min = 1, max = 100) => {
  return typeof s === 'string' && s.trim().length >= min && s.trim().length <= max;
};

/**
 * Valida que un string sea un ObjectId válido de MongoDB.
 *
 * @param {string} id - El ID a validar.
 * @returns {boolean} - Devuelve true si el ID es válido, false si no lo es.
 */
export const validarObjectId = (id) => {
  return typeof id === 'string' && mongoose.Types.ObjectId.isValid(id);
};

/**
 * Valida que un string tenga formato de correo electrónico.
 *
 * @param {string} email - El email a validar.
 * @returns {boolean} - Devuelve true si el formato es válido, false si no lo es.
 */
export const validarEmail = (email) => {
  if (typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

/**
 * Valida que un valor sea un número dentro de un rango determinado.
 *
 * @param {number|string} n - El número a validar.
 * @param {number} - Valor mínimo permitido (por defecto 0).
 * @param {number} - Valor máximo permitido (por defecto Number.MAX_SAFE_INTEGER).
 * @returns {boolean} - Devuelve true si el número es válido, false si no lo es.
 */
export const validarNumero = (n, min = 0, max = Number.MAX_SAFE_INTEGER) => {
  const num = typeof n === 'number' ? n : parseFloat(n);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Valida que una contraseña tenga entre 8 y 16 caracteres,
 * al menos una mayúscula y al menos un número.
 *
 * @param {string} password - La contraseña a validar.
 * @returns {boolean} - Devuelve true si la contraseña es válida, false si no lo es.
 */
export const validarPassword = (password) => {
  if (typeof password !== 'string') return false;
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/;
  return regex.test(password);
};