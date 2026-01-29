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
  ChevronRight,
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

  const getRoleBadgeColor = () => {
    switch (user?.role) {
      case Role.ADMIN:
        return 'bg-blue-50 text-blue-600';
      case Role.DOCTOR:
        return 'bg-emerald-50 text-emerald-600';
      case Role.STAFF:
        return 'bg-violet-50 text-violet-600';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 px-5 py-5 border-b border-slate-100 hover:bg-slate-50 transition-colors">
        <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-base font-semibold text-slate-900">Pulse OS</h1>
          <p className="text-[11px] text-slate-500">Healthcare Platform</p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {filteredNavigation.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span>{item.name}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-slate-400" />}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-3 bg-slate-50 rounded-xl mb-2">
          <div className="w-9 h-9 bg-slate-200 rounded-lg flex items-center justify-center">
            <span className="text-sm font-semibold text-slate-600">
              {user?.full_name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {user?.full_name}
            </p>
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${getRoleBadgeColor()}`}>
              {user?.role}
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-[18px] h-[18px]" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
