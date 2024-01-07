import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Container>
    <Row className="justify-content-center">
      <Col>
        <img src={movie.ImagePath} alt="movie poster" className="img-fluid" />
      </Col>
      <Col>
      <div>
        <span><h1>{movie.Title}</h1></span>
      </div>
      <br></br>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <br></br>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <br></br>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <br></br>
      <Button onClick={onBackClick} className="back-button" style={{ cursor: "pointer"}}>
        Back
      </Button>
      </Col>
    </Row>
    </Container>
  );
};

// Prop Constraints

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};