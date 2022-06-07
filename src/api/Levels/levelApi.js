import axiosClient from '../axiosClient';

const levelApi = {
    getAll() {
        const url = '/get/levels';
        return axiosClient.get(url);
    },
};

export default levelApi;
