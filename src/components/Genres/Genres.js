import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import axios from "axios";

function Genres({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  setPage,
  type,
}) {
  const API_KEY = process.env.REACT_APP_API_KEY;

  // Function to handle when a genre chip is clicked
  const handleClick = (genre) => {
    // Check if the genre is already selected
    const index = selectedGenres.findIndex(
      (selectedGenre) => selectedGenre.id === genre.id
    );
    if (index === -1) {
      // If not selected, add it to the selectedGenres array
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      // If already selected, remove it from the selectedGenres array
      const updatedGenres = [...selectedGenres];
      updatedGenres.splice(index, 1);
      setSelectedGenres(updatedGenres);
    }
  };

  // Function to handle when the delete icon on a genre chip is clicked
  const handleDelete = (genre) => {
    // Remove the genre from the selectedGenres array
    const updatedGenres = selectedGenres.filter(
      (selectedGenre) => selectedGenre.id !== genre.id
    );
    setSelectedGenres(updatedGenres);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`
        );
        setGenres(data.genres);
      } catch (error) {}
    };
    fetchGenres();
  }, [type, setGenres]);

  return (
    <div>
      {genres &&
        genres.map((genre) => (
          <Chip
            key={genre.id}
            style={{ margin: 2 }}
            label={genre.name}
            onClick={() => handleClick(genre)} // Call handleClick with the clicked genre
            onDelete={() => handleDelete(genre)} // Call handleDelete with the clicked genre
            color={
              selectedGenres.some(
                (selectedGenre) => selectedGenre.id === genre.id
              )
                ? "success"
                : "default"
            } // Change color based on selection
          />
        ))}
    </div>
  );
}

export default Genres;
