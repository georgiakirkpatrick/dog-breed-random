'use strict';

let dogBreed = $('input').val().toLowerCase()
// Defines the user-input dogbreed.

function displayADog(responseJson) {
    // This function runs after getDogImage(dogBreed).  If errors are returned, an error message is displayed.
    // If no errors are returned, a dog image is displayed.   
    console.log('response', responseJson);
    if (responseJson.status === "error") {
        console.log('displayADog(responseJson) if statement ran')

        if (responseJson.message === "Breed not found (master breed does not exist)") {
        // Message to user if the master breed is not found.
            console.log('Problem with master breed entry')
            $('.results').append(`<h2>Sorry, that didn't work.</h2>
            <h2>For two-word searches, try this format: Retriever/Golden</h2>`)
        }

        else if (responseJson.message === "Breed not found (sub breed does not exist)") {
        // Message to user if the sub-breed is not found.
            console.log('Problem with sub-breed entry')
            $('.results').append(`<h2>Sorry, we don't have any photos of that sub-breed. Please
            search for a different dog breed.</h2>`)
        }

        else {console.log('Unknown error')
        // Message to user if they encounter an error other than the two above.
            $('.results').append(`<h2>Sorry, that didn't work.</h2>
            <h2>Either we don't have any photos of that breed or there's something else going on.  
            Please try again.</h2>`)
        }
    }

    else {
    // If there are no errors, the dog image is added to the results.
        console.log('Breed was found!')
        $('.results').append(`<h2>Look at this ${dogBreed}!</h2>`)
        $('.results').append(`<img src = ${responseJson.message} class = "results-img" alt = "dog">`)
    }
}

function getDogImage(dogBreed) {
    // This function fetches a dog image from dog.ceo API.
    console.log(`getDogImage ran`)
    fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`)
        .then(response => response.json())
        .then(responseJson => 
            displayADog(responseJson))
        .catch(error => {
            console.log("There is an error.")
        }) 
}

function submitForm() {
    // This function runs when the form is submitted.  It sends the user an alert if they submit the
    // form with nothing in the input field.  Otherwise, it converts the entry to lowercase text so 
    // that it will work with dog.ceo's API.  Then it triggers the getDogImage function.
    $('.js-gimme-a-dog').on('click', function() {
        console.log('form was submitted')
        event.preventDefault()
        if (!$("input[name='dog-breed']").val()) {
            alert('Please enter a dog breed.')
        }

        else {
            $('.results').empty()
            dogBreed = $('input').val().toLowerCase()
            getDogImage(dogBreed)
        }
              
        
    })
}

$(function() {
// This function makes all the JavaScript functions work.
  console.log('App loaded! Waiting for submit!');
  submitForm()
});