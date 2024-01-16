// import PropTypes from "prop-types";
import { Col, Row, Button, Container } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  console.log(movies);

  const { movieID } = useParams();

  const movie = movies.find((movie) => movie._id === movieID);

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
          <Link to={`/`}>
            <Button className="back-button" style={{ cursor: "pointer" }}>
              Back
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

// Prop Constraints

// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     ImagePath: PropTypes.string.isRequired,
//     Title: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//     }),
//     Description: PropTypes.string.isRequired,
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//     }),
//   }).isRequired,
// };