const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const clearBtn = document.getElementById("clear-btn");

const resultsContainer = document.getElementById("results");

let travelData = null;

fetch("./travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        console.log("Data from JSON:", data);
        travelData = data;
    })
    .catch(error => console.error("Issue loading JSON:", error)
    );

searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    const query = searchInput.value.toLowerCase();
    resultsContainer.innerHTML = "";

    if(!query) return;

    resultsContainer.classList.add("active");

    if (query.includes("country") || query.includes("countries")) {
        showCountries();
    } else if (query.includes("temple")) {
        showCategory(travelData.temples);
    } else if (query.includes("beach")) {
        showCategory(travelData.beaches);
    }
});

clearBtn.addEventListener("click", function () {
    searchInput.value = "";
    resultsContainer.innerHTML = "";
});

function showCountries () {
    travelData.countries.forEach(country => {
        country.cities.forEach(city => {
            createCard(city.name, city.imageUrl, city.description);
        });
    });
}

function showCategory (category) {
    category.forEach(item => {
        createCard(item.name, item.imageUrl, item.description);
    });
}

function createCard(title, imageUrl, description) {
    const card = document.createElement("div");
    card.className = "recommendation-card";

    card.innerHTML = `
    <h3>${title}</h3>
    <img src="${imageUrl}" alt="${title}">
    <p>${description}</p>
    `;

    resultsContainer.appendChild(card);
}