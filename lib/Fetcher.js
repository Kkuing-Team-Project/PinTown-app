import axios from "axios";

const fetcher = axios.create({
  baseURL: 'http://192.168.0.89:8080'
});


export default fetcher;