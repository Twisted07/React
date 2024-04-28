import styles from './AppLayout.module.css';
import Sidebar from '../components/Sidebar';
import Map from '../components/Map';
import User from '../components/User';
import Login from './Login';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function AppLayout() {
    const {isAuthenticated} = useAuth();

    return (
        <div className={styles.app}>
            <Sidebar />
            <Map />
            {isAuthenticated ? <User /> : null}
        </div>
    );
}

export default AppLayout;