// Importing the DOM structure of the photographer card
import { createUserCard } from "../templates/photographerCard.js";

// Fetching the data of the photographers from the JSON file
async function getPhotographers() {
  return await fetch("./data/photographers.json").then((response) =>
    response.json()
  );
}

// Displaying the photographers on the main page

async function displayPhotographers(photographers) {
  const sectionPhotographers = document.querySelector(".photographers");
  photographers.forEach((photographer) => {
    const photographerCard = createUserCard(photographer);
    const getUserCardDOM = photographerCard.getUserCardDOM();
    sectionPhotographers.appendChild(getUserCardDOM);
  });
}

//Initializing the main page with the photographers data

async function init() {
  const { photographers } = await getPhotographers();
  displayPhotographers(photographers);
}

init();
