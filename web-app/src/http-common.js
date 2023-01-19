import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Authorization": process.env.REACT_APP_TOKEN,
      "Content-type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
    }
});
// const unsecureRequest = () => {
//   return axios.create({
//     baseURL: process.env.REACT_APP_API_URL,
//     headers: {
//       "Content-type": "application/json"
//     }
//   });
// }
