import mongoose from "mongoose";

export const getDbState = () => {
  const dbState = mongoose.connection.readyState;
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];

  return {
    state: states[dbState],
    code: dbState
  }
}