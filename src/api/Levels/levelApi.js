import axiosClient from '../axiosClient';

const levelApi = {
    //Lấy tất cả loại công việc
    getAll() {
        const url = '/get/levels';
        return axiosClient.get(url);
    },
};

export default levelApi;
