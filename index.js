'use strict';

let dogBreed = $('input').val().toLowerCase()

function displayADog(responseJson) {
    console.log(responseJson);
    //add the new image to the results
    $('.results').append(`
        <img src = ${responseJson.message} class="results-img" alt="dog ">`
    )
}

// function tellUsThe(dogBreed) {
//     return $('.results').append(`<h2>Look at this ${dogBreed}!</h2>`)
// }

function tellUsThatDogBreedDoesntWork(dogBreed) {
    return $('.results').append(`<h2>Sorry, ${dogBreed} didn't work.  Either we don't have any pictures of that dog breed or
    the format entered isn't recognized.  Please try again.</h2>`)
}

function getDogImage(dogBreed) {
    console.log(`getDogImage ran` )
    fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`)
    .then(response => response.json())
    .then(responseJson => 
        displayADog(responseJson))
    .catch(error => alert("Something went wrong.  Please try again."))
}

function submitForm() {
    $('.js-gimme-a-dog').on('click', function() {
        console.log('form was submitted')
        event.preventDefault()
        $('.results').empty()
        dogBreed = $('input').val().toLowerCase()
        $('.results').append(`<h2>Look at this ${dogBreed}!</h2>`)
        getDogImage(dogBreed)
        // $('input').empty()
    })
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  submitForm()
});