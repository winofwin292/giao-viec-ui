import axiosClient from '../axiosClient';

const typeApi = {
    getAll() {
        const url = '/get/types';
        return axiosClient.get(url);
    },
};

export default typeApi;
