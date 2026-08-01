let sent1 = document.querySelector("#sent1");
const text = [
  "Extraordinary Journeys, Perfectly Crafted!",
  "Adventure Starts With a Click!",
  "Where Every Journey Begins!",
];
let i = 0;
timer();
function timer() {
  setInterval(() => {
    sent1.innerText = text[i];
    i = (i + 1) % text.length;
  }, 5000);
}

// let places = document.querySelectorAll(".places");
// let infoBox = document.querySelectorAll("#infoBox");

const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

const placeInfo = {
  places1: {
    name: "Taj Mahal",
    famous:
      "A UNESCO World Heritage Site and symbol of love, renowned for its stunning white marble architecture.",
    rating: 4.9,
  },

  places2: {
    name: "Rann of Kutch",
    famous:
      "The world's largest salt desert, famous for the Rann Utsav, cultural performances, and breathtaking white landscapes.",
    rating: 4.8,
  },

  places3: {
    name: "Goa",
    famous:
      "Known for its beautiful beaches, Portuguese heritage, vibrant nightlife, and delicious seafood.",
    rating: 4.8,
  },

  places4: {
    name: "Chhatrapati Shivaji Maharaj Terminus (CSMT)",
    famous:
      "A UNESCO World Heritage railway station in Mumbai, celebrated for its Victorian Gothic architecture.",
    rating: 4.7,
  },

  places5: {
    name: "Ellora Caves",
    famous:
      "Ancient rock-cut caves featuring remarkable Buddhist, Hindu, and Jain monuments, including the Kailasa Temple.",
    rating: 4.9,
  },

  places6: {
    name: "Nalanda",
    famous:
      "Home to one of the world's oldest universities and an important center of ancient learning and Buddhism.",
    rating: 4.6,
  },

  places7: {
    name: "Golden Temple",
    famous:
      "The holiest Sikh shrine in Amritsar, admired for its golden structure and peaceful atmosphere.",
    rating: 5.0,
  },

  places8: {
    name: "Hawa Mahal",
    famous:
      "Known as the 'Palace of Winds', this Jaipur landmark features 953 beautifully designed windows.",
    rating: 4.7,
  },

  places9: {
    name: "Ooty",
    famous:
      "A charming hill station famous for tea gardens, scenic mountains, pleasant weather, and the Nilgiri Mountain Railway.",
    rating: 4.7,
  },

  places10: {
    name: "Ganga Aarti, Rishikesh",
    famous:
      "A mesmerizing evening prayer ceremony on the banks of the Ganges, attracting pilgrims and tourists alike.",
    rating: 4.9,
  },

  places11: {
    name: "Meghalaya",
    famous:
      "Known as the 'Abode of Clouds', it is famous for living root bridges, waterfalls, caves, and lush greenery.",
    rating: 4.8,
  },

  places12: {
    name: "Jagannath Temple",
    famous:
      "A sacred Hindu temple in Puri, renowned for the annual Rath Yatra and its magnificent spiritual significance.",
    rating: 4.9,
  },
};

const places = document.querySelectorAll(".places");
const infoBox = document.querySelector(".infoBox");

places.forEach((place) => {
  place.addEventListener("mouseenter", () => {
    const data = placeInfo[place.id];
    console.log(data);
    div = document.createElement("div");
    div.innerHTML = `
            <h3>${data.name}</h3>
             <br>
            <p>${data.famous}</p>
            <br>
           <p>Rating: ${data.rating}</p>
        `;
    div.style.background = "rgba(43, 30, 30, 0.7)";
    div.style.color = "white";
    div.style.position = "absolute";
    div.style.left = "0";
    div.style.right = "0";
    div.style.bottom = "0";
    div.style.padding = "1rem";
    div.style.boxSizing = "border-box";
    div.style.borderRadius = "13% 13% 0 0";

    place.appendChild(div);
  });
  place.addEventListener("mouseleave", () => {
    place.innerHTML = "";
  });
});

let web = document.querySelector("#web");
let j = 0;
web_name = "#Traveller";
function typefun() {
  if (j < web_name.length) {
    web.innerText = web.innerText + web_name.charAt(j);

    j++;
    setTimeout(typefun, 200);
  }
}
typefun();
