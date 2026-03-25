import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { Lock, User, AlertCircle, Shield, CheckCircle } from 'lucide-react';

interface LoginFormProps {
  onTestResult?: (result: any) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onTestResult }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const { loading, response, error, handleLogin, reset } = useLogin();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleLogin({ username, password });
    
    if (onTestResult) {
      onTestResult({
        input: { username, password },
        result,
        timestamp: new Date()
      });
    }
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Secure Login System</h2>
            <Shield className="w-8 h-8" />
          </div>
          <p className="text-blue-100 mt-2">Protected against SQL injection & XSS attacks</p>
        </div>

        {/* Security Info Toggle */}
        <button
          onClick={() => setShowSecurityInfo(!showSecurityInfo)}
          className="w-full px-6 py-3 bg-gray-50 hover:bg-gray-100 transition flex items-center justify-between text-sm text-gray-600"
        >
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security Features
          </span>
          <span>{showSecurityInfo ? '▼' : '►'}</span>
        </button>

        {showSecurityInfo && (
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Input sanitization</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>SQL injection detection</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>XSS attack prevention</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Generic error messages</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Secure logging</span>
              </div>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={onSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field pl-10"
                placeholder="Enter username (3-20 chars)"
                disabled={loading}
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Allowed: letters, numbers, underscore. 3-20 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
                placeholder="Enter password"
                disabled={loading}
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              At least 8 chars, one uppercase, one lowercase, one number
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {response?.success && (
            <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-green-700 font-medium">{response.message}</p>
                {response.user && (
                  <p className="text-xs text-green-600 mt-1">
                    Welcome back, {response.user.username}!
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'Processing...' : 'Login'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Test Credentials */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-600 font-medium mb-2">Test Credentials:</p>
          <div className="space-y-1 text-xs text-gray-500">
            <p>✓ Valid: admin / Admin123</p>
            <p>✓ Valid: user1 / User1234</p>
            <p>✗ SQL Injection: admin' OR '1'='1</p>
            <p>✗ XSS Attempt: &lt;script&gt;alert('xss')&lt;/script&gt;</p>
          </div>
        </div>
      </div>
    </div>
  );
};