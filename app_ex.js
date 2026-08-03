console.log("hello");
const tabs = document.querySelectorAll(".tab");
const selects = document.querySelectorAll("select[data-field]");
const back = document.querySelector(".back");

function setActiveTab(field) {
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === field);
  });
}

function updateSelectHighlight() {
  selects.forEach((select) => {
    const selected = select.value;
    select.classList.toggle("filled", Boolean(selected));
  });
}

selects.forEach((select) => {
  select.addEventListener("focus", () => {
    setActiveTab(select.dataset.field);
  });

  select.addEventListener("change", () => {
    setActiveTab(select.dataset.field);
    updateSelectHighlight();
  });
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveTab(tab.dataset.tab);
    const targetSelect = document.querySelector(
      `select[data-field="${tab.dataset.tab}"]`,
    );
    if (targetSelect) {
      targetSelect.focus();
    }
  });
});

updateSelectHighlight();
 
import { DESTINATIONS } from "./data.js";
//to filter places 
const search=document.querySelector(".search-btn");
search.addEventListener("click",findPlaces);
function findPlaces() {
    const season = document.getElementById("season").value;
    const type = document.getElementById("type").value;
    const crowd = document.getElementById("crowd").value;
    
    const result = DESTINATIONS.filter(destination => {
      
    return (
        destination.weather === season &&
        destination.type === type &&
        destination.crowd === crowd
    );
    
});
    displayPlaces(result);
    console.log(result);
}

function displayPlaces(places) {
    
    const resultsContainer = document.getElementById("results");
    
    // Remove previous results
    resultsContainer.innerHTML = "";

    if (places.length === 0) {
        alert("Please fill every Detail")
        return;
    }

    places.forEach(place => {
        
        const card = document.createElement("div");

        card.classList.add("place-card");
        card.style.width="300px";
        card.style.height="300px";
        card.innerHTML = `
            <h2>${place.name}</h2>
            <p>${place.state}</p>
            <p>${place.tagline}</p>
            <p>Best time: ${place.best}</p>
            <p>Budget: ${place.budget}</p>
        `;
    //     card.style.backgroundImage="url('images/card.png')";
    //    card.style.backgroundSize="cover";
        resultsContainer.appendChild(card);
        
        resultsContainer.scrollIntoView({
        behavior: "smooth",
        block: "start"
        });
    });
}

// to filter options
const weatherSelect = document.querySelector("#season");
const typeSelect = document.querySelector("#type");
const crowdSelect = document.querySelector("#crowd");

weatherSelect.addEventListener("change", function () {

    const selectedWeather = weatherSelect.value;
    const filteredPlaces = DESTINATIONS.filter(place => {
        return place.weather === selectedWeather;
    });
    const types = [...new Set(
        filteredPlaces.map(place => place.type)
    )];
    
    typeSelect.innerHTML =
        '<option value="" selected disabled>Choose Type</option>';

    crowdSelect.innerHTML =
        '<option value="" selected disabled>Choose Crowd</option>';

    types.forEach(type => {

        const option = document.createElement("option");

        option.value = type;
        option.textContent = type;

        typeSelect.appendChild(option);
    });
});

typeSelect.addEventListener("change", function () {

    const selectedWeather = weatherSelect.value;
    const selectedType = typeSelect.value;

    const filteredPlaces = DESTINATIONS.filter(place => {
        return place.weather === selectedWeather &&
               place.type === selectedType;
    });

    const crowds = [...new Set(
        filteredPlaces.map(place => place.crowd)
    )];

    crowdSelect.innerHTML =
        '<option value="" selected disabled>Choose Crowd</option>';

    crowds.forEach(crowd => {

        const option = document.createElement("option");

        option.value = crowd;
        option.textContent = crowd;

        crowdSelect.appendChild(option);
    });
});


back.addEventListener("click", () => {
    window.close();
});


