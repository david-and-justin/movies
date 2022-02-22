"use strict";

const url = "https://celestial-dramatic-fuschia.glitch.me/movies";


//GET ALL MOVIES
function fetchAllMovies() {
    return fetch(url)
        .then(res => res.json()
            .then(data => {
                console.log(data);
                $("#card-area").html("");
                for (const movie of data) {
                    let movieTitle = movie.title;
                    let movieID = movie.id;
                    let director = movie.director;
                    let poster = movie.poster;
                    let rating = movie.rating;
                    let year = movie.year;
                    let genre = movie.genre;
                    let movieCard = `<div class="col mb-5">
                                        <div class="card h-100">
                                            <!-- Movie image-->
                                            <img class="card-img-top" src=${poster} alt="..."/>
                                            <!-- Movie details-->
                                            <div class="card-body p-4">
                                                <div class="text-center">
                                                    <!-- Product name-->
                                                    <h5 class="fw-bolder">${movieTitle}</h5>
                                                    <p>${movieID}</p>
                                                    <p>${director}</p>
                                                    <p>${rating}</p>
                                                    <p>${year}</p>
                                                </div>
                                            </div>
                                            <!-- Product actions-->
                                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Edit</a></div>
                                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Remove</a></div>
                                            </div>
                                        </div>
                                    </div>`;

                    $("#card-area").append(movieCard);
                }
            }))
        .catch(err => console.log(err));
}


// GET ONE MOVIE
// function fetchOneMovie(movieID) {
//     return fetch(url)
//         .then(res => res.json())
//         .then(movies => {
//             for (let movie of movies) {
//                 if (movie.id === movieID) {
//                     return movie;
//                 }
//             }
//         })
//         .catch(err => console.log(err));
// }
//
// fetchOneMovie(5).then(movieInfo => console.log(movieInfo));

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
    fetch(url, options)
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
    fetch(url, options)
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

        $('#card-area').append(movieCard);
    }
}