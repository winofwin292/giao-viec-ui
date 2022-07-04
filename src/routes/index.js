import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';
import WorkLogs from '~/pages/WorkLogs';
import { DefaultLayout } from '~/components/Layouts';

//Cấu hình routes và layout
const configRoutes = [
    { path: '/', component: Dashboard, layout: DefaultLayout },
    { path: '/login', component: Login, layout: null },
    { path: '/logs', component: WorkLogs, layout: null },
];

export { configRoutes };
