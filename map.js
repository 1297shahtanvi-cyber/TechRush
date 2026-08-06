import { DESTINATIONS } from "./data.js";

const map = L.map("map").setView([22.9734, 78.6569], 4);

L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
    {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: "abcd",
        maxZoom: 20,
        minZoom: 3
    }
).addTo(map);

// function getCrowdColor(crowd) {
//   if (crowd === "Green") {
//     return "#2ecc71";
//   }

//   if (crowd === "Yellow") {
//     return "#f1c40f";
//   }

//   if (crowd === "Red") {
//     return "#e74c3c";
//   }

//   return "#7edcff";
// }

// DESTINATIONS.forEach(place => {
//     const colour=getCrowdColor(place.crowd);
//     L.marker([place.lat, place.lng])
//         .addTo(map)
//         .bindPopup(`
//             <b>${place.name}</b><br>
//             ${place.state}
//         `);
// });

function getCrowdColor(crowd) {
  if (crowd === "Green") {
    return "green";
  }

  if (crowd === "Yellow") {
    return "gold";
  }

  if (crowd === "Red") {
    return "red";
  }

  return "blue";
}

DESTINATIONS.forEach(place => {

  const colour = getCrowdColor(place.crowd);

  L.marker(
    [place.lat, place.lng],
    {
      icon: L.divIcon({
        html: `<i class="fa-solid fa-location-dot" 
                    style="color:${colour}; font-size:18px;">
               </i>`,
        className: "",
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      })
    }
  )
  .addTo(map)
  .bindPopup(`
    <b>${place.name}</b><br>
    ${place.state}
  `);

});

const searchInput = document.getElementById("placeSearch");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {

  const searchValue = searchInput.value.trim().toLowerCase();

  const place = DESTINATIONS.find(place =>
    place.name.toLowerCase() === searchValue
  );

  if (place) {

    map.setView([place.lat, place.lng], 8);

    L.popup()
      .setLatLng([place.lat, place.lng])
      .setContent(`
        <b>${place.name}</b><br>
        ${place.state}
      `)
      .openOn(map);

  } else {
    alert("Place not found");
  }

});

