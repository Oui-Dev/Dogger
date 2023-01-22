import http  from '../../http-common';


const devices = (data) => {
  return http.get(`/users/devices`, data);
};

const login = (data) => {
  return http.post(`/login`, data);
};

const register = (data) => {
  return http.post(`/register`, data);
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
  login,
  register,
  update,
  remove,
  logout,
  logoutAll,
  devices
};

export default UserService;