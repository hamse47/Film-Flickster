import React, { useState, useEffect } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import axios from "axios";
import Genres from "../../components/Genres/Genres";

function TvSeries() {
  const [page, setPage] = useState(1);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [tv, setTv] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  const fetchTv = async () => {
    try {
      const selectedGenreIds = selectedGenres
        .map((genre) => genre.id)
        .join(",");
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${selectedGenreIds}`
      );
      setTv(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching Tv:", error);
    }
  };

  useEffect(() => {
    fetchTv();
  }, [page, selectedGenres]);

  return (
    <div>
      <span className="pageTitle">
        <div>
          <span className="pageTitle">TV series</span>
          <Genres
            type="tv"
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
            genres={genres}
            setGenres={setGenres}
            setPage={setPage}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              paddingBottom: "10px",
            }}
            className="tv"
          >
            {tv.map((tv) => (
              <SingleContent
                key={tv.id}
                id={tv.id}
                poster={tv.poster_path}
                title={tv.title || tv.name}
                date={tv.release_date || tv.first_air_date}
                media_type="tv"
                vote_average={tv.vote_average}
              />
            ))}
          </div>
          {numOfPages > 1 && (
            <CustomPagination setPage={setPage} numOfPages={numOfPages} />
          )}
        </div>
      </span>
    </div>
  );
}

export default TvSeries;
