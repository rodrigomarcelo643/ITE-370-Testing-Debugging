import React from "react";

interface TutorialModalProps {
  onClose: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Security Testing Dashboard
            </h2>
            <p className="text-gray-500 mt-1">
              Application Tour & Documentation
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="text-3xl">&times;</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Tab 1 Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                Tab 1
              </span>
              <h3 className="text-xl font-bold text-gray-800">Login System</h3>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
              <h4 className="font-bold text-blue-700 mb-2">
                🔐 Login Form Block
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                The simulated authentication interface.
              </p>
              <ul className="list-disc list-inside text-xs text-gray-500 space-y-1">
                <li>
                  <strong>Sanitization:</strong> Strips HTML tags automatically.
                </li>
                <li>
                  <strong>Validation:</strong> Enforces strong password
                  policies.
                </li>
                <li>
                  <strong>Protection:</strong> Detects SQLi/XSS patterns.
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
              <h4 className="font-bold text-blue-700 mb-2">
                📝 Credentials Block
              </h4>
              <p className="text-sm text-gray-600">
                Reference data for testing. Contains valid users and common
                attack vectors to copy-paste.
              </p>
            </div>
          </div>

          {/* Tab 2 Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                Tab 2
              </span>
              <h3 className="text-xl font-bold text-gray-800">
                Testing & Debugging
              </h3>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-purple-200 transition-colors">
              <h4 className="font-bold text-purple-700 mb-2">
                🤖 Automation Block
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                Suites of pre-written tests.
              </p>
              <ul className="list-disc list-inside text-xs text-gray-500 space-y-1">
                <li>
                  <strong>Unit:</strong> Logic verification.
                </li>
                <li>
                  <strong>Integration:</strong> User flow verification.
                </li>
                <li>
                  <strong>Security:</strong> Vulnerability scanning.
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-purple-200 transition-colors">
              <h4 className="font-bold text-purple-700 mb-2">
                📜 Manual Logs Block
              </h4>
              <p className="text-sm text-gray-600">
                A live audit trail. When you attempt to login in Tab 1, the
                detailed security result logs appear here.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
            <span>⚡</span> Quick Actions
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-yellow-900">
                Try a Valid Login:
              </p>
              <code className="bg-white px-2 py-1 rounded border">admin</code> /{" "}
              <code className="bg-white px-2 py-1 rounded border">
                Admin123
              </code>
            </div>
            <div>
              <p className="font-semibold text-yellow-900">
                Try an SQL Injection:
              </p>
              <code className="bg-white px-2 py-1 rounded border">
                admin' OR '1'='1
              </code>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="bg-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition-transform transform hover:scale-105 active:scale-95 shadow-lg"
          >
            I Understand - Let's Test
          </button>
        </div>
      </div>
    </div>
  );
};
