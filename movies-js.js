"use strict";

const url = "https://celestial-dramatic-fuschia.glitch.me/movies";
const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: json.stringify(newMovie)
}


//GET ALL MOVIES
function fetchAllMovies() {
    fetch(url)
        .then(res => res.json()
            .then(data => console.log(data)))
            .catch(err => console.log(err));
}

fetchAllMovies();


// GET ONE MOVIE
function fetchOneMovies(specID) {
    fetch(url)
        .then(res => res.json())
        .then(movies => {
            for (let movie of movies) {
                if (movie.id === specID) {
                    console.log(movie);
                }
            }
        })
        .catch(err => console.log(err));
}

fetchOneMovies(8);

function addMovie() {
    fetch(url)
        .then(res => res.json())
}