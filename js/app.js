var movies = ["Cat", "Dog", "Lion", "Tiger"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

    var movie = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;
        console.log(results)

        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");
            animalImage.addClass("gif");

            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#movies-view").prepend(animalDiv);
        }
    });
}


// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("movie-btn");
        // Adding a data-attribute
        a.attr("data-name", movies[i]);
        // Providing the initial button text
        a.text(movies[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a movie button is clicked
$("#add-movie").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox

    var movie = $("#movie-input").val().trim();
        if (movie == "") {
        alert("Search field must be filled out");
        return false; 
    }

    // Adding movie from the textbox to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".movie-btn", displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

$(document).on("click", ".gif", function() {
    // This line grabs the input from the textbox

    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'data-animate');
    } else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state', "still");
    }
});
