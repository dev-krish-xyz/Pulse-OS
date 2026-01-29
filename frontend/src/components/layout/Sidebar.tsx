import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { Role } from '../../types/index';
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  FileText,
  Receipt,
  UserCog,
  LogOut,
  Activity,
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: any;
  roles: Role[];
}

const navigation: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: [Role.ADMIN, Role.DOCTOR, Role.STAFF] },
  { name: 'Patients', path: '/patients', icon: Users, roles: [Role.ADMIN, Role.DOCTOR, Role.STAFF] },
  { name: 'Doctors', path: '/doctors', icon: Stethoscope, roles: [Role.ADMIN, Role.STAFF] },
  { name: 'Staff', path: '/staff', icon: UserCog, roles: [Role.ADMIN] },
  { name: 'Appointments', path: '/appointments', icon: Calendar, roles: [Role.ADMIN, Role.DOCTOR, Role.STAFF] },
  { name: 'Medical Records', path: '/medical-records', icon: FileText, roles: [Role.ADMIN, Role.DOCTOR] },
  { name: 'Billing', path: '/billing', icon: Receipt, roles: [Role.ADMIN, Role.STAFF] },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(user?.role as Role)
  );

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
        <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Pulse OS</h1>
          <p className="text-xs text-gray-500">Hospital Management</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {filteredNavigation.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
              {user?.full_name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.full_name}
            </p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
