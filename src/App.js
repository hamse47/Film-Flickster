// Import necessary libraries and styles
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav";
import Movies from "./Pages/Movies/Movies";
import Trending from "./Pages/Trending/Trending";
import TvSeries from "./Pages/TvSeries/TvSeries";
import Search from "./Pages/Search/Search";

// Define the App component
function App() {
  return (
    <Router>
      <div>
        {/* Display the Header component at the top */}
        <Header />
      </div>
      <Container>
        {/* Define routing for different pages */}
        <Routes>
          <Route path="/" element={<Trending />} />{" "}
          {/* Default route for Trending page */}
          <Route path="/movies" element={<Movies />} />{" "}
          {/* Route for Movies page */}
          <Route path="/series" element={<TvSeries />} />{" "}
          {/* Route for TV Series page */}
          <Route path="/search" element={<Search />} />{" "}
          {/* Route for Search page */}
        </Routes>
      </Container>
      {/* Display the Main Navigation component at the bottom */}
      <SimpleBottomNavigation />
    </Router>
  );
}

export default App;
