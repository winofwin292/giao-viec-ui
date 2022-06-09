import axiosClient from '../axiosClient';

const userApi = {
    register(data) {
        const url = '/register';
        return axiosClient.post(url, data);
    },
    login(data) {
        const url = '/login';
        return axiosClient.post(url, data);
    },
    getAll() {
        const url = '/users';
        return axiosClient.get(url);
    },
};

export default userApi;
