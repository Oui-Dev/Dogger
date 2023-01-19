import { secureRequest, unsecureRequest } from '../../http-common';


const devices = (data) => {
  return secureRequest.get(`/users/devices`, data);
};

const login = (data) => {
  return unsecureRequest.post(`/login`, data);
};

const register = (data) => {
  return unsecureRequest.post(`/register`, data);
};

const update = (data) => {
  return secureRequest.put(`/users/edit`, data);
};

const remove = () => {
  return secureRequest.delete(`/users/delete`);
};

const logout = (token) => {
  return secureRequest.delete(`/logout/${token}`);
};

const logoutAll = () => {
  return secureRequest.delete(`/logout/all`);
};

const UserService = {
  login,
  register,
  update,
  remove,
  logout,
  logoutAll,
  devices
};

export default UserService;