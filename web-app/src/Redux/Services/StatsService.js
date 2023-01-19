import { secureRequest } from '../../http-common';

const getAll = () => {
  return secureRequest.get("/stats");
};


const StatsService = {
  getAll,
};

export default StatsService;