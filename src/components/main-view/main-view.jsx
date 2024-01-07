import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const storedToken = localStorage.getItem("token");

    const [user, setUser] = useState(storedUser ? storedUser : null);

    const [token, setToken] = useState(storedToken ? storedToken : null);

    const [movie, setMovie] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);



    useEffect(() => {
        if (!token) {
            return;
        }

        fetch('https://my-movie-flix-md-b48020e1b074.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        _id: movie._id,
                        Title: movie.Title,
                        ImagePath: movie.ImagePath,
                        Description: movie.Description,
                        Year: movie.Year,
                        Genre: {
                            Name: movie.Genre.Name,
                            Description: movie.Genre.Description
                        },
                        Director: {
                            Name: movie.Director.Name,
                            Bio: movie.Director.Bio,
                            Birth: movie.Director.Birth
                        }
                    };
                });

                setMovie(moviesFromApi);
            });
    }, [token]);

    if (!user) {
        return (
            <Row className="justify-content-md-center">
                <Col md={5}>
                    <LoginView
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                        }}
                    />
                    or
                    <SignupView />
                </Col>
            </Row>
        );
    }


    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movie.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
            <Row className="justify-content-md-center">
            {movie.map((movie) => (
                <Col md={6} lg={4} xl={3} className="mb-5" key={movie._id} >
                <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
                </Col>
            ))}
            <Button 
                style={{ cursor: "pointer"}}
                onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            >
                Logout
            </Button>
        </Row>
    );
};