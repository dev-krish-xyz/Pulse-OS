import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';
import { Role } from '../../types/index';
import { 
  Users, 
  Calendar, 
  FileText, 
  DollarSign, 
  UserPlus, 
  CalendarPlus, 
  Receipt, 
  ClipboardList,
  Stethoscope,
  TrendingUp,
  Clock,
  Activity,
  ArrowRight,
  Plus,
  Mic,
  MessageSquare,
  Bell
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const stats = [
    { name: 'Total Patients', value: '1,234', change: '+12%', icon: Users, color: 'bg-blue-500', lightColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { name: 'Appointments Today', value: '24', change: '+5', icon: Calendar, color: 'bg-emerald-500', lightColor: 'bg-emerald-50', textColor: 'text-emerald-600' },
    { name: 'Medical Records', value: '856', change: '+8%', icon: FileText, color: 'bg-violet-500', lightColor: 'bg-violet-50', textColor: 'text-violet-600' },
    { name: 'Revenue (Month)', value: '$45,230', change: '+18%', icon: DollarSign, color: 'bg-amber-500', lightColor: 'bg-amber-50', textColor: 'text-amber-600' },
  ];

  const recentActivities = [
    { text: 'New patient John Doe registered', time: '2 min ago', type: 'patient' },
    { text: 'Dr. Smith completed consultation', time: '15 min ago', type: 'doctor' },
    { text: 'Invoice #INV-001 paid', time: '1 hour ago', type: 'billing' },
    { text: 'Appointment booked for Mary Johnson', time: '2 hours ago', type: 'appointment' },
  ];

  // Quick Action Buttons based on role
  const getQuickActionButtons = () => {
    const commonActions = [
      { 
        label: 'Register Patient', 
        icon: UserPlus, 
        onClick: () => navigate('/patients'),
        color: 'bg-blue-500 hover:bg-blue-600',
        description: 'Add new patient'
      },
      { 
        label: 'Book Appointment', 
        icon: CalendarPlus, 
        onClick: () => navigate('/appointments'),
        color: 'bg-emerald-500 hover:bg-emerald-600',
        description: 'Schedule visit'
      },
      { 
        label: 'Generate Voice', 
        icon: Mic, 
        onClick: () => alert('Voice generation feature - Coming soon!'),
        color: 'bg-violet-500 hover:bg-violet-600',
        description: 'Voice notes'
      },
    ];

    switch (user?.role) {
      case Role.ADMIN:
        return [
          ...commonActions,
          { 
            label: 'Generate Invoice', 
            icon: Receipt, 
            onClick: () => navigate('/billing'),
            color: 'bg-amber-500 hover:bg-amber-600',
            description: 'Create bill'
          },
          { 
            label: 'View Reports', 
            icon: TrendingUp, 
            onClick: () => navigate('/dashboard'),
            color: 'bg-rose-500 hover:bg-rose-600',
            description: 'Analytics'
          },
          { 
            label: 'Manage Staff', 
            icon: Users, 
            onClick: () => navigate('/staff'),
            color: 'bg-slate-700 hover:bg-slate-800',
            description: 'Team management'
          },
        ];
      case Role.DOCTOR:
        return [
          { 
            label: "Today's Appointments", 
            icon: Calendar, 
            onClick: () => navigate('/appointments'),
            color: 'bg-emerald-500 hover:bg-emerald-600',
            description: 'View schedule'
          },
          { 
            label: 'Add Medical Record', 
            icon: ClipboardList, 
            onClick: () => navigate('/medical-records'),
            color: 'bg-blue-500 hover:bg-blue-600',
            description: 'Patient records'
          },
          { 
            label: 'Generate Voice', 
            icon: Mic, 
            onClick: () => alert('Voice generation feature - Coming soon!'),
            color: 'bg-violet-500 hover:bg-violet-600',
            description: 'Voice notes'
          },
          { 
            label: 'View Patients', 
            icon: Users, 
            onClick: () => navigate('/patients'),
            color: 'bg-amber-500 hover:bg-amber-600',
            description: 'Patient list'
          },
          { 
            label: 'My Schedule', 
            icon: Clock, 
            onClick: () => navigate('/appointments'),
            color: 'bg-slate-700 hover:bg-slate-800',
            description: 'Weekly view'
          },
        ];
      case Role.STAFF:
        return [
          ...commonActions,
          { 
            label: 'Generate Invoice', 
            icon: Receipt, 
            onClick: () => navigate('/billing'),
            color: 'bg-amber-500 hover:bg-amber-600',
            description: 'Create bill'
          },
          { 
            label: 'Check-in Patient', 
            icon: ClipboardList, 
            onClick: () => navigate('/appointments'),
            color: 'bg-slate-700 hover:bg-slate-800',
            description: 'Mark arrival'
          },
        ];
      default:
        return commonActions;
    }
  };

  const getRoleGreeting = () => {
    switch (user?.role) {
      case Role.ADMIN:
        return 'System Administrator';
      case Role.DOCTOR:
        return 'Medical Professional';
      case Role.STAFF:
        return 'Front Desk Staff';
      default:
        return 'User';
    }
  };

  const getRoleBadgeColor = () => {
    switch (user?.role) {
      case Role.ADMIN:
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case Role.DOCTOR:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case Role.STAFF:
        return 'bg-violet-50 text-violet-700 border-violet-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const quickActionButtons = getQuickActionButtons();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-slate-900">
                Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}, {user?.full_name?.split(' ')[0]}!
              </h1>
              <p className="text-slate-500 mt-0.5">{getRoleGreeting()} Dashboard</p>
            </div>
          </div>
          <span className={`hidden sm:inline-flex text-xs font-medium px-3 py-1.5 rounded-full border ${getRoleBadgeColor()}`}>
            {user?.role}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.name} 
              className="bg-white rounded-xl p-5 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xs font-medium ${stat.textColor} ${stat.lightColor} px-2 py-1 rounded-full`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-sm text-slate-500 mb-1">{stat.name}</p>
              <p className="text-2xl font-semibold text-slate-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions - Prominent Buttons */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 mb-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
            <p className="text-sm text-slate-500 mt-0.5">Common tasks for your role</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActionButtons.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.onClick}
                className={`group relative flex flex-col items-center gap-2.5 p-4 rounded-xl ${action.color} text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg`}
              >
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium leading-tight">{action.label}</p>
                  <p className="text-[10px] text-white/70 mt-0.5">{action.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
            <button className="text-sm text-slate-500 hover:text-slate-900 font-medium flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                  ${activity.type === 'patient' ? 'bg-blue-100' : ''}
                  ${activity.type === 'doctor' ? 'bg-emerald-100' : ''}
                  ${activity.type === 'billing' ? 'bg-amber-100' : ''}
                  ${activity.type === 'appointment' ? 'bg-violet-100' : ''}
                `}>
                  {activity.type === 'patient' && <UserPlus className="w-4 h-4 text-blue-600" />}
                  {activity.type === 'doctor' && <Stethoscope className="w-4 h-4 text-emerald-600" />}
                  {activity.type === 'billing' && <Receipt className="w-4 h-4 text-amber-600" />}
                  {activity.type === 'appointment' && <Calendar className="w-4 h-4 text-violet-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{activity.text}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Overview */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-5">Today's Overview</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Pending Appointments</span>
                <span className="text-lg font-semibold text-blue-600">8</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '33%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Completed Today</span>
                <span className="text-lg font-semibold text-emerald-600">16</span>
              </div>
              <div className="w-full bg-emerald-200 rounded-full h-1.5">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Unpaid Invoices</span>
                <span className="text-lg font-semibold text-amber-600">3</span>
              </div>
              <div className="w-full bg-amber-200 rounded-full h-1.5">
                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>

            <button 
              onClick={() => navigate('/patients')}
              className="w-full mt-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
