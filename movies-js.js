"use strict";

const url = "https://celestial-dramatic-fuschia.glitch.me/movies";

//GET ALL MOVIES
function fetchAllMovies() {
    return fetch(url)
        .then(res => res.json()
            .then(data => {
                displayMovies(data);
            }))
        .catch(err => console.log(err))
}

const fetchAllMoviesSorted = (function (){
    return fetch(url)
        .then(res => res.json()
            .then(data => {
                //console.log(data);
                $("#card-area").html("");
                //Loop through all movies in the database, getting ID, title, director, & other properties
                for (const movie of data) {
                    let movieTitle = movie.title;
                    let movieID = movie.id;
                    let director = movie.director;
                    let rating = movie.rating;
                    let year = movie.year;
                    let genre = movie.genre;

                    //Call a function to hotlink a poster image in the top portion of each movie card
                    let movieCardTop = populatePoster(movie.poster);

                    //Add a div to contain the title of each movie as a heading
                    let movieCardMiddle = `<div class="card-body p-4">
                                        <div class="text-center">
                                            <!-- Product name-->
                                            <h5 class="fw-bolder">${movieTitle}</h5>
                                        `;
                    //The other properties of each movie will display between the middle & the bottom
                    //Add an Edit button at the bottom of the card
                    let movieCardBottom =
                        //language=HTML
                        `</div>
                        </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a data-id="${movieID}"
                                                            class="edit-button btn btn-outline-dark mt-auto"
                                                            data-bs-toggle="modal" data-bs-target="#editModal"
                                                            href="#">Edit</a></div>
                            </div>
                            </div>
                            </div>
                        `;
                    //Concatenate the whole mess of HTML, calling a function to get field data,
                    //and append it to the card-area div
                    $("#card-area").append(movieCardTop + movieCardMiddle + createCard(director, rating, year, genre) + movieCardBottom);
                }
            }))
        .catch(err => console.log(err));
});

// CREATE MOVIE CARD
function createCard(director, rating, year, genre) {
    let cardGuts = "";
    if (director !== "" && director !== undefined) {
        cardGuts += `<p><b>Director: </b>${director}</p>`;
    }
    if (rating !== "" && rating !== undefined) {
        cardGuts += `<p><b>Rating: </b>${rating}</p>`;
    }
    if (year !== "" && year !== undefined) {
        cardGuts += `<p><b>Year: </b>${year}</p>`;
    }
    if (genre !== "" && genre !== undefined) {
        cardGuts += `<p><b>Genre: </b>${genre}</p>`;
    }
    return cardGuts;
}

//Display a poster in each movie card if a URL is specified; otherwise display a placeholder image
function populatePoster(image) {
    let posterURL = "";
    if (image !== undefined && image !== "") {
        posterURL +=
            //language=HTML
            `
                <div class="col mb-5">
                    <div class="card h-100">
                        <!-- Movie image-->
                        <img class="card-img-top" src=${image} alt="..."/>
            `;
    } else {
        posterURL +=
            //language=HTML
            `
                <div class="col mb-5">
                    <div class="card h-100">
                        <!-- Movie image-->
                        <img class="card-img-top" src="img/blank_movie.jpg" alt="..."/>
            `;
    }
    return posterURL;
}

// GET ONE MOVIE (specified by ID)
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

function sortMoviesByTitle(){
    return fetch(url)
        .then(res => res.json()
            .then(data => {
                data.sort(function(a, b) {
                    if (a.title === undefined || a.title === null) {
                        return 1
                    }
                    if (b.title === undefined || b.title === null) {
                        return -1
                    }
                    if(a.title.toLowerCase() < b.title.toLowerCase()) {
                        return -1;
                    } else if(b.title.toLowerCase() < a.title.toLowerCase()) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                displayMovies(data);

            }));
}


function sortMoviesByRating(){
    return fetch(url)
        .then(res => res.json()
            .then(data => {
                data.sort(function(a, b) {
                    if (a.rating === undefined || a.rating === null) {
                        return -1
                    }
                    if (b.rating === undefined || b.rating === null) {
                        return 1
                    }
                    if(a.rating.toLowerCase() < b.rating.toLowerCase()) {
                        return 1;
                    } else if(b.rating.toLowerCase() < a.rating.toLowerCase()) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                displayMovies(data);

            }));
}


function sortMoviesByGere(){
    return fetch(url)
        .then(res => res.json()
            .then(data => {
                data.sort(function(a, b) {
                    if (a.genre === undefined || a.genre === null) {
                        return 1
                    }
                    if (b.genre === undefined || b.genre === null) {
                        return -1
                    }
                    if(a.genre.toLowerCase() < b.genre.toLowerCase()) {
                        return -1;
                    } else if(b.genre.toLowerCase() < a.genre.toLowerCase()) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                displayMovies(data);

            }));
}


function displayMovies(data) {
    $("#card-area").html("");
    //Loop through all movies in the database, getting ID, title, director, & other properties
    for (const movie of data) {
        let movieTitle = movie.title;
        let movieID = movie.id;
        let director = movie.director;
        let rating = movie.rating;
        let year = movie.year;
        let genre = movie.genre;

        //Call a function to hotlink a poster image in the top portion of each movie card
        let movieCardTop = populatePoster(movie.poster);

        //Add a div to contain the title of each movie as a heading
        let movieCardMiddle = `<div class="card-body p-4">
                                        <div class="text-center">
                                            <!-- Product name-->
                                            <h5 class="fw-bolder">${movieTitle}</h5>
                                        `;
        //The other properties of each movie will display between the middle & the bottom
        //Add an Edit button at the bottom of the card
        let movieCardBottom =
            //language=HTML
            `</div>
                        </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a data-id="${movieID}"
                                                            class="edit-button btn btn-outline-dark mt-auto"
                                                            data-bs-toggle="modal" data-bs-target="#editModal"
                                                            href="#">Edit</a></div>
                            </div>
                            </div>
                            </div>
                        `;
        //Concatenate the whole mess of HTML, calling a function to get field data,
        //and append it to the card-area div
        $("#card-area").append(movieCardTop + movieCardMiddle + createCard(director, rating, year, genre) + movieCardBottom);
    }
}

//This is below the fetchAllMovies & fetchOneMovie functions because js is read from top to bottom
$(document).on('click', '.edit-button', function () {
    $('#change-btn').attr('data-id', $(this).attr('data-id'));
    fetchOneMovie(parseInt($(this).attr('data-id')))
        .then(movie => {
            $('#edit-ID').val(movie.id);
            $('#edit-title').val(movie.title);
            $('#edit-director').val(movie.director);
            $('#edit-rating').val(movie.rating);
            $('#edit-year').val(movie.year);
            $('#edit-genre').val(movie.genre);
        }).then($('#edit-title').focus());
});

//A series of event listeners for buttons to add, delete, edit/update movies
//and to clear the form fields in order to start over
$('#change-btn').click(function (event) {
    event.preventDefault();
    editMovie(parseInt($(this).attr('data-id')));
});

$('#delete-btn').click(function (event) {
    event.preventDefault();
    let thisMovieID = parseInt($('#edit-ID').val());
    deleteMovie(thisMovieID);
});

$('#add-btn').click(function (event) {
    event.preventDefault();
    addMovie(parseInt($(this).attr('data-id')));
});

$('.clear-btn').click(function (event) {
    event.preventDefault();
    clearFields();
});

$('#sort-title-btn').click(function (event) {
    event.preventDefault();
    sortMoviesByTitle();
});

$('#sort-rating-btn').click(function (event) {
    event.preventDefault();
    sortMoviesByRating();
});

$('#sort-genre-btn').click(function (event) {
    event.preventDefault();
    sortMoviesByGere();
});


$('#search-field').keyup(function (event) {
    let key = event.keyCode;
    let searchText = $('#search-field').val();
    if (key === 13) {
        createMovies(searchText);
    }
});

//GRAB INFO FROM SEARCH FORM
$('#search-btn').click(function() {
    let searchText = $('#search-field').val();
    createMovies(searchText);
});


// CREATE AN ARRAY OF MOVIES FROM THE SEARCH
function createMovies(searchTxt) {
    return fetch(url)
        .then(res => res.json())
        .then(movies => {
            let moviesArray = []
            if (searchTxt === "") {
                fetchAllMovies();
                return;
            }
            if (isNaN(parseInt(searchTxt))) {
                for (const movie of movies) {
                    // let splitGenre = movie.genre;
                    if (movie.title.toLowerCase().includes(searchTxt.toLowerCase())) {
                        moviesArray.push(movie);
                    }
                    if (movie.genre.toLowerCase().includes(searchTxt.toLowerCase())) {
                        moviesArray.push(movie);
                    }
                    // displayMovies(moviesArray);
                }
            } else {
                // console.log("Number");
                for (const movie of movies) {
                    if (movie.rating.includes(parseInt(searchTxt))) {
                        moviesArray.push(movie);
                    }
                }
            }
            displayMovies(moviesArray);
        })
        .catch(err => console.log(err));
}






function editMovie(movieID) {
    let updateMovie = {
        id: movieID,
        title: $('#edit-title').val(),
        director: $('#edit-director').val(),
        rating: $('#edit-rating').val(),
        year: $('#edit-year').val(),
        genre: $('#edit-genre').val()
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
        title: $('#add-title').val(),
        director: $('#add-director').val(),
        rating: $('#add-rating').val(),
        year: $('#add-year').val(),
        genre: $('#add-genre').val(),
        poster: $('#add-img-url').val()
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
    $('.movie-data-entry').children().val("");
    $('#edit-title').focus();
}