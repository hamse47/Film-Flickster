// Import necessary libraries and styles
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import axios from "axios";
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../Config/config"; // Import image URLs and other constants
import { Button } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "./ContentModal.css"; // Import custom CSS styles
import Carousel from "../Carousel/Carousel"; // Import Carousel component

// Define CSS styles for the modal component
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "70%",
    height: "60%",
    backgroundColor: "#39445a",
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    boxShadow: 5,
    padding: 3,
  },
}));

// Define the ContentModal component
export default function ContentModal({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false); // State variable for modal open/close
  const [content, setContent] = useState(); // State variable to store content data
  const [video, setVideo] = useState(); // State variable to store video key

  const handleOpen = () => {
    setOpen(true); // Function to open the modal
  };

  const handleClose = () => {
    setOpen(false); // Function to close the modal
  };

  // Function to fetch content data from an API
  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data); // Update the 'content' state with fetched data
  };

  // Function to fetch video data from an API
  const fetchVideo = async () => {
    try {
      // Check if content is available (fetched successfully)
      if (content) {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setVideo(data.results[0]?.key); // Update the 'video' state with the video key
      }
    } catch (error) {
      // Handle the error gracefully, e.g., log it or show a message
      console.error("Error fetching videos:", error);
    }
  };

  // Use the 'useEffect' hook to run 'fetchData' and 'fetchVideo' once when the component mounts
  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <>
      {/* Clickable media container */}
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>

      {/* Modal for displaying content details */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          {content && (
            <div className={classes.paper}>
              <div className="ContentModal">
                {/* Display content images */}
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />

                {/* Display content details */}
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}
                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  {/* Display related media in a carousel */}
                  <div>
                    <Carousel media_type={media_type} id={id} />
                  </div>

                  {/* Display a button to watch the trailer */}
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}
