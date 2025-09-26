const countriesContainer = document.getElementById("countries");
const searchInput = document.getElementById("search");
const modeToggle = document.getElementById("modeToggle");

// API dan ma'lumot olish
async function getCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags");
  const data = await res.json();
  displayCountries(data);
  return data;
}

// Davlatlarni chiqarish
function displayCountries(countries) {
  countriesContainer.innerHTML = "";
  countries.forEach(country => {
    const card = document.createElement("div");
    card.classList.add("country");

    card.innerHTML = `
      <img src="${country.flags.png}" alt="${country.name.common}">
      <h3>${country.name.common}</h3>
    `;
    countriesContainer.appendChild(card);
  });
}

// Search funksiyasi
searchInput.addEventListener("input", async (e) => {
  const value = e.target.value.toLowerCase();
  const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags");
  const data = await res.json();
  const filtered = data.filter(c =>
    c.name.common.toLowerCase().includes(value)
  );
  displayCountries(filtered);
});

// Dark / Light mode
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    modeToggle.textContent = "Dark Mode";
  } else {
    modeToggle.textContent = "Light Mode";
  }
});

// Start
getCountries();
