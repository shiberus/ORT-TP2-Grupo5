import { getDbState } from "../utils/statusService.js";

export const getStatus = (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API is up and running',
    timestamp: new Date().toISOString(),
    database: getDbState(),
  });
};
