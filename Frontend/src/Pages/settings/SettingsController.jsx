import { useOutletContext } from 'react-router-dom';
import AdminSettings from './AdminSettings';
import Settings from './Settings';

export default function SettingsController() {
  const { userInfo } = useOutletContext();
  return userInfo.type === 'Admin' ? <AdminSettings /> : <Settings />;
}
