import axiosClient from '../axiosClient';

const worksApi = {
    getAll() {
        const url = '/works';
        return axiosClient.get(url);
    },
    getById(data) {
        const url = '/works/ID';
        return axiosClient.post(url, data);
    },
    getChild(data) {
        const url = '/works/work_id';
        return axiosClient.post(url, data);
    },
    createWork(data) {
        const url = '/works/create';
        return axiosClient.post(url, data);
    },
    updateStatus(data) {
        const url = '/works/update_work_status';
        return axiosClient.post(url, data);
    },
    getProjectByUserId(data) {
        const url = 'works/project_by_userid';
        return axiosClient.post(url, data);
    },
    getWorkByProjectId(data) {
        const url = 'works/work_by_projectid';
        return axiosClient.post(url, data);
    },
};

export default worksApi;
