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
