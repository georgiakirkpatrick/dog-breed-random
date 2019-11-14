'use strict';

let numberOfDogs = $('select').val()

// Old function: this only works for one dog result.
// function displayResults(responseJson) {
//   console.log(responseJson);
//   //replace the existing image with the new one
//   $('.results-img').replaceWith(
//     `<img src="${responseJson.message}" class="results-img">`
//   )
//   //display the results section
//   $('.results').removeClass('hidden');
// }

// New Function: this works for many dogs results.  Also note that I got rid of the placeholder "results-img" img element and
// removed the "hidden" class from the "results" section in index.html
function displayAnotherResult(responseJson) {
    console.log(responseJson);
    //add the new image to the results
    $('.results').append(`
        <img src = ${responseJson.message} class="results-img" alt="dog">`
    )
}

// Changes to getDogImage(): replaced displayResults(responseJson) with displayAnotherResult(responseJson).  This function
// will run for the number of times requested in the select input.
function getDogImage(i) {
    console.log(`getDogImage ran and i is at ${i}` )
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(responseJson => 
        displayAnotherResult(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function dogLoop(numberOfDogs) {
    console.log(`number of dogs requested was ${numberOfDogs}`)
    for (let i = 0; i < numberOfDogs; i++) {
        getDogImage(i)
    }
}

// Removed this function in favor of submitForm()
// function watchForm() {
//   $('form').submit(event => {
//     event.preventDefault();
//     getDogImage();
//   });
// }

function submitForm() {
    $('.js-gimme-some-dogs').on('click', function() {
        console.log('form was submitted')
        event.preventDefault()
        $('.results').empty()
        numberOfDogs = $('select').val()
        $('.results').append(`<h2>Look at these dogs!</h2>`)
        dogLoop(numberOfDogs)
    })
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  submitForm()
});