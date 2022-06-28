import axiosClient from '../axiosClient';

const projectApi = {
    getAll() {
        const url = '/get/projects';
        return axiosClient.get(url);
    },
};

export default projectApi;
