// Select elements from the DOM
const tempField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchField");
const Form = document.querySelector("form");

// Default target city for weather data
let target = "chennai";

// Function to fetch weather data from the API
const fetchData = async () => {
    try {
        // API URL with the target city
        const url = `https://api.weatherapi.com/v1/current.json?key=3a5303f30ed844fb9b8122643242706&q=${target}`

        // Fetch the data from the API
        const response = await fetch(url);
        const data = await response.json();

        // Destructure the necessary data from the response
        const {
            current: {temp_c, condition: {text, icon}},
            location: {name, localtime},
        } = data;

        // Update the DOM with the fetched data
        updateDom(temp_c, name, localtime, icon, text);
    } catch (error) {
        // Alert if the location is not found
        alert("Location Not Found");
    }
}

// Function to update the DOM with the fetched weather data
const updateDom = (temp, city, time, emoji, weather) => {
    tempField.innerHTML = `${temp}°C`; // Display temperature with °C
    cityField.innerHTML = city;

    // Extract date and time from the localtime
    const exactDate = time.split(" ")[0];
    const exactTime = time.split(" ")[1];
    const exactDay = new Date(exactDate).getDay();

    // Update date field with formatted date and time
    dateField.innerHTML = `${exactTime} - ${getDayFullname(exactDay)} ${exactDate}`;
    emojiField.src = emoji; // Update weather condition image
    weatherField.innerHTML = weather; // Update weather condition text
}

// Fetch data for the default city on page load
fetchData();

// Function to get the full name of the day
const getDayFullname = (num) => {
    switch (num) {
        case 0:
           return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
           return "Saturday";
        default:
            return "Don't know";
    }
}

// Event listener for form submission
Form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form from submitting the traditional way

    // Get the city name from the search field
    const update = searchField.value;
    console.log(update);

    // Update the target city and fetch new data
    target = update;
    fetchData();
})
