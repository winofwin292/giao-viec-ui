import axiosClient from '../axiosClient';

const workLogsApi = {
    //Lấy tất cả log theo userId
    getAllLogByIdUser(data) {
        const url = '/logs/user_id';
        return axiosClient.post(url, data);
    },
    //Lấy tất cả công việc mà user được nhận
    getByIdUser(data) {
        const url = '/logs/receives_by_userID';
        return axiosClient.post(url, data);
    },

    getByIdWork(data) {
        const url = '/logs/receive_id';
        return axiosClient.post(url, data);
    },
    //Thêm log mới
    addLogs(data) {
        const url = '/logs/create';
        return axiosClient.post(url, data);
    },
};

export default workLogsApi;
