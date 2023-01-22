import http from '../../http-common';

const getAll = () => {
  return http.get("/stats");
};


const StatsService = {
  getAll,
};

export default StatsService;