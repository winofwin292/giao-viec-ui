import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layouts';
import Login from '~/pages/Login';
import StorageKeys from '~/constants/storage-keys';
import jwt_decode from 'jwt-decode';

function App() {
    const loginInUser = useSelector((state) => state.user.current.id);
    const isLoggedIn = !!loginInUser;
    let expired = true;

    //kiểm tra thời hạn của token
    let token = localStorage.getItem(StorageKeys.access) || {};
    if (Object.entries(token).length !== 0) {
        let decodedToken = jwt_decode(token);
        // console.log('Decoded Token', decodedToken);
        let currentDate = new Date();
        if (!(decodedToken.exp * 1000 < currentDate.getTime())) {
            expired = false;
        }
    }

    // console.log(!isLoggedIn || expired);
    if (!isLoggedIn || expired) {
        return <Login />;
    }
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        //Xử lí nếu có layout được truyền vào
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) Layout = route.layout;
                        else if (route.layout === null) Layout = Fragment;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}
export default App;
