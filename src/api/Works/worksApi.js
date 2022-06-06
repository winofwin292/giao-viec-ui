import axiosClient from '../axiosClient';

const worksApi = {
    getAll(data) {
        const url = '/works';
        return axiosClient.get(url);
    },
    getById(data) {
        const url = '/works/ID';
        return axiosClient.post(url, data);
    },
};

export default worksApi;
