import { useState, useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { TestingPanel } from "./components/TestingPanel";
import { TutorialModal } from "./components/TutorialModal";

function App() {
  const [testLogs, setTestLogs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"login" | "testing">("login");
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial");
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  const handleTestResult = (result: any) => {
    setTestLogs((prev) => [...prev, result]);
  };

  const handleCloseTutorial = () => {
    setShowTutorial(false);
    localStorage.setItem("hasSeenTutorial", "true");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {showTutorial && <TutorialModal onClose={handleCloseTutorial} />}
      <div className="container mx-auto p-4">
        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab("login")}
            className={`px-6 py-2 rounded-t-lg font-medium transition ${
              activeTab === "login"
                ? "bg-white text-blue-600 border-t border-l border-r border-gray-200"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            Login System
          </button>
          <button
            onClick={() => setActiveTab("testing")}
            className={`px-6 py-2 rounded-t-lg font-medium transition ${
              activeTab === "testing"
                ? "bg-white text-blue-600 border-t border-l border-r border-gray-200"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            Testing & Debugging
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-lg">
          {activeTab === "login" ? (
            <LoginForm onTestResult={handleTestResult} />
          ) : (
            <div className="p-6">
              <TestingPanel />

              {/* Manual Test Logs */}
              {testLogs.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Manual Test Log
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {testLogs.map((log, index) => (
                      <div
                        key={index}
                        className="text-sm p-2 bg-white rounded border border-gray-200"
                      >
                        <span className="text-gray-500">
                          {new Date(log.timestamp).toLocaleTimeString()}:
                        </span>
                        <span className="ml-2">
                          Input: {JSON.stringify(log.input)} - Result:{" "}
                          {log.result.success ? "Success" : "Failed"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
