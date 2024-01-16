import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, user, setUser, token }) => {
  
  // Favorite Setup
  
  const [Favorite, setFavorite] = useState(false);
  
  useEffect(() => {
    if (user.FavoriteMovies && user.FavoriteMovies.includes(movie._id)) {
      setFavorite(true);
    }
  }, [user]);

  const addFavoriteMovie = () => {
    fetch(
      `https://my-movie-flix-md-b48020e1b074.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Failed to add fav movie");
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully added to favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://my-movie-flix-md-b48020e1b074.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully deleted from favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setFavorite(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

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
        <Card.Title>{movie.Title}   
        {!Favorite ? (
          <Button className="fav-btn" onClick={addFavoriteMovie}>+</Button>
        ) : (
          <Button className="fav-btn" onClick={removeFavoriteMovie}>-</Button>
        )}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
        <Button variant="link">
          More Info
        </Button>
        </Link>
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
  };