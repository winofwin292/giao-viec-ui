import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh, faBarsProgress, faListCheck } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar({ onFilter }) {
    const arrSidebar = [
        {
            name: 'Trang chủ',
            icon: faGaugeHigh,
        },
        {
            name: 'Công việc',
            icon: faBarsProgress,
        },
        {
            name: 'Giao việc',
            icon: faListCheck,
        },
    ];

    return (
        <aside className={cx('wrapper')}>
            <ul className={cx('sidebar-overlay')}>
                {arrSidebar.map((item, index) => (
                    <li key={index} className={cx('item', 'active')} onClick={() => onFilter(index)}>
                        <FontAwesomeIcon icon={item.icon} />
                        &nbsp;
                        <div>{item.name}</div>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default Sidebar;
