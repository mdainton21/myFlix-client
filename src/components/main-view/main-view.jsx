import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const storedToken = localStorage.getItem("token");

    const [user, setUser] = useState(storedUser? storedUser : null);

    const [token, setToken] = useState(storedToken? storedToken : null);

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
            <>
            <LoginView
                onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }}
            />
            or
            <SignupView />
            </>
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
        <div>
            <button
                onClick={() => {
                    setUser(null); 
                    setToken(null); 
                    localStorage.clear();
                }}
            >
                Logout
            </button>
            {movie.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};