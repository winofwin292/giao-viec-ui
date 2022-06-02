import Home from '~/pages/Home';
import Login from '~/pages/Login';

//Không cần đăng nhập
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login, layout: null },
];

//Cần đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };
