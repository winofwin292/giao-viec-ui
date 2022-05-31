import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar({ onFilter }) {
    const arrSidebar = ['Trang chủ', 'Giao việc', 'Liên hệ'];

    return (
        <aside className={cx('wrapper')}>
            <ul className={cx('sidebar-overlay')}>
                {arrSidebar.map((item, index) => (
                    <li key={index} className={cx('active')} onClick={() => onFilter(index)}>
                        <FontAwesomeIcon icon={solid('user-secret')} />
                        &nbsp;
                        <div>{item}</div>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default Sidebar;
