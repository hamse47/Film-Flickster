// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import axios from "axios";
import Genres from "../../components/Genres/Genres";

function Movie() {
  const [page, setPage] = useState(1); // State variable for current page
  const API_KEY = process.env.REACT_APP_API_KEY; // API key stored in environment variables
  const [movie, setMovie] = useState([]); // State variable to store movie data
  const [numOfPages, setNumOfPages] = useState(0); // State variable for the total number of pages
  const [selectedGenres, setSelectedGenres] = useState([]); // State variable for selected genres
  const [genres, setGenres] = useState([]); // State variable for all available genres

  // Function to fetch movie data based on selected genres and page
  const fetchMovies = async () => {
    try {
      const selectedGenreIds = selectedGenres
        .map((genre) => genre.id)
        .join(",");
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${selectedGenreIds}`
      );
      setMovie(data.results); // Update the 'movie' state with fetched movie data
      setNumOfPages(data.total_pages); // Update the 'numOfPages' state with the total number of pages
    } catch (error) {
      console.error("Error fetching movies:", error); // Handle errors while fetching movies
    }
  };

  // Use the 'useEffect' hook to run 'fetchMovies' when 'page', 'API_KEY', or 'selectedGenres' change
  useEffect(() => {
    fetchMovies();
  }, [page, API_KEY, selectedGenres]);

  return (
    <div>
      <span className="pageTitle">Movies</span>
      {/* Genres component for selecting movie genres */}
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      {/* Display movies in a grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          paddingBottom: "10px",
        }}
        className="movie"
      >
        {movie.map((movie) => (
          // SingleContent component to display individual movie items
          <SingleContent
            key={movie.id}
            id={movie.id}
            poster={movie.poster_path}
            title={movie.title || movie.name}
            date={movie.release_date || movie.first_air_date}
            media_type="movie"
            vote_average={movie.vote_average}
          />
        ))}
      </div>
      {/* Display pagination if there are multiple pages of results */}
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
}

export default Movie; // Export the Movie component for use in other parts of the application
