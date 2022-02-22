"use strict";

const url = "https://celestial-dramatic-fuschia.glitch.me/movies";



//GET ALL MOVIES
function fetchAllMovies() {
    return fetch(url)
        .then(res => res.json()
            .then(data => data))
            .catch(err => console.log(err));
}


// GET ONE MOVIE
function fetchOneMovie(movieID) {
    return fetch(url)
        .then(res => res.json())
        .then(movies => {
            for (let movie of movies) {
                if (movie.id === movieID) {
                    return movie;
                }
            }
        })
        .catch(err => console.log(err));
}

fetchOneMovie(5).then(movieInfo => console.log(movieInfo));

//ADD A NEW MOVIE
function addMovie() {
    //This is producing an error:
    //"Private field '#title' must be declared in an enclosing class"
    let newMovie = {
        title: $('#title').val(),
        director: $('#director').val(),
        rating: $('#rating').val()
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie)
    }
    fetch(url,options)
        .then(res => {
            console.log("Movie has been created!")
        })
}

// Delete a Movie
function deleteMovie(movieID) {
    let newMovie = {
        id: $('movieID').val()
    }
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie)
    }
    fetch(url,options)
        .then(res => {
            console.log("Movie has been deleted!")
        })
}