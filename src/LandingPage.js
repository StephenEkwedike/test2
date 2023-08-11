import React from 'react';
import { Link } from 'react-router-dom';
import SuiValidatorDashboard from './components/SuiValidatorDashboard'; // Import your dashboard component

const LandingPage = () => {
  return (
    <div className="bg-blue-500 min-h-screen flex items-center justify-center">
      <div className="max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Sui Validator Reports Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Get insights into your Sui validator performance and hardware costs.
        </p>
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Dashboard
        </Link>

        {/* Render the dashboard component within the landing page */}
        <SuiValidatorDashboard />
      </div>
    </div>
  );
};

export default LandingPage;
