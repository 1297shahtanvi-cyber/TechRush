let packing=document.querySelectorAll(".packing .check-item input");
let pack=document.querySelector("#pack");
let docum=document.querySelectorAll(".documents .check-item input");
let doc=document.querySelector("#doc");
let money=document.querySelectorAll(".money .check-item input");
let cash=document.querySelector("#cash");
let health=document.querySelectorAll(".health .check-item input");
let fitness=document.querySelector("#fitness");
let update=document.querySelector(".progress-info p")
packing.forEach(item=>{

item.addEventListener("change",() =>
{
let count = document.querySelectorAll(".packing .check-item input:checked").length;
pack.innerText=`${count}/${packing.length}`;
updateProgress();
})
}

);

docum.forEach(item=>{

item.addEventListener("change",() =>
{
let count = document.querySelectorAll(".documents .check-item input:checked").length;
doc.innerText=`${count}/${docum.length}`;
updateProgress();
})
}

);

health.forEach(item=>{

item.addEventListener("change",() =>
{
let count = document.querySelectorAll(".health .check-item input:checked").length;
fitness.innerText=`${count}/${health.length}`;
updateProgress();
})
}

);

money.forEach(item=>{

item.addEventListener("change",() =>
{
let count = document.querySelectorAll(".money .check-item input:checked").length;
cash.innerText=`${count}/${money.length}`;
updateProgress();
})
}
);
function updateProgress() {
    let total = packing.length + docum.length + health.length + money.length;

    let completed =
        [...packing].filter(item => item.checked).length +
        [...docum].filter(item => item.checked).length +
        [...health].filter(item => item.checked).length +
        [...money].filter(item => item.checked).length;

    let percentage = Math.round((completed / total) * 100);

    // Update percentage text
    document.getElementById("overallPercent").innerText = percentage + "%";

    // Update progress ring
    document.querySelector(".progress-circle").style.background =
        `conic-gradient(#7edcff ${percentage * 3.6}deg, white ${percentage * 3.6}deg)`;

    // Update task count
    update.innerText = `${completed} of ${total} tasks completed`;
}
