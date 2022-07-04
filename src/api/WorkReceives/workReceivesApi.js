import axiosClient from '../axiosClient';

const workReceivesApi = {
    //Cập nhật thông tin nhận việc
    update(data) {
        const url = '/works/update_work_receive';
        return axiosClient.post(url, data);
    },
    //Cập nhật trạng thái nhận việc
    updateStatus(data) {
        const url = '/works/update_receive_status';
        return axiosClient.post(url, data);
    },
};

export default workReceivesApi;
