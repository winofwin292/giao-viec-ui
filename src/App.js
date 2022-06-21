import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layouts';
import Login from '~/pages/Login';

function App() {
    const loginInUser = useSelector((state) => state.user.current);
    const isLoggedIn = !!loginInUser.id;
    // console.log(loginInUser);

    if (!isLoggedIn) {
        return <Login />;
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
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
