import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movie, setMovie] = useState([
        {
            id: 1,
            title: "Dune",
            description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
            genre: "Action",
            director: "Denis Villeneuve",
            image:
                "https://upload.wikimedia.org/wikipedia/en/8/8e/Dune_(2021_film).jpg",
        },
        {
            id: 2,
            title: "Wonka",
            description: "With dreams of opening a shop in a city renowned for its chocolate, a young and poor Willy Wonka discovers that the industry is run by a cartel of greedy chocolatiers.",
            genre: "Adventure",
            director: "Paul King",
            image:
                "https://a.ltrbxd.com/resized/film-poster/7/0/6/0/8/3/706083-wonka-0-230-0-345-crop.jpg?k=1e72f5d9dd",
        },
        {
            id: 3,
            title: "Interstellar",
            description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
            genre: "Drama",
            director: "Christopher Nolan",
            image:
                "https://movieposters2.com/images/1243362-b.jpg",
        },
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);
    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movie.length === 0) {
        return <div>The list is empty!</div>;
    } else {
        return (
            <div>
                {movie.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                ))}
            </div>
        );
    }
};