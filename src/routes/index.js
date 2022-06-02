import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Dashboard from '~/pages/Dashboard';

//Không cần đăng nhập
const publicRoutes = [
    { path: '/', component: Dashboard, layout: null },
    { path: '/login', component: Login, layout: null },
];

//Cần đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };
