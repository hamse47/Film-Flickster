// Import necessary libraries and styles
import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../Config/config"; // Import image URLs
import "./Carousel.css"; // Import custom CSS styles

// Function to prevent dragging images when they are clicked
const handleDragStart = (e) => e.preventDefault();

// Define the Carousel component, which takes 'id' and 'media_type' as props
const Carousel = ({ id, media_type }) => {
  // State variable to store cast/credits data
  const [credits, setCredits] = useState([]);

  // Create an array of JSX elements representing cast/credits
  const items = credits.map((c) => (
    <div className="carouselItem">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture} // Display actor's image or a default picture
        alt={c?.name}
        onDragStart={handleDragStart} // Prevent image dragging
        className="carouselItem__img"
      />
      <b className="carouselItem__txt">{c?.name}</b>{" "}
      {/* Display actor's name */}
    </div>
  ));

  // Define responsive settings for the carousel
  const responsive = {
    0: {
      items: 3, // Display 3 items on smaller screens
    },
    512: {
      items: 5, // Display 5 items on screens wider than 512 pixels
    },
    1024: {
      items: 7, // Display 7 items on screens wider than 1024 pixels
    },
  };

  // Function to fetch cast/credits data from an API
  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setCredits(data.cast); // Update the 'credits' state with cast data
  };

  // Use the 'useEffect' hook to run 'fetchCredits' once when the component mounts
  useEffect(() => {
    fetchCredits();
  }, []);

  // Render the AliceCarousel component with specific settings
  return (
    <AliceCarousel
      mouseTracking // Allow mouse tracking for auto-play
      infinite // Enable infinite scrolling
      disableDotsControls // Disable pagination dots
      disableButtonsControls // Disable navigation buttons
      responsive={responsive} // Use the responsive settings defined above
      items={items} // Use the JSX elements representing cast/credits
      autoPlay // Enable auto-play for the carousel
    />
  );
};

// Export the Carousel component for use in other parts of the application
export default Carousel;
