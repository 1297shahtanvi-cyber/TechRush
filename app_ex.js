const tabs = document.querySelectorAll(".tab");
const selects = document.querySelectorAll("select[data-field]");

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

// ---------------------------------------------------------------------------------

let placesData = [];

// Load JSON file
fetch("dataset.json")
  .then((res) => res.json())
  .then((data) => {
    placesData = data;
    console.log("Data loaded:", placesData);
  })
  .catch((err) => console.error("Error loading JSON:", err));

function getUserInput() {
  return {
    season: "Winter",
    type: "Beach",
    days: "3-4 Days",
    activities: ["Water sports"],
  };
}

function convertDays(daysText) {
  if (!daysText) return 0;

  if (daysText.includes("1-2")) return 2;
  if (daysText.includes("3-4")) return 4;
  if (daysText.includes("5-7")) return 7;
  if (daysText.includes("8-10")) return 10;
  if (daysText.includes("10+")) return 12;

  return 0;
}

//MULTIPLE CARDS
function filterData(userInput) {
  return placesData.filter((place) => {
    // ✅ Best Season Match
    let matchBestSeason =
      !userInput.season ||
      (place.best_seasons && place.best_seasons.includes(userInput.season));

    // ✅ Avoidable Season (should NOT match)
    let avoidSeason =
      userInput.season &&
      place.avoidable_seasons &&
      place.avoidable_seasons.includes(userInput.season);

    // ✅ Best For (Couple / Friends / Family)
    let matchBestFor =
      !userInput.group ||
      (place.best_for && place.best_for.includes(userInput.group));

    // ✅ Type Match (Beach, Adventure etc.)
    let matchType =
      !userInput.type ||
      (place.trip_types && place.trip_types.includes(userInput.type));

    // ✅ State Match
    let matchState =
      !userInput.state ||
      (place.state &&
        place.state.toLowerCase() === userInput.state.toLowerCase());

    // ✅ Final condition
    return (
      matchBestSeason &&
      !avoidSeason && // important ❗
      matchBestFor &&
      matchType &&
      matchState
    );
  });
}

function displayResults(results) {
  let container = document.getElementById("results");
  container.innerHTML = "";

  if (results.length === 0) {
    container.innerHTML = "<p>No places found 😢</p>";
    return;
  }

  results.forEach((place) => {
    let budget = place.budget_category?.total_daily_range || [0, 0];

    container.innerHTML += `
      <div class="card">

        <h2>${place.destination_name}</h2>

        <p><b>Season:</b></p>
        ${place.best_seasons.map((s) => `<span class="tag">${s}</span>`).join("")}

        <p><b>Type:</b></p>
        ${place.trip_types.map((t) => `<span class="tag">${t}</span>`).join("")}

        <p><b>Activities:</b></p>
        ${place.activities_available.map((a) => `<span class="tag">${a}</span>`).join("")}

        <p><b>Days:</b> ${place.ideal_days}</p>

        <!-- <p><b>Budget:</b> ₹${budget[0]} - ₹${budget[1]}</p> -->

        <!-- <p><b>Itinerary:</b><br>${place.suggested_itinerary}</p> -->

      </div>
    `;
  });
}

document.querySelector(".search-btn").addEventListener("click", () => {
  let userInput = getUserInput();
  let filtered = filterData(userInput);
  displayResults(filtered);
});
