import axios from 'axios';

const instance = axios.create({
    baseURL: "/",
    timeout: 50000,
    withCredentials: true   // Issue CORS requests with credentials
});

instance.interceptors.response.use((response) => {
    return response;
}, function (error) {
  if (error.response) {
    // The server responded with an error http code
    if (error.response.status === 401) {
      if(process.env.NODE_ENV != "development"){
        window.location.href = process.env.API_HOST
        return
      } else {
        window.location.href = "http://localhost:3000"
        console.log(error.response)
      }
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  return Promise.reject(error.response);
});

export default {
    request(options) {
        return instance.request(options);
    }
};
