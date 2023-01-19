import { secureRequest } from '../../http-common';

const getAll = () => {
  return secureRequest.get("/errors");
};

const updateStatus = (id, data) => {
  return secureRequest.put(`/errors/status/${id}`, data);
};

const updateAssign = (id, data) => {
  return secureRequest.put(`/errors/assign/${id}`, data);
};

const ErrorService = {
  getAll,
  updateStatus,
  updateAssign
};

export default ErrorService;