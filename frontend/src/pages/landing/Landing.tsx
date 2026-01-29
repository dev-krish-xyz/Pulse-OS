import { Link } from 'react-router-dom';
import { 
  Activity, 
  ArrowRight, 
  Users, 
  Calendar, 
  FileText, 
  Shield, 
  Zap,
  Check,
  ChevronRight,
  Heart,
  Clock,
  BarChart3
} from 'lucide-react';

export default function Landing() {
  const features = [
    {
      icon: Users,
      title: 'Patient Management',
      description: 'Comprehensive patient records with complete medical history and demographics.',
      color: 'bg-blue-500'
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Intelligent appointment booking with automated reminders and conflict detection.',
      color: 'bg-emerald-500'
    },
    {
      icon: FileText,
      title: 'Medical Records',
      description: 'Secure electronic health records with easy access for authorized personnel.',
      color: 'bg-violet-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Real-time insights into hospital operations and patient care metrics.',
      color: 'bg-amber-500'
    },
    {
      icon: Shield,
      title: 'HIPAA Compliant',
      description: 'Enterprise-grade security ensuring patient data privacy and compliance.',
      color: 'bg-rose-500'
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Lightning-fast performance with 99.9% uptime guarantee.',
      color: 'bg-cyan-500'
    }
  ];

  const stats = [
    { value: '500+', label: 'Healthcare Facilities' },
    { value: '2M+', label: 'Patients Managed' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-900">Pulse OS</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Features</a>
              <a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
              <a href="#about" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">About</a>
            </div>

            <div className="flex items-center gap-3">
              <Link 
                to="/login"
                className="text-sm font-medium text-slate-700 hover:text-slate-900 px-4 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/login"
                className="text-sm font-medium bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm text-slate-600">Now with AI-powered insights</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 leading-tight tracking-tight">
              Modern Healthcare
              <span className="block text-slate-400">Management Platform</span>
            </h1>
            
            <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Streamline your hospital operations with our all-in-one platform. 
              Manage patients, appointments, and medical records effortlessly.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a 
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-medium px-8 py-3.5 rounded-xl border border-slate-200 transition-colors"
              >
                Learn More
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />
            <div className="bg-slate-900 rounded-2xl p-4 shadow-2xl shadow-slate-900/20">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="bg-slate-50 rounded-xl p-6 min-h-[300px] grid grid-cols-4 gap-4">
                {[
                  { label: 'Total Patients', value: '1,234', color: 'bg-blue-500' },
                  { label: 'Appointments', value: '24', color: 'bg-emerald-500' },
                  { label: 'Records', value: '856', color: 'bg-violet-500' },
                  { label: 'Revenue', value: '$45K', color: 'bg-amber-500' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                    <div className={`w-10 h-10 ${stat.color} rounded-lg mb-3 flex items-center justify-center`}>
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                    <p className="text-2xl font-semibold text-slate-900 mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl sm:text-4xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900">
              Everything you need
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Comprehensive tools designed for modern healthcare facilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-6">
            Ready to transform your healthcare operations?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Join hundreds of healthcare providers who trust Pulse OS to manage their facilities efficiently.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-medium px-8 py-3.5 rounded-xl transition-colors"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a 
              href="#"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white hover:text-slate-300 font-medium px-8 py-3.5 transition-colors"
            >
              Schedule a Demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-900">Pulse OS</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Privacy</a>
              <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Terms</a>
              <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Contact</a>
            </div>
            <p className="text-sm text-slate-500">
              &copy; 2026 Pulse OS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
