import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

function Search() {
  // State to store the search term
  const [searchTerm, setSearchTerm] = useState("");
  // State to store the search results
  const [searchResults, setSearchResults] = useState([]);
  // State to store the total number of pages for pagination
  const [numOfPages, setNumOfPages] = useState(0);
  // State to track the current page for pagination
  const [page, setPage] = useState(1);
  const API_KEY = process.env.REACT_APP_API_KEY;

  // State to store a reference to the timer
  const [searchTimer, setSearchTimer] = useState(null);

  useEffect(() => {
    // Function to fetch search results when the search term or page changes
    const fetchSearchResults = async () => {
      try {
        // Check if the search term is empty
        if (searchTerm.trim() === "") {
          // If it's empty, clear the search results
          setSearchResults([]);
          return;
        }

        // Fetch search results from the API
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchTerm}&page=${page}`
        );

        // Check if the response status is 404 (Not Found)
        if (response.status === 404) {
          // Handle the 404 error, e.g., by clearing search results or showing a message
          setSearchResults([]);
          return;
        }

        // Update the search results and total number of pages
        setSearchResults(response.data.results);
        setNumOfPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    // Use a timer to debounce the search term changes
    if (searchTerm) {
      if (searchTimer) {
        clearTimeout(searchTimer); // Clear the previous timer
      }
      // Set a new timer to execute the fetchSearchResults function after a delay (e.g., 500 milliseconds)
      setSearchTimer(
        setTimeout(() => {
          fetchSearchResults();
        }, 500)
      );
    } else {
      // If the search term is empty, clear the search results immediately
      setSearchResults([]);
    }

    // Clean up the timer when the component unmounts
    return () => {
      if (searchTimer) {
        clearTimeout(searchTimer);
      }
    };
  }, [searchTerm, API_KEY, page]);

  return (
    <div>
      {/* Page title */}
      <span className="pageTitle">Search</span>

      {/* Autocomplete input for searching */}
      <Autocomplete
        id="movie-search"
        options={searchResults}
        getOptionLabel={(option) => option.title || option.name}
        style={{ width: 250, margin: "auto", height: 190 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for Movies and TV Series"
            variant="outlined"
            fullWidth
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        )}
      />

      {/* Display search results */}
      {!searchResults ? (
        <h2>No results were found.</h2>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            paddingBottom: "10px",
          }}
          className="movie"
        >
          {searchResults.map((result) => (
            <SingleContent
              key={result.id}
              id={result.id}
              poster={result.poster_path}
              title={result.title || result.name}
              date={result.release_date || result.first_air_date}
              media_type={result.media_type}
              vote_average={result.vote_average}
            />
          ))}
        </div>
      )}

      {/* Display "No results found" message */}
      {searchResults.length === 0 && searchTerm.trim() !== "" && (
        <h2 style={{ alignContent: "center", marginLeft: "34%" }}>
          No results were found.
        </h2>
      )}

      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
}

export default Search;
