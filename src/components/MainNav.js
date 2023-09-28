import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation(); // Get the current location

  useEffect(() => {
    // Define a function to map location pathname to the corresponding value
    const getValueForPathname = (pathname) => {
      switch (pathname) {
        case "/":
          return 0;
        case "/movies":
          return 1;
        case "/series":
          return 2;
        case "/search":
          return 3;
        default:
          return 0; // Default to 0 if the pathname doesn't match
      }
    };

    // Set the value based on the current pathname
    setValue(getValueForPathname(location.pathname));
  }, [location]);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0, // Stick to the bottom
        left: 0, // Stick to the left
        right: 0, // Stick to the right
        zIndex: 100,
      }}
    >
      <BottomNavigation
        style={{
          backgroundColor: "#faf3e0", // Set your desired background color
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          // Set the value when the user clicks on a navigation item
          setValue(newValue);
          // Navigate to the corresponding path
          switch (newValue) {
            case 0:
              navigate("/");
              break;
            case 1:
              navigate("/movies");
              break;
            case 2:
              navigate("/series");
              break;
            case 3:
              navigate("/search");
              break;
            default:
              navigate("/");
          }
        }}
      >
        <BottomNavigationAction
          style={{
            color: value === 0 ? "#c70404" : "#48B9B6",
          }}
          label="Trending"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          style={{
            color: value === 1 ? "#c70404" : "#48B9B6",
          }}
          label="Movie"
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          style={{
            color: value === 2 ? "#c70404" : "#48B9B6",
          }}
          label="TV Series"
          icon={<TvIcon />}
        />
        <BottomNavigationAction
          style={{
            color: value === 3 ? "#c70404" : "#48B9B6",
          }}
          label="Search"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
