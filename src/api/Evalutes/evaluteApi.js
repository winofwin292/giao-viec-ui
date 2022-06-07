import axiosClient from '../axiosClient';

const evaluteApi = {
    getAll() {
        const url = '/get/evalutes';
        return axiosClient.get(url);
    },
};

export default evaluteApi;
