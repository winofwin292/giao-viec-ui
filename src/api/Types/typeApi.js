import axiosClient from '../axiosClient';

const typeApi = {
    getAll() {
        //Lấy tất cả loại nhận công việc
        const url = '/get/types';
        return axiosClient.get(url);
    },
};

export default typeApi;
