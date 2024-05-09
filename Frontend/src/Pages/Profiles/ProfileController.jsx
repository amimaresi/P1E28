import { useOutletContext } from 'react-router-dom';
import CPLayout from './Chercheur/CPLayout';
import AdminPLayout from './Admin/AdminPLayout';

export default function ProfileController() {
  const { userInfo } = useOutletContext();
  return userInfo.type === 'Admin' ? <AdminPLayout /> : <CPLayout />;
}
