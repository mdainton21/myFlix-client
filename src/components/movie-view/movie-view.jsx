import { Col, Row, Button, Container } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Badge from 'react-bootstrap/Badge';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {

  const { movieID } = useParams();

  const movie = movies.find((movie) => movie._id === movieID);


  // Popover Setup
  const genrePopover = (
    <Popover id="popover-basic" data-bs-theme="dark">
      <Popover.Header as="h3">{movie.Genre.Name}</Popover.Header>
      <Popover.Body>
        {movie.Genre.Description}
      </Popover.Body>
    </Popover>
  );

  const directorPopover = (
    <Popover id="popover-basic" data-bs-theme="dark">
      <Popover.Header as="h3">{movie.Director.Name}</Popover.Header>
      <Popover.Body>
        {movie.Director.Bio}
        <br></br>
        Born: {movie.Director.Birth}
      </Popover.Body>
    </Popover>
  );

  const GenreDeets = () => (
    <OverlayTrigger trigger="click" placement="left" overlay={genrePopover}>
      <Badge pill bg="primary" style={{ cursor: "pointer" }}>
        Info
      </Badge>
    </OverlayTrigger>
  );

  const DirectorDeets = () => (
    <OverlayTrigger trigger="click" placement="left" overlay={directorPopover}>
      <Badge pill bg="primary" style={{ cursor: "pointer" }}>
        Info
      </Badge>
    </OverlayTrigger>
  );

  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <img src={movie.ImagePath} alt="movie poster" className="img-fluid p-4" />
        </Col>
        <Col>
          <br></br>
          <div>
            <span><h1>{movie.Title}</h1></span>
          </div>
          <br></br>
          <div>
            <span><h3><b>Description: </b></h3></span>
            <span>{movie.Description}</span>
          </div>
          <br></br>
          <div>
            <span><b>Genre: </b></span>
            <span>{movie.Genre.Name}   <GenreDeets /></span>
          </div>
          <br></br>
          <div>
            <span><b>Director: </b></span>
            <span>{movie.Director.Name}   <DirectorDeets /></span>
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