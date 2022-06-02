import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh, faBarsProgress, faListCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const arrBlock = [
        {
            name: 'Công việc',
            icon: faGaugeHigh,
        },
        {
            name: 'Đã giao',
            icon: faBarsProgress,
        },
        {
            name: 'Hoàn thành',
            icon: faListCheck,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('hello')}>Chào mừng</div>
            Sau đây là thống kê công việc
            <ul className={cx('block')}>
                {arrBlock.map((item, index) => (
                    <li className={cx('block-item')} key={index}>
                        <div className={cx('block-title')}>{item.name}</div>
                        <div className={cx('block-data')}>
                            <div className={cx('block-num')}>10</div>
                            &nbsp;
                            <FontAwesomeIcon icon={item.icon} fixedWidth size="xl" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
