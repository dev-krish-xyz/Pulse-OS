import { Bell, Search, Settings } from 'lucide-react';
import { useAuthStore } from '../../store/auth.store';
import { Role } from '../../types/index';

export default function Header() {
  const user = useAuthStore((state) => state.user);

  const getRoleBadgeColor = () => {
    switch (user?.role) {
      case Role.ADMIN:
        return 'bg-blue-500';
      case Role.DOCTOR:
        return 'bg-emerald-500';
      case Role.STAFF:
        return 'bg-violet-500';
      default:
        return 'bg-slate-500';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search patients, appointments..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent focus:bg-white transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 ml-6">
          {/* Notifications */}
          <button className="relative p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* Settings */}
          <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
            <Settings className="w-[18px] h-[18px]" />
          </button>

          {/* User */}
          <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{user?.full_name}</p>
              <p className="text-xs text-slate-500">{user?.role}</p>
            </div>
            <div className="relative">
              <div className="w-9 h-9 bg-slate-200 rounded-xl flex items-center justify-center">
                <span className="text-sm font-semibold text-slate-600">
                  {user?.full_name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${getRoleBadgeColor()} rounded-full ring-2 ring-white`}></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
