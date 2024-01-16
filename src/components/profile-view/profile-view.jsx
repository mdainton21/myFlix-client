import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card"
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export const ProfileView = ({ user, token, movies, setUser }) => {

    const [username, setUsername] = useState(user.Username)
    const [password, setPassword] = useState(user.password)
    const [email, setEmail] = useState(user.email)
    const [birthday, setBirthday] = useState(user.birthday)


    const favMovie = user.FavoriteMovies ? movies.filter((movie) => user.FavoriteMovies.includes(movie._id)) : [];


    const handleUpdate = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://my-movie-flix-md-b48020e1b074.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(async (response) => {
            console.log(response)
            if (response.ok) {
                response.json();
                alert('updated!')
            } else {
                const e = await response.text()
                console.log(e)
                alert("Update failed.")
            }
        }).then((updatedUser) => {
            if (updatedUser) {
                localStorage.setItem('user', JSON.stringify(updatedUser))
                setUser(updatedUser)
            }
        })

    }


    const handleDelete = () => {
        fetch(`https://my-movie-flix-md-b48020e1b074.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                setUser(null);
                alert("Your account has been deleted");
            } else {
                alert("something went wrong.")
            }
        })
    }

    return (
        <Container>
            <Row className="justify-content-md-center mt-4">
                <Col>
                    <h1>{user.Username}'s Profile</h1>
                </Col>
            </Row>
            <Row className="justify-content-md-center mx-3 my-4">
            <h2 className="profile-title">Favorite movies</h2>
                {
                favMovie?.length !== 0 ?
                favMovie?.map((movie) => {
                    return (

                        <Col md={6} lg={4} xl={3} className="mb-5" key={movie._id} >
                            <MovieCard
                                movie={movie}
                                user={user}
                                setUser={setUser}
                                token={token}
                            />
                        </Col>
                    );
                })
                : <Col md={6}>
                <br></br>
                    <h3>Add some Favorite Movies!</h3>
                </Col>
}
            </Row>






            <Row className="justify-content-center">

                <Col md={6} >
                    <h2 className="profile-title">Update info</h2>
                    <Form className="my-profile" onSubmit={handleUpdate}>
                        <Form.Group className="mb-2" controlId="formName">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                minLength="4"
                            />
                        </Form.Group >
                        <Form.Group className="mb-2" controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                required />
                        </Form.Group>

                        <Button className="update" type="submit" onClick={handleUpdate}>Update</Button>
                        <Button className="delete" onClick={handleDelete}>Delete Account</Button>

                    </Form>

                </Col>

            </Row>


        </Container>

    )
}