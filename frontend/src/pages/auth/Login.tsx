import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { useAuthStore } from '../../store/auth.store';
import toast from 'react-hot-toast';
import { 
  Activity, 
  Mail, 
  Lock, 
  ArrowRight, 
  Shield, 
  Heart,
  Users,
  Stethoscope
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await authService.login({ email, password });
      setUser(data.user);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (userEmail: string, userPassword: string, role: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    setSelectedRole(role);
  };

  const roles = [
    { 
      id: 'admin',
      label: 'Administrator', 
      email: 'admin@pulseos.com', 
      password: 'admin123',
      icon: Shield,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      hoverBg: 'hover:bg-blue-100',
      description: 'Full system access'
    },
    { 
      id: 'doctor',
      label: 'Doctor', 
      email: 'dr.smith@pulseos.com', 
      password: 'doctor123',
      icon: Stethoscope,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      hoverBg: 'hover:bg-emerald-100',
      description: 'Patient care & records'
    },
    { 
      id: 'staff',
      label: 'Staff', 
      email: 'staff@pulseos.com', 
      password: 'staff123',
      icon: Users,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-200',
      hoverBg: 'hover:bg-violet-100',
      description: 'Registration & billing'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 flex-col justify-between relative">
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-white/20 transition-colors">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-semibold text-white">Pulse OS</span>
              <p className="text-slate-400 text-xs">Healthcare Platform</p>
            </div>
          </Link>
        </div>

        {/* Content */}
        <div className="relative z-10 space-y-8">
          <div>
            <h1 className="text-4xl font-light text-white leading-tight tracking-tight">
              Healthcare
              <span className="block font-semibold">Management System</span>
            </h1>
            <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-md">
              Streamline patient care, appointments, and medical records with our comprehensive platform.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            {[
              { icon: Heart, text: 'Patient-centric care management' },
              { icon: Shield, text: 'HIPAA compliant & secure' },
              { icon: Activity, text: 'Real-time health analytics' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <feature.icon className="w-4 h-4" />
                </div>
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10">
          <p className="text-slate-500 text-sm">
            Trusted by healthcare providers worldwide
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-slate-900">Pulse OS</span>
            </Link>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-slate-900">Welcome back</h2>
              <p className="text-slate-500 mt-2 text-sm">Sign in to continue to your dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
                  <input
                    type="email"
                    id="email"
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent focus:bg-white transition-all"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-[18px] h-[18px] text-slate-400" />
                  <input
                    type="password"
                    id="password"
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent focus:bg-white transition-all"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Role Selection */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white text-xs text-slate-500 uppercase tracking-wider">
                    Demo Access
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => quickLogin(role.email, role.password, role.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 ${
                        isSelected 
                          ? `${role.bgColor} ${role.borderColor} ring-1 ring-offset-1 ${role.borderColor.replace('border-', 'ring-')}`
                          : `border-slate-200 hover:border-slate-300 ${role.hoverBg}`
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg ${role.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-[18px] h-[18px] ${role.color}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-slate-900">{role.label}</p>
                        <p className="text-xs text-slate-500">{role.description}</p>
                      </div>
                      {isSelected && (
                        <div className={`w-5 h-5 rounded-full ${role.bgColor} flex items-center justify-center`}>
                          <svg className={`w-3 h-3 ${role.color}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-slate-500 mt-6">
            Protected by enterprise-grade encryption
          </p>
        </div>
      </div>
    </div>
  );
}
