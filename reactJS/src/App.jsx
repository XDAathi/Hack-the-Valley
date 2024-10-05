import React, { useRef } from 'react';

function App() {
  const preferencesSectionRef = useRef(null);

  const scrollToPreferences = () => {
    preferencesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="App">
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        {/* Centered Title and Button */}
        <h1 className="text-5xl font-bold mb-6">TripQuick</h1>
        <button
          onClick={scrollToPreferences}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition duration-300"
        >
          Get Started
        </button>
      </div>

      {/* Preferences Section */}
      <div
        ref={preferencesSectionRef}
        className="h-screen flex flex-col items-center justify-center bg-white"
      >
        <h2 className="text-3xl font-semibold mb-4">Rate your preferences</h2>
        {/* Your Preferences Code Here */}
      </div>
    </div>
  );
}

export default App;
