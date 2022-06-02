import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://192.168.2.25:8081/',
    headers: {
        'content-type': 'application/json',
    },
    mode: 'cors',
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const { config, status, data } = error.response;
        const urls = ['/login'];
        if (urls.includes(config.url) && status === 400) {
            const errorList = data.data || [];
            const firstError = errorList.length > 0 ? errorList[0] : {};
            const messageList = firstError.messages || [];
            const firstMessage = messageList.length > 0 ? messageList[0] : {};
            throw new Error(firstMessage.message);
        }
        return Promise.reject(error);
    },
);

export default axiosClient;
