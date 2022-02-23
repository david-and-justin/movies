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
                    let movieCard =
                        //language=HTML

                        `
                            <div class="col mb-5">
                                <div class="card h-100">
                                    <!-- Movie image-->
                                    <img class="card-img-top" src=${poster} alt="..."/>
                                    <!-- Movie details-->
                                    <div class="card-body p-4">
                                        <div class="text-center">
                                            <!-- Product name-->
                                            <h5 class="fw-bolder">${movieTitle}</h5>
                                            <p><b>Director: </b>${director}</p>
                                            <p><b>Rating: </b>${rating}</p>
                                            <p><b>Year: </b>${year}</p>
                                            <p><b>Genre: </b>${genre}</p>
                                        </div>
                                    </div>
                                    <!-- Product actions-->
                                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                        <div class="text-center"><a data-id="${movieID}"
                                                                    class="btn btn-outline-dark mt-auto edit-button"
                                                                    data-bs-toggle="modal" data-bs-target="#editModal"
                                                                    href="#">Edit</a></div>
                                    </div>
                                </div>
                            </div>`;

                    $("#card-area").append(movieCard);
                }

            }))
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


$(document).on('click', '.edit-button', function () {
    $('#change-btn').attr('data-id', $(this).attr('data-id'));
    fetchOneMovie(parseInt($(this).attr('data-id')))
        .then(movie => {
            $('#ID').val(movie.id);
            $('#title').val(movie.title);
            $('#director').val(movie.director);
            $('#rating').val(movie.rating);
            $('#year').val(movie.year);
            $('#genre').val(movie.genre);
        })
});


$('#change-btn').click(function (event) {
    event.preventDefault();
    editMovie(parseInt($(this).attr('data-id')));
});

$('#delete-btn').click(function (event) {
    event.preventDefault();
    let thisMovieID = parseInt($('#ID').val());
    deleteMovie(thisMovieID);
});

$('#add-btn').click(function (event) {
    event.preventDefault();
    addMovie(parseInt($(this).attr('data-id')));
});

$('#clear-btn').click(function (event) {
    event.preventDefault();
    clearFields();
});


function editMovie(movieID) {
    let updateMovie = {
        id: movieID,
        title: $('#title').val(),
        director: $('#director').val(),
        rating: $('#rating').val(),
        year: $('#year').val(),
        genre: $('#genre').val()
    }
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateMovie)
    }
    fetch(url + "/" + movieID, options)
        .then(data => {
            $("#card-area").html("");
            fetchAllMovies();
        })
}


//ADD A NEW MOVIE
function addMovie() {
    let newMovie = {
        title: $('#title').val(),
        director: $('#director').val(),
        rating: $('#rating').val(),
        year: $('#year').val(),
        genre: $('#genre').val(),
        poster: $('#img-url').val()
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie)
    }
    fetch(url, options)
        .then(data => {
            $("#card-area").html("");
            fetchAllMovies();
        })
        .then(clearFields);
}


// Delete a Movie
function deleteMovie(movieID) {
    let areYouSure = confirm("Are you sure you want to delete this movie?");
    if (areYouSure) {
        fetch(url + "/" + movieID, {
            method: "DELETE"
        })
            .then(data => {
                $("#card-area").html("");
                fetchAllMovies();
            })
            .then(clearFields);
    }
}


function clearFields() {
        $('#movie-form').children().val("");

}