import http from '../../http-common';

const getAll = () => {
  return http.get("/errors");
};

const updateStatus = (id, data) => {
  return http.put(`/errors/status/${id}`, data);
};

const updateAssign = (id, data) => {
  return http.put(`/errors/assign/${id}`, data);
};

const ErrorService = {
  getAll,
  updateStatus,
  updateAssign
};

export default ErrorService;