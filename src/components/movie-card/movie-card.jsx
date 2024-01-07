import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  
  return (
    <Card
      className="h-100 mb-5 shadow"
      style={{ backgroundColor: "rgb(70, 70, 70)" }}
    >
      <Card.Img 
        variant="top card-img"
        src={movie.ImagePath}
        />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Button onClick={() => onMovieClick(movie)}>
          More Info
        </Button>
      </Card.Body>
    </Card>
  );
};

  // Prop Constraints
  MovieCard.propTypes = {
    movie: PropTypes.shape({
      ImagePath: PropTypes.string.isRequired,
      Title: PropTypes.string,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }),
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
  };