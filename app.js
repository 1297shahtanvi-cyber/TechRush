const text = [
  "Extraordinary Journeys,Perfectly Crafted!",
  "Unforgettable Journeys, Beautifully Planned!",
  "Remarkable Destinations, Perfectly Chosen!!"
];
let i = 0;

function timer()
{
setInterval(()=>{
    sent1.innerText=text[i];
    i=(i+1)%text.length;
},4000
)}

timer();
// const more = document.getElementById("more");

// more.addEventListener("change", function () {
//     if (this.value !== "") {
//         window.location.href = this.value;
//     }
// });

const placeInfo = {
  places1: {
    name: "Taj Mahal",
    famous:
      "A UNESCO World Heritage Site and symbol of love, renowned for its stunning white marble architecture.",
    rating: 4.9
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

// let web = document.querySelector("#web");
// let j = 0;
// web_name = "Excurso";
// function typefun() {
//   if (j < web_name.length) {
//     web.innerText = web.innerText + web_name.charAt(j);

//     j++;
//     setTimeout(typefun, 200);
//   }
// }
// typefun();

const sections=document.querySelectorAll("section");
const navlinks=document.querySelectorAll(".menu a");

const currentPage = window.location.pathname.split("/").pop();

// Only run on homepage
if (currentPage === "" || currentPage === "index.html") {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navlinks.forEach(link => {
                    link.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `.menu a[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }

        });

    }, {
        threshold: 0.4
    });

    sections.forEach(section => observer.observe(section));
}

// Highlight Checklist page
if (currentPage === "checklist.html") {
    document.querySelector('.menu a[href="checklist.html"]')
        ?.classList.add("active");
}

// Highlight Map page
if (currentPage === "map.html") {
    document.querySelector('.menu a[href="map.html"]')
        ?.classList.add("active");
}

// ----------------------------budget-------------------------------------------------


function toList(text) {
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/#/g, "")
    .replace(/₹\s+(\d+)/g, "₹$1")
    .split("\n") // ✅ ONLY split by line
    .filter((item) => item.trim() !== "")
    .map((item) => `<li>${item.trim()}</li>`)
    .join("");
}

async function getPlan() {
  const data = {
    
    place: document.getElementById("place").value,
    days: document.getElementById("days").value,
    people: document.getElementById("people").value,
    type: document.getElementById("type").value,
  };
  const btn=document.querySelector("#budget-planner button");

btn.disabled=true;

btn.innerHTML="⏳ Generating...";

  const budgetBox = document.getElementById("budget");
  const itineraryBox = document.getElementById("itinerary");
  const resultsGrid = document.querySelector(".results-grid");
  const budgetHeading = document.querySelector(
    ".results-panel .result-heading",
  );
  const itineraryHeading = document.querySelectorAll(
    ".results-panel .result-heading",
  )[1];

 

  resultsGrid.hidden = true;
  budgetBox.hidden = true;
  itineraryBox.hidden = true;
  budgetHeading.hidden = true;
  itineraryHeading.hidden = true;

  try {
    // 💰 Budget API Call
    const budgetRes = await fetch("http://localhost:3000/budget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const budgetData = await budgetRes.json();

    // 🗺️ Itinerary API Call (✅ MOVE THIS UP)
    const itiRes = await fetch("http://localhost:3000/itinerary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const itiData = await itiRes.json();

    // ✅ SAFETY CHECK (NOW CORRECT)
    if (!budgetData.result || !itiData.result) {
      alert("⚠️ No data received from API. Check backend or API key.");
      return;
    }

    // 💰 CLEAN BUDGET
    const cleanBudget = budgetData.result
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/₹\s+(\d+)/g, "₹$1");

    const budgetItems = cleanBudget
  .split("\n")
  .filter(x => x.trim());

let budgetCards="";

budgetItems.forEach(item=>{

const parts=item.split(":");

budgetCards+=`

<div class="budget-card">

<h4>${parts[0]}</h4>

<p>${parts[1]||""}</p>

</div>

`;

});

budgetBox.innerHTML=budgetCards;

    // 🗺️ CLEAN ITINERARY
    const cleanItinerary = itiData.result
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/₹\s+(\d+)/g, "₹$1");

    const days = cleanItinerary
      .split(/Day\s*\d+[:\-]?/i)
      .filter((d) => d.trim());

    let cards = "";

    days.forEach((day, index) => {
      let items = day
        .split("\n")
        .filter((x) => x.trim() !== "")
        .slice(0, 3); // ✅ LIMIT to 3 items ONLY

      cards += `
    <div class="card">
      <h4>🗓 Day ${index + 1}</h4>
      <ul>
        ${items.map((i) => `<li>${i}</li>`).join("")}
      </ul>
    </div>
  `;
    });

    itineraryBox.innerHTML = cards;
    resultsGrid.hidden = false;
    budgetBox.hidden = false;
    itineraryBox.hidden = false;
    budgetHeading.hidden = false;
    itineraryHeading.hidden = false;

    btn.innerHTML = "✅ Plan Ready";

setTimeout(() => {
  btn.innerHTML = "🚀 Generate Plan";
  btn.disabled = false;
}, 2000);

    document.querySelector(".results-grid").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } catch (err) {
    console.error("Frontend Error:", err);
  }
}