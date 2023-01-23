import http from '../../http-auth';

const getAll = () => {
  return http.get("/stats");
};


const StatsService = {
  getAll,
};

export default StatsService;