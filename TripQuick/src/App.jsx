import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three'; // Import THREE.js (needed for Vanta.js)
import GLOBE from 'vanta/dist/vanta.globe.min'; // Import the Globe effect from Vanta
import NET from 'vanta/dist/vanta.net.min'; // Import the NET effect from Vanta
import { FaStar } from 'react-icons/fa'; // Import Font Awesome star icons
import logo from './assets/Pictures/TripQuick.png'; // Import your logo
import './ScrollProgress.css'; // Import scroll progress bar CSS

// Star Rating Component
const StarRating = ({ size }) => {
  const [rating, setRating] = useState(0); // State to track current rating
  const [hover, setHover] = useState(null); // State to track hover effect

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)} // Update rating when clicked
              style={{ display: 'none' }} // Hide the default radio button
            />
            <FaStar
              size={size} // Size of the star passed from props
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'} // Star color based on rating
              onMouseEnter={() => setHover(ratingValue)} // Set hover state when mouse enters
              onMouseLeave={() => setHover(null)} // Clear hover state when mouse leaves
              style={{ cursor: 'pointer', transition: 'color 200ms' }} // Cursor pointer and smooth transition
            />
          </label>
        );
      })}
    </div>
  );
};

function App() {
  const vantaRef = useRef(null); // Reference for the Vanta Globe background
  const preferencesSectionRef = useRef(null); // Reference for the "Rating" section
  const resultsSectionRef = useRef(null); // Reference for the "Results" section
  const [vantaGlobeEffect, setVantaGlobeEffect] = useState(null); // Track Vanta Globe effect for the hero section
  const [vantaNetEffect, setVantaNetEffect] = useState(null); // Track Vanta.NET effect for the "Rating" section
  const [navbarColor, setNavbarColor] = useState('transparent'); // Track navbar background color
  const [showResults, setShowResults] = useState(false); // State to control showing results

  // Mock data for results
  const resultsData = [
    { id: 1, title: 'Destination 1', imageUrl: '/path/to/image1.jpg' },
    { id: 2, title: 'Destination 2', imageUrl: '/path/to/image2.jpg' },
    { id: 3, title: 'Destination 3', imageUrl: '/path/to/image3.jpg' },
    { id: 4, title: 'Destination 4', imageUrl: '/path/to/image4.jpg' },
    { id: 5, title: 'Destination 5', imageUrl: '/path/to/image5.jpg' },
    { id: 6, title: 'Destination 6', imageUrl: '/path/to/image6.jpg' },
    { id: 7, title: 'Destination 7', imageUrl: '/path/to/image7.jpg' },
    { id: 8, title: 'Destination 8', imageUrl: '/path/to/image8.jpg' },
    { id: 9, title: 'Destination 9', imageUrl: '/path/to/image9.jpg' },
    { id: 10, title: 'Destination 10', imageUrl: '/path/to/image10.jpg' },
  ];

  // Initialize the Vanta Globe effect for the hero section
  useEffect(() => {
    if (!vantaGlobeEffect) {
      setVantaGlobeEffect(
        GLOBE({
          el: vantaRef.current, // Attach the effect to the element referenced by vantaRef
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x3feaff, // Customize the primary color
          backgroundColor: 0x3ba5b3, // Background color of the effect
          THREE, // Required for Vanta.js
        })
      );
    }

    // Cleanup the effect when the component unmounts
    return () => {
      if (vantaGlobeEffect) vantaGlobeEffect.destroy();
    };
  }, [vantaGlobeEffect]);

  // Initialize the Vanta.NET effect for the "Rating" section
  useEffect(() => {
    if (!vantaNetEffect) {
      setVantaNetEffect(
        NET({
          el: preferencesSectionRef.current, // Attach the effect to the "Rating" section
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x3ff3ff, // Customize the net color
          backgroundColor: 0x3ba5b3, // Customize the background color
          spacing: 17.0, // Customize the spacing of the net
          THREE, // Required for Vanta.js
        })
      );
    }

    // Cleanup the effect when the component unmounts
    return () => {
      if (vantaNetEffect) vantaNetEffect.destroy();
    };
  }, [vantaNetEffect]);

  const [scrollProgress, setScrollProgress] = useState(0); // State for scroll progress

  // Function to handle scrolling and change navbar color based on scroll position
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / windowHeight) * 100;

    // Update navbar background color based on scroll position
    if (scrollTop > 100) {
      setNavbarColor('#3ba5b3'); // Change background to the specified color when scrolling
    } else {
      setNavbarColor('transparent'); // Keep background transparent when at the top
    }

    setScrollProgress(scrollPercent);
  };

  // Function to scroll back to the top when the logo is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to scroll to preferences section
  const scrollToPreferences = () => {
    preferencesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to show results and scroll to results section
  const handleShowResults = () => {
    setShowResults(true);
    setTimeout(() => {
      resultsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }, 100); // Slight delay for smoother UX
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      {/* Vanta Globe Effect for Hero Section */}
      <div ref={vantaRef} style={{ height: '100vh', position: 'relative', backgroundColor: '#3ba5b3' }}>
        {/* Scroll progress bar */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${scrollProgress}%` }}></div>
        </div>

        {/* Header with Logo and Title */}
        <header
          className="navbar flex items-center p-4 fixed top-0 w-full z-50"
          style={{
            backgroundColor: navbarColor, // Dynamically set background color
            color: 'white', // Change font color to white
            transition: 'background-color 0.3s ease', // Smooth transition for background color change
          }}
        >
          <img
            src={logo}
            alt="TripQuick Logo"
            className="w-40 h-40 mr-3 cursor-pointer"
            onClick={scrollToTop} // Scroll to top when logo is clicked
          />
          <h1
            className="font-bold text-white" // Ensure text color is white
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '3rem', // Slightly smaller font size
              fontWeight: '600',
              marginLeft: '0.5rem', // Adjust spacing between logo and title
            }}
          >
            TripQuick
          </h1>
        </header>

        {/* Main Hero Section */}
        <motion.div
          className="h-screen flex flex-col items-center justify-center bg-transparent"
          initial={{ opacity: 0, y: -50 }} // Initial animation state
          animate={{ opacity: 1, y: 0 }}   // Final animation state
          transition={{ duration: 0.8 }}    // Animation duration
          style={{ position: 'relative' }}
        >
          {/* Left Side - Introductory Text */}
          <div style={{ maxWidth: '600px', textAlign: 'center', color: 'white', marginBottom: '2rem' }}>
            <h2
              style={{
                fontSize: '2.5rem', // Original size for the heading
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '400',
                lineHeight: '1.5',
              }}
            >
              Don’t know where to plan your next trip or hangout?
            </h2>
            <p
              style={{
                fontSize: '1.5rem', // Original size for the description
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '300',
                marginTop: '1rem',
              }}
            >
              TripQuick helps you discover exciting destinations and create customized plans in just a few clicks. Let us guide you through a seamless experience to make your next adventure unforgettable.
            </p>
          </div>

          {/* Right Side - Get Started Button */}
          <button
            onClick={scrollToPreferences} // Scroll to preferences section
            className="text-white px-8 py-4 rounded-lg text-lg hover:bg-gray-200 transition duration-300 shadow-md hover:shadow-lg"
            style={{
              backgroundColor: '#ffffff',     // Set button background color to white
              color: '#3ba5b3',               // Set text color to match the background color
              fontFamily: 'Poppins, sans-serif', // Apply Poppins font
              fontSize: '2rem',                  // Slightly larger font size
              padding: '1rem 3rem',              // Increase padding for a bigger button
              marginTop: '1rem',
            }}
          >
            Get Started
          </button>
        </motion.div>
      </div>

      {/* Preferences Section - 4 Image Boxes with Star Ratings */}
<motion.div
  ref={preferencesSectionRef}
  style={{
    minHeight: '80vh',
    backgroundColor: 'transparent',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center', // Center the boxes horizontally
    alignItems: 'center', // Center the boxes vertically
    gap: '24px', // Add spacing between boxes
    color: 'white',
  }}
>

        {/* Image Box 1: Rate Food */}
        <motion.div
          whileHover={{ scale: 1.05 }} // Slightly scale on hover
          style={{
            width: '300px',
            height: '350px', // Increase height to accommodate the image
            textAlign: 'center',
            backgroundColor: '#3ba5b3', // Match background color for consistency
            position: 'relative',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            margin: '20px', // Added margin for spacing
          }}
        >
          {/* Image placeholder */}
          <div
            style={{
              width: '100%',
              height: '150px',
              backgroundColor: '#ffffff',
              marginBottom: '10px',
              borderRadius: '8px',
              backgroundImage: 'url(/path/to/image.jpg)', // Replace with the path to the image from the backend later
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>

          <h3 className="text-2xl mb-4">Rate Food</h3>
          <div className="star-rating">
            <StarRating size={30} /> {/* Star Rating with smaller stars */}
          </div>
        </motion.div>

        {/* Image Box 2: Rate Nature */}
        <motion.div
          whileHover={{ scale: 1.05 }} // Slightly scale on hover
          style={{
            width: '300px',
            height: '350px', // Increase height to accommodate the image
            textAlign: 'center',
            backgroundColor: '#3ba5b3', // Match background color for consistency
            position: 'relative',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            margin: '20px', // Added margin for spacing
          }}
        >
          {/* Image placeholder */}
          <div
            style={{
              width: '100%',
              height: '150px',
              backgroundColor: '#ffffff',
              marginBottom: '10px',
              borderRadius: '8px',
              backgroundImage: 'url(/path/to/image.jpg)', // Replace with the path to the image from the backend later
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>

          <h3 className="text-2xl mb-4">Rate Nature</h3>
          <div className="star-rating">
            <StarRating size={30} />
          </div>
        </motion.div>

        {/* Image Box 3: Rate Attractions */}
        <motion.div
          whileHover={{ scale: 1.05 }} // Slightly scale on hover
          style={{
            width: '300px',
            height: '350px', // Increase height to accommodate the image
            textAlign: 'center',
            backgroundColor: '#3ba5b3', // Match background color for consistency
            position: 'relative',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            margin: '20px', // Added margin for spacing
          }}
        >
          {/* Image placeholder */}
          <div
            style={{
              width: '100%',
              height: '150px',
              backgroundColor: '#ffffff',
              marginBottom: '10px',
              borderRadius: '8px',
              backgroundImage: 'url(/path/to/image.jpg)', // Replace with the path to the image from the backend later
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>

          <h3 className="text-2xl mb-4">Rate Attractions</h3>
          <div className="star-rating">
            <StarRating size={30} />
          </div>
        </motion.div>

        {/* Image Box 4: Rate Entertainment */}
        <motion.div
          whileHover={{ scale: 1.05 }} // Slightly scale on hover
          style={{
            width: '300px',
            height: '350px', // Increase height to accommodate the image
            textAlign: 'center',
            backgroundColor: '#3ba5b3', // Match background color for consistency
            position: 'relative',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            margin: '20px', // Added margin for spacing
          }}
        >
          {/* Image placeholder */}
          <div
            style={{
              width: '100%',
              height: '150px',
              backgroundColor: '#ffffff',
              marginBottom: '10px',
              borderRadius: '8px',
              backgroundImage: 'url(/path/to/image.jpg)', // Replace with the path to the image from the backend later
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>

          <h3 className="text-2xl mb-4">Rate Entertainment</h3>
          <div className="star-rating">
            <StarRating size={30} />
          </div>
        </motion.div>

        {/* Submit Button below the rating boxes */}
        <button
          onClick={handleShowResults} // Display results and scroll to them
          className="text-white px-8 py-4 rounded-lg text-lg hover:bg-gray-200 transition duration-300 shadow-md hover:shadow-lg mt-8"
          style={{
            backgroundColor: '#ffffff',     // Set button background color to white
            color: '#3ba5b3',               // Set text color to match the background color
            fontFamily: 'Poppins, sans-serif', // Apply Poppins font
            fontSize: '2rem',                  // Slightly larger font size
            padding: '1rem 3rem',              // Increase padding for a bigger button
          }}
        >
          Submit
        </button>
      </motion.div>

      {/* Results Section - Display when showResults is true */}
      {showResults && (
        <motion.div
          ref={resultsSectionRef}
          style={{
            minHeight: '100vh',
            backgroundColor: 'transparent',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
          {resultsData.map((result) => (
            <motion.div
              key={result.id}
              whileHover={{ scale: 1.05 }} // Slightly scale on hover
              style={{
                width: '300px',
                height: '350px', // Increased height for image and title
                textAlign: 'center',
                backgroundColor: '#3ba5b3', // Match background color
                position: 'relative',
                padding: '16px',
                borderRadius: '12px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                margin: '10px', // Space between boxes
              }}
            >
              {/* Image Placeholder */}
              <div
                style={{
                  width: '100%',
                  height: '150px',
                  backgroundColor: '#ffffff',
                  marginBottom: '10px',
                  borderRadius: '8px',
                  backgroundImage: `url(${result.imageUrl})`, // Replace with actual image from result
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>

              {/* Title of the result */}
              <h3 className="text-2xl mb-4">{result.title}</h3>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default App;
