import axiosClient from '../axiosClient';

const worksApi = {
    //Lấy tất cả công việc
    getAll() {
        const url = '/works';
        return axiosClient.get(url);
    },
    //Lấy công thông tin nhận việc theo id
    getById(data) {
        const url = '/works/ID';
        return axiosClient.post(url, data);
    },
    //Lấy công việc con
    getChild(data) {
        const url = '/works/work_id';
        return axiosClient.post(url, data);
    },
    //Tạo mới công việc
    createWork(data) {
        const url = '/works/create';
        return axiosClient.post(url, data);
    },
    //Cập nhật trạng thái công việc
    updateStatus(data) {
        const url = '/works/update_work_status';
        return axiosClient.post(url, data);
    },
    //Lấy danh sách dự án theo user id
    getProjectByUserId(data) {
        const url = 'works/project_by_userid';
        return axiosClient.post(url, data);
    },
    //Lấy dánh sách công việc theo project id và user id
    getWorkByProjectId(data) {
        const url = 'works/work_by_projectid';
        return axiosClient.post(url, data);
    },
};

export default worksApi;
