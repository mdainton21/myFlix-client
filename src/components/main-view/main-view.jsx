import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Button, Col, Row, Form } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const storedToken = localStorage.getItem("token");

    const [user, setUser] = useState(storedUser ? storedUser : null);

    const [token, setToken] = useState(storedToken ? storedToken : null);

    const [movie, setMovie] = useState([]);

    const [search, setSearch] = useState("");

    const [selectedGenre, setSelectedGenre] = useState("");

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
                console.log(moviesFromApi);
            });
    }, [token]);

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>

                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                            }}
                                        />
                                    </Col>
                                )}
                            </>

                        }
                    />
                    <Route
                        path="/movies/:movieID"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movie.length === 0 ? (
                                    <Col><div>
                                        The list is empty!
                                    </div></Col>
                                ) : (
                                    <Col md={12}>
                                        <MovieView
                                            movies={movie}
                                        />
                                    </Col>
                                )}
                            </>

                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movie.length === 0 ? (
                                    <Col><div>
                                        The list is empty!
                                    </div></Col>
                                ) : (
                                    <>
                                        <Form>
                                            <Row className="mt-4">
                                                <Form.Group as={Col}>
                                                    <Form.Control
                                                        className="mb-3 w-40"
                                                        type="search"
                                                        id="searchForm"
                                                        onChange={(e) => setSearch(e.target.value)}
                                                        placeholder="Search Name"
                                                        aria-label="Search"
                                                    />
                                                </Form.Group>
                                                <Form.Group as={Col}>
                                                    <Form.Select className="mb-3 w-40" aria-label="Default select genre" onChange={(e) => setSelectedGenre(e.target.value)}>
                                                        <option value="" selected>Select Genre</option>
                                                        <option value="Action">Action</option>
                                                        <option value="Comedy">Comedy</option>
                                                        <option value="Drama">Drama</option>
                                                        <option value="Horror">Horror</option>
                                                        <option value="Thriller">Thriller</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group as={Col}>
                                                        <div className="">
                                                            <Button
                                                                onClick={() => {setSearch(""); setSelectedGenre("");}}
                                                            >
                                                                Reset Filters
                                                            </Button>
                                                        </div>
                                                </Form.Group>
                                            </Row>
                                        </Form>
                                        {movie.filter((movie) => {
                                            return selectedGenre === ""
                                                ? movie
                                                : movie.Genre.Name === selectedGenre;

                                        })
                                            .filter((movie) => {
                                                return search === ""
                                                    ? movie
                                                    : movie.Title.toLowerCase().includes(search.toLowerCase());
                                            })
                                            .map((movie) => (
                                                <Col md={6} lg={4} xl={3} className="mb-5" key={movie._id} >
                                                    <MovieCard
                                                        movie={movie}
                                                        user={user}
                                                        setUser={setUser}
                                                        token={token}
                                                    />
                                                </Col>
                                            ))}
                                    </>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <ProfileView
                                        user={user}
                                        token={token}
                                        movies={movie}
                                        setUser={setUser}
                                    />
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};