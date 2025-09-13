'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Mail, CheckCircle, Clock, ArrowRight } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate password reset request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-12 lg:py-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-lg">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700 mb-6">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Password Recovery</span>
            </div>
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              Reset Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> Password</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              No worries! We'll send you a secure link to reset your password and get you back into your account quickly.
            </p>
          </div>

          {/* Security Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Secure password reset process</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Email delivered within 2 minutes</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Link expires in 24 hours for security</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Reset Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 mb-4">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Reset Password</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Forgot Password?
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              We'll help you reset it
            </p>
          </div>

          {/* Reset Card */}
          <Card className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-0 shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
                {isSubmitted ? 'Check Your Email' : 'Reset Your Password'}
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-300">
                {isSubmitted
                  ? 'We\'ve sent a password reset link to your email address'
                  : 'Enter your email address and we\'ll send you a reset link'
                }
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-200"
                        required
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      We'll send the reset link to this email address
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending Reset Link...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Send Reset Link
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </form>
              ) : (
                /* Success State */
                <div className="text-center space-y-6">
                  <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Reset Link Sent!
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      We've sent a password reset link to <strong>{email}</strong>
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="text-left">
                        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">Next Steps</h4>
                        <ul className="text-xs text-blue-700 dark:text-blue-300 mt-1 space-y-1">
                          <li>• Check your email inbox (and spam folder)</li>
                          <li>• Click the reset link in the email</li>
                          <li>• Follow the instructions to create a new password</li>
                          <li>• Link expires in 24 hours</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setEmail('');
                    }}
                    variant="outline"
                    className="w-full h-12 border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200"
                  >
                    Send Another Link
                  </Button>
                </div>
              )}

              <Separator className="my-6" />

              {/* Back to Login Link */}
              <div className="text-center">
                <Link
                  href="/auth/lms"
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-slate-100 font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Login
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Having trouble? Contact our{' '}
              <Link href="/support" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
                support team
              </Link>{' '}
              for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
