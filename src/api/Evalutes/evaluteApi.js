import axiosClient from '../axiosClient';

const evaluteApi = {
    //Lấy tất cả loại đánh giá công việc
    getAll() {
        const url = '/get/evalutes';
        return axiosClient.get(url);
    },
};

export default evaluteApi;
