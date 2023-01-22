import http from '../../http-auth';
import http2 from '../../http-common';

const current = () => {
  return http.get(`/users/current`);
};

const devices = (data) => {
  return http.get(`/users/devices`, data);
};

const login = (data) => {
  return http2.post(`/login`, data);
};

const register = (data) => {
  return http2.post(`/register`, data);
};

const update = (data) => {
  return http.put(`/users/edit`, data);
};

const remove = () => {
  return http.delete(`/users/delete`);
};

const logout = (token) => {
  return http.delete(`/logout/${token}`);
};

const logoutAll = () => {
  return http.delete(`/logout/all`);
};

const UserService = {
  current,
  login,
  register,
  update,
  remove,
  logout,
  logoutAll,
  devices
};

export default UserService;