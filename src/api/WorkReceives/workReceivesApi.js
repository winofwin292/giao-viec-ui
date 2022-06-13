import axiosClient from '../axiosClient';

const workReceivesApi = {
    update(data) {
        const url = '/works/update_work_receive';
        return axiosClient.post(url, data);
    },
};

export default workReceivesApi;
