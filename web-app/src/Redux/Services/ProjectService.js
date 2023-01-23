import http  from '../../http-auth';

const getAll = () => {
  return http.get("/projects");
};

const create = data => {
  return http.post(`/projects/new`, data);
};

const update = (id, data) => {
  return http.put(`/projects/edit/${id}`, data);
};

const remove = id => {
  return http.delete(`/projects/delete/${id}`);
};


const ProjectsService = {
  getAll,
  create,
  update,
  remove
};

export default ProjectsService;