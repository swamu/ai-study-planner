import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const { signIn, signUp, hasSupabase, continueAsGuest, exitGuestMode, user, isGuest } = useAuth();
  const navigate = useNavigate();

  // Only redirect if authenticated (not guest mode - guests can sign in)
  useEffect(() => {
    if (user && !isGuest) {
      navigate('/');
    }
  }, [user, isGuest, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (!hasSupabase) {
      // Local mode - just save email and continue
      await signIn(email, 'local-password');
      navigate('/');
      return;
    }

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password);
        if (error) {
          setMessage(error.message || 'Error signing up');
        } else {
          setMessage('Success! Check your email to confirm your account, then sign in.');
          setIsSignUp(false);
        }
      } else {
        // Exit guest mode if they were in it
        if (isGuest) {
          exitGuestMode();
        }
        
        const { error } = await signIn(email, password);
        if (error) {
          setMessage(error.message || 'Error signing in');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = () => {
    continueAsGuest();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">📚</div>
          <h1 className="text-2xl font-semibold text-text-primary mb-2">
            AI Study Planner
          </h1>
          <p className="text-text-secondary">
            {isSignUp ? 'Create your account' : 'Sign in to continue'}
          </p>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* Show guest mode option only if not already a guest */}
            {!isGuest && (
              <>
                <div className="mb-6">
                  <button
                    onClick={handleGuestMode}
                    className="w-full px-4 py-3 border-2 border-border rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-2xl">🚀</span>
                      <div className="text-left">
                        <div className="text-sm font-medium text-text-primary">
                          Continue as Guest
                        </div>
                        <div className="text-xs text-text-tertiary">
                          Local storage only, no sync
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-2 text-text-tertiary">
                      Or sign in for cloud sync
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Show message if guest is signing up */}
            {isGuest && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700">
                  ✨ Sign in to enable cloud sync and access your tasks from any device!
                </p>
              </div>
            )}

            {!hasSupabase && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700">
                  💡 Supabase not configured. Local mode only.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input w-full"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* Password (only if Supabase configured) */}
              {hasSupabase && (
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input w-full"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  {isSignUp && (
                    <p className="text-xs text-text-tertiary mt-1">
                      Must be at least 6 characters
                    </p>
                  )}
                </div>
              )}

              {/* Error/Success Message */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg text-sm ${
                    message.includes('Success') || message.includes('Check your email')
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}
                >
                  {message}
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>

            {/* Toggle Sign Up / Sign In */}
            {hasSupabase && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setMessage('');
                  }}
                  className="text-sm text-accent-blue hover:underline"
                >
                  {isSignUp 
                    ? 'Already have an account? Sign in' 
                    : "Don't have an account? Sign up"}
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-text-tertiary">
            Your data is private and secure. {hasSupabase ? 'Protected by Supabase Auth.' : 'Stored locally.'}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

