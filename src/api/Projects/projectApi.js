import axiosClient from '../axiosClient';

const projectApi = {
    //Lấy tất cả dự án
    getAll() {
        const url = '/get/projects';
        return axiosClient.get(url);
    },
};

export default projectApi;
