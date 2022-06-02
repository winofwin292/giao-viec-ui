import classNames from 'classnames/bind';
import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Login.module.scss';
import userApi from '~/api/useApi';

const cx = classNames.bind(styles);

function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            EMAIL: username,
            PASSWORD_USERS: password,
        };
        const token = await userApi.login(data);
        setToken(token.ID);
    };

    return (
        <div className={cx('login-wrapper')}>
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={(e) => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired,
};

export default Login;
