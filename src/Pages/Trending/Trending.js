import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Trending.css";
import CustomPagination from "../../components/Pagination/CustomPagination";

function Trending() {
  const [page, setPage] = useState(1);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    // Define an async function to fetch trending movies
    const fetchTrending = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
        );
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    // Call the fetchTrending function when the component mounts
    fetchTrending();
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending Movies</span>
      <div className="trending">
        {trendingMovies.map((movie) => (
          <SingleContent
            key={movie.id}
            id={movie.id}
            poster={movie.poster_path}
            title={movie.title || movie.name}
            date={movie.release_date || movie.first_air_date}
            media_type={movie.media_type}
            vote_average={movie.vote_average.toFixed(1)}
          />
        ))}
      </div>
      <CustomPagination setPage={setPage} numOfPages={numOfPages} />
    </div>
  );
}

export default Trending;
