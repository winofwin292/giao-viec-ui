import axios from 'axios';
import StorageKeys from '~/constants/storage-keys';

const axiosClient = axios.create({
    baseURL: 'http://192.168.2.46:8081/',
    // baseURL: 'http://127.0.0.1:8081/',
    headers: {
        'content-type': 'application/json',
    },
});

axiosClient.interceptors.request.use(
    function (config) {
        const customHeaders = {};

        const accessToken = localStorage.getItem(StorageKeys.access);
        if (accessToken) {
            customHeaders.Authorization = `Bearer ${accessToken}`;
        }
        return {
            ...config,
            headers: {
                ...customHeaders,
                ...config.headers,
            },
        };
    },
    function (error) {
        return Promise.reject(error);
    },
);

axiosClient.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
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
