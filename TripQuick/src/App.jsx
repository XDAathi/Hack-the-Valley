import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

function App() {
  const preferencesSectionRef = useRef(null);
  const [showTravelForm, setShowTravelForm] = useState(false);
  const [days, setDays] = useState(1); // Default number of days set to 1
  const [city, setCity] = useState(''); // State for storing city input
  const [suggestions, setSuggestions] = useState([]); // State for city suggestions

  // List of cities for auto-suggestions
  const cities = ['Paris', 'New York', 'Tokyo', 'London', 'Berlin', 'Los Angeles', 'San Francisco'];

  // Function to handle city input and generate suggestions
  const handleCityChange = (e) => {
    const userInput = e.target.value;
    setCity(userInput);

    // Filter the cities list based on user input
    if (userInput) {
      const filteredCities = cities.filter((city) =>
        city.toLowerCase().includes(userInput.toLowerCase())
      );
      setSuggestions(filteredCities);
    } else {
      setSuggestions([]);
    }
  };

  // Function to handle when a suggestion is clicked
  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion); // Set the input field to the selected suggestion
    setSuggestions([]); // Clear suggestions after selection
  };

  const scrollToPreferences = () => {
    preferencesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    setShowTravelForm(true); // Show the travel form when "Get Started" is clicked
  };

  // Handler for updating the number of days, ensuring it can't be negative
  const handleDaysChange = (e) => {
    const value = Math.max(1, e.target.value); // Prevent values less than 1
    setDays(value);
  };

  return (
    <div className="App bg-white font-poppins">
      {/* Header with Logo and Title */}
      <header className="flex items-center p-4">
        <img src="logo.png" alt="Logo" className="w-12 h-12 mr-3" /> {/* Replace logo.png with your actual logo file */}
        <h1 className="text-3xl font-bold" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          TripQuick
        </h1>
      </header>

      {/* Main Hero Section */}
      <motion.div
        className="h-screen flex flex-col items-center justify-center bg-white"
        initial={{ opacity: 0, y: -50 }} // Initial animation state
        animate={{ opacity: 1, y: 0 }} // Final animation state
        transition={{ duration: 0.8 }} // Animation duration
      >
        <button
          onClick={scrollToPreferences}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-lg"
        >
          Get Started
        </button>
      </motion.div>

      {/* Preferences Section */}
      <motion.div
        ref={preferencesSectionRef}
        className="h-screen flex flex-col items-center justify-center bg-white"
        initial={{ opacity: 0 }} // Initial animation state
        animate={{ opacity: showTravelForm ? 1 : 0 }} // Animate based on showTravelForm state
        transition={{ duration: 0.5 }} // Animation duration
      >
        {/* Travel Preferences Form */}
        {showTravelForm && (
          <motion.div
            className="w-full max-w-md mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold mb-4 text-center">Tell us your travel preferences 🏕️ 🌴</h2>
            <p className="mb-8 text-gray-600 text-center max-w-lg mx-auto">
              Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
            </p>

            <div className="space-y-6">
              <div className="relative">
                <label className="block mb-2 text-lg font-medium">What is your city of choice?</label>
                <input
                  type="text"
                  value={city}
                  onChange={handleCityChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter a city"
                />
                {/* Suggestions Dropdown */}
                {suggestions.length > 0 && (
                  <ul className="absolute z-10 bg-white w-full border border-gray-300 mt-1 rounded-lg max-h-40 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <label className="block mb-2 text-lg font-medium">How many days are you planning your trip?</label>
                <input
                  type="number"
                  value={days} // Set the input's value to the state
                  onChange={handleDaysChange} // Ensure that negative values can't be entered
                  placeholder="Ex. 3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  min="1" // Prevents the user from typing values less than 1
                />
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default App;
