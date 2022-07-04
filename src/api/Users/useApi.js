import axiosClient from '../axiosClient';

const userApi = {
    //Đăng kí
    register(data) {
        const url = '/register';
        return axiosClient.post(url, data);
    },
    //Đăng nhập
    login(data) {
        const url = '/login';
        return axiosClient.post(url, data);
    },

    getAll() {
        const url = '/users';
        return axiosClient.get(url);
    },
    //Lấy thông tin của user id được truyền vào
    getUser(data) {
        const url = `users/id`;
        return axiosClient.post(url, data);
    },
};

export default userApi;
