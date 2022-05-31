import Home from '~/pages/Home';

//Không cần đăng nhập
const publicRoutes = [{ path: '/', component: Home }];

//Cần đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };
