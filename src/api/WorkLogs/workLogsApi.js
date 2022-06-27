import axiosClient from '../axiosClient';

const workLogsApi = {
    getAllLogByIdUser(data) {
        const url = '/logs/user_id';
        return axiosClient.post(url, data);
    },
    getByIdUser(data) {
        const url = '/logs/receives_by_userID';
        return axiosClient.post(url, data);
    },
    getByIdWork(data) {
        const url = '/logs/receive_id';
        return axiosClient.post(url, data);
    },
    addLogs(data) {
        const url = '/logs/create';
        return axiosClient.post(url, data);
    },
};

export default workLogsApi;
