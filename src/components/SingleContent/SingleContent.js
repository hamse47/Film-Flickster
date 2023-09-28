// Import necessary libraries and styles
import { Badge } from "@mui/material";
import React from "react";
import { img_300, unavailable } from "../../Config/config"; // Import image URLs and other constants
import "./SingleContent.css"; // Import custom CSS styles
import ContentModal from "../ContentModal/ContentModal"; // Import ContentModal component

// Define the SingleContent component, which represents a single media content item
function SingleContent({ id, poster, title, date, media_type, vote_average }) {
  return (
    // Wrap the content in a ContentModal component for displaying details in a modal
    <ContentModal media_type={media_type} id={id}>
      <div className="content-container">
        {/* Display a badge showing the vote average */}
        <Badge
          className="MuiBadge-badge"
          badgeContent={vote_average}
          color={
            vote_average > 6
              ? "success"
              : vote_average >= 4
              ? "warning"
              : "error"
          }
        />
        {/* Display the content's poster image */}
        <img
          className="poster"
          src={poster ? `${img_300}${poster}` : unavailable}
          alt={title}
        />
        {/* Display the content's title */}
        <b className="title">{title}</b>
        {/* Display the content's type (TV series or Movies) */}
        <span className="subtitle">
          {media_type === "tv" ? "TV series" : "Movies"}
        </span>
        {/* Display the content's release date */}
        <span className="subtitle">{date}</span>
      </div>
    </ContentModal>
  );
}

export default SingleContent; // Export the SingleContent component for use in other parts of the application
