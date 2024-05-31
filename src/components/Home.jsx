import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-white text-4xl font-bold mb-8">Welcome to the AI Powered Elicitation Toolset</h1>
      <div className="gap-4 flex flex-col items-center">
        <Link to="/generate-record">
          <button className="px-6 py-3 bg-green-700 text-white rounded hover:bg-green-600 transition duration-300">
            Generate Record of Meeting
          </button>
        </Link>
        <Link to="/generate-srs">
          <button className="px-6 py-3 bg-green-700 text-white rounded hover:bg-green-600 transition duration-300">
            Generate SRS
          </button>
        </Link>
        <Link to="/get-elicitation-technique">
          <button className="px-6 py-3 bg-green-700 text-white rounded hover:bg-green-600 transition duration-300">
            Find Best Elicitation Technique
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
