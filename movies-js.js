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

function buildCard() {
    let movieTitle = d
        let movieCard = `<div class="col mb-5">
                <div class="card h-100">
                    <!-- Movie details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 class="fw-bolder"></h5>
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View
                            options</a></div>
                    </div>
                </div>
            </div>`;

    $('#card-area').append(movieCard);}
}