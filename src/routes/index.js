import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';
import WorkLogs from '~/pages/WorkLogs';
import { DefaultLayout } from '~/components/Layouts';
//Không cần đăng nhập
const publicRoutes = [
    { path: '/', component: Dashboard, layout: DefaultLayout },
    { path: '/login', component: Login, layout: null },
    { path: '/logs', component: WorkLogs, layout: null },
];

//Cần đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };
