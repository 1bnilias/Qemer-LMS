'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Shield, Settings, Users, BarChart3, ArrowRight, Mail, Lock, AlertTriangle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

function AdminLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);

      if (success) {
        // Small delay to show success state, then redirect
        setTimeout(() => {
          const redirect = searchParams.get('redirect') || '/admin';
          router.push(redirect);
        }, 500);
      } else {
        setError('Invalid email or password. Try: admin@qemer.com / admin123');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-12 lg:py-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-10"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur-3xl opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full blur-3xl opacity-10"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-lg">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 mb-6">
              <Shield className="w-6 h-6 text-white" />
              <span className="text-sm font-semibold text-white">Admin Control Panel</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              Administrative
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Access Portal</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Secure access to Qemer's administrative dashboard. Manage users, monitor analytics, and oversee platform operations.
            </p>
          </div>

          {/* Admin Features */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 text-white bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold">User Management</h3>
                <p className="text-sm text-slate-300">Manage user accounts and permissions</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold">Analytics Dashboard</h3>
                <p className="text-sm text-slate-300">Monitor platform performance and metrics</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <Settings className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold">System Configuration</h3>
                <p className="text-sm text-slate-300">Configure platform settings and policies</p>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-red-500/10 backdrop-blur-sm rounded-xl p-4 border border-red-500/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-400">Security Notice</h3>
                <p className="text-sm text-red-300 mt-1">
                  This portal is restricted to authorized administrators only. All access attempts are logged and monitored.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 mb-4">
              <Shield className="w-6 h-6 text-white" />
              <span className="text-sm font-semibold text-white">Admin Portal</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Admin Access
            </h1>
            <p className="text-slate-300">
              Secure administrative login
            </p>
          </div>

          {/* Login Card */}
          <Card className="backdrop-blur-xl bg-white/10 dark:bg-slate-900/90 border border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-white">
                Administrator Login
              </CardTitle>
              <CardDescription className="text-slate-300">
                Enter your credentials to access the admin dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Demo Credentials */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3">
                <p className="text-sm text-white font-medium mb-1">Demo Credentials:</p>
                <p className="text-xs text-slate-300">
                  Admin: <code className="bg-white/10 px-1 py-0.5 rounded text-xs">admin@qemer.com</code> / <code className="bg-white/10 px-1 py-0.5 rounded text-xs">admin123</code>
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-white">
                    Administrator Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@qemer.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-white/20 bg-white/5 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-white">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 border-white/20 bg-white/5 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20 transition-all duration-200"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Security Options */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-purple-600 bg-slate-100 border-slate-300 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    Remember this device
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Authenticating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Access Admin Panel
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>

              <Separator className="my-6 bg-white/20" />

              {/* Security Info */}
              <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-400 text-sm">Enhanced Security</h3>
                    <p className="text-xs text-blue-300 mt-1">
                      Secure authentication with encrypted sessions for admin access.
                    </p>
                  </div>
                </div>
              </div>

              {/* Back to LMS Link */}
              <div className="text-center pt-4">
                <p className="text-slate-300">
                  Not an administrator?{' '}
                  <Link
                    href="/auth/lms"
                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                  >
                    Student Login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading admin login...</p>
        </div>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}
