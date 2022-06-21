import axiosClient from '../axiosClient';

const workLogsApi = {
    getByIdUser(data) {
        const url = '/logs/receives_by_userID';
        return axiosClient.post(url, data);
    },
};

export default workLogsApi;
