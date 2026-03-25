
import React, { useState } from 'react';
import { AuthService } from '../services/authService';
import { SecurityValidator } from '../utils/security';
import type { TestResult, SecurityTest } from '../types';
import { Bug, Shield, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export const TestingPanel: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [runningTests, setRunningTests] = useState(false);
  const [/*selectedTest*/, setSelectedTest] = useState<string | null>(null);

  // Unit tests
  const runUnitTests = async () => {
    setRunningTests(true);
    const results: TestResult[] = [];
    
    const unitTests = [
      { name: 'Valid Login', input: 'admin/Admin123', expected: 'success' },
      { name: 'Invalid Password', input: 'admin/WrongPass', expected: 'failure' },
      { name: 'Invalid Username', input: 'nonexistent/Admin123', expected: 'failure' },
      { name: 'Empty Credentials', input: 'empty/empty', expected: 'failure' },
    ];
    
    for (const test of unitTests) {
      const [username, password] = test.input.split('/');
      const result = await AuthService.login({ username, password });
      
      results.push({
        testName: test.name,
        input: test.input,
        expected: test.expected,
        actual: result.success ? 'success' : 'failure',
        passed: (result.success && test.expected === 'success') || 
                (!result.success && test.expected === 'failure'),
        timestamp: new Date()
      });
    }
    
    setTestResults(prev => [...prev, ...results]);
    setRunningTests(false);
  };
  
  // Integration tests
  const runIntegrationTests = async () => {
    setRunningTests(true);
    const results: TestResult[] = [];
    
    const testFlows = [
      { 
        name: 'Full Login Flow - Valid User',
        steps: [
          { action: 'Enter username', value: 'admin' },
          { action: 'Enter password', value: 'Admin123' },
          { action: 'Submit', value: '' }
        ],
        expected: 'success'
      },
      {
        name: 'Full Login Flow - Invalid User',
        steps: [
          { action: 'Enter username', value: 'hacker' },
          { action: 'Enter password', value: 'hack123' },
          { action: 'Submit', value: '' }
        ],
        expected: 'failure'
      }
    ];
    
    for (const flow of testFlows) {
      const loginData = {
        username: flow.steps[0].value,
        password: flow.steps[1].value
      };
      const result = await AuthService.login(loginData);
      
      results.push({
        testName: flow.name,
        input: `${loginData.username}/${loginData.password}`,
        expected: flow.expected,
        actual: result.success ? 'success' : 'failure',
        passed: (result.success && flow.expected === 'success') || 
                (!result.success && flow.expected === 'failure'),
        timestamp: new Date()
      });
    }
    
    setTestResults(prev => [...prev, ...results]);
    setRunningTests(false);
  };
  
  // Security tests
  const runSecurityTests = async () => {
    setRunningTests(true);
    const results: TestResult[] = [];
    
    const securityTests: SecurityTest[] = [
      {
        name: 'SQL Injection - OR 1=1',
        input: "admin' OR '1'='1",
        description: 'Attempt to bypass authentication',
        expectedBehavior: 'Should be blocked'
      },
      {
        name: 'SQL Injection - Comment Attack',
        input: "admin' --",
        description: 'Attempt to comment out password check',
        expectedBehavior: 'Should be blocked'
      },
      {
        name: 'SQL Injection - Union Select',
        input: "admin' UNION SELECT * FROM users --",
        description: 'Attempt to extract data',
        expectedBehavior: 'Should be blocked'
      },
      {
        name: 'XSS - Script Tag',
        input: "<script>alert('xss')</script>",
        description: 'Attempt to inject JavaScript',
        expectedBehavior: 'Should be sanitized'
      },
      {
        name: 'XSS - Image OnError',
        input: "<img src=x onerror=alert('xss')>",
        description: 'Attempt to trigger JavaScript via image',
        expectedBehavior: 'Should be sanitized'
      },
      {
        name: 'SQL Injection - Multiple Statements',
        input: "admin'; DROP TABLE users; --",
        description: 'Attempt to drop database table',
        expectedBehavior: 'Should be blocked'
      }
    ];
    
    for (const test of securityTests) {
      const hasSQLInjection = SecurityValidator.hasSQLInjection(test.input);
      const hasXSS = SecurityValidator.hasXSS(test.input);
      const sanitized = SecurityValidator.sanitizeInput(test.input);
      
      const loginResult = await AuthService.login({ 
        username: test.input, 
        password: 'anypass' 
      });
      
      const isBlocked = !loginResult.success;
      const passed = isBlocked && (hasSQLInjection || hasXSS);
      
      results.push({
        testName: test.name,
        input: test.input,
        expected: 'Blocked',
        actual: isBlocked ? 'Blocked' : 'Allowed',
        passed: passed,
        timestamp: new Date()
      });
    }
    
    setTestResults(prev => [...prev, ...results]);
    setRunningTests(false);
  };
  
  const clearTests = () => {
    setTestResults([]);
  };
  
  const getTestStats = () => {
    const total = testResults.length;
    const passed = testResults.filter(r => r.passed).length;
    const failed = total - passed;
    return { total, passed, failed };
  };
  
  const stats = getTestStats();
  
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bug className="w-8 h-8 text-purple-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Testing & Debugging Panel</h2>
            <p className="text-sm text-gray-600">Unit, Integration, and Security Testing</p>
          </div>
        </div>
        
        {stats.total > 0 && (
          <div className="flex gap-4 text-sm">
            <div className="text-center">
              <div className="font-bold text-gray-800">{stats.total}</div>
              <div className="text-gray-500">Total</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-green-600">{stats.passed}</div>
              <div className="text-gray-500">Passed</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-red-600">{stats.failed}</div>
              <div className="text-gray-500">Failed</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Test Buttons */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button
          onClick={runUnitTests}
          disabled={runningTests}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          Run Unit Tests
        </button>
        <button
          onClick={runIntegrationTests}
          disabled={runningTests}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          Run Integration Tests
        </button>
        <button
          onClick={runSecurityTests}
          disabled={runningTests}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
        >
          Run Security Tests
        </button>
        <button
          onClick={clearTests}
          disabled={runningTests}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50"
        >
          Clear Results
        </button>
      </div>
      
      {runningTests && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Running tests...</p>
        </div>
      )}
      
      {/* Test Results */}
      {testResults.length > 0 && !runningTests && (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          <h3 className="font-semibold text-gray-800 mb-3">Test Results</h3>
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                result.passed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}
              onMouseEnter={() => setSelectedTest(result.testName)}
              onMouseLeave={() => setSelectedTest(null)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {result.passed ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <span className="font-medium text-gray-800">{result.testName}</span>
                    <span className="text-xs text-gray-500">
                      {result.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-sm space-y-1">
                    <p><span className="text-gray-600">Input:</span> <code className="bg-gray-100 px-1 rounded">{result.input}</code></p>
                    <p><span className="text-gray-600">Expected:</span> {result.expected}</p>
                    <p><span className="text-gray-600">Actual:</span> {result.actual}</p>
                  </div>
                </div>
                {!result.passed && (
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Security Tips */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Security Testing Best Practices</h4>
            <ul className="text-sm text-yellow-700 mt-2 space-y-1">
              <li>• Always test with malicious inputs (SQL injection, XSS)</li>
              <li>• Verify error messages don't expose system details</li>
              <li>• Test both valid and invalid input scenarios</li>
              <li>• Check integration points between components</li>
              <li>• Use fuzzing techniques to find edge cases</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};