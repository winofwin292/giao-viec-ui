import axiosClient from '../axiosClient';

const workReceivesApi = {
    update(data) {
        const url = '/works/update_work_receive';
        return axiosClient.post(url, data);
    },
    updateStatus(data) {
        const url = '/works/update_receive_status';
        return axiosClient.post(url, data);
    },
};

export default workReceivesApi;
