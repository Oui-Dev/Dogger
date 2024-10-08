import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
      "Content-type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
    }
});