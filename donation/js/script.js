// Slide up account menu

document.addEventListener("DOMContentLoaded", () => {
  const accountBtn = document.getElementById("accountBtn");
  const accountMenu = document.getElementById("accountMenu");
  const backdrop = document.getElementById("backdrop");
  const closeMenu = document.getElementById("closeMenu");

  function openMenu() {
    accountMenu.classList.remove("translate-y-full");
    backdrop.classList.remove("hidden");
  }

  function closeAccountMenu() {
    accountMenu.classList.add("translate-y-full");
    backdrop.classList.add("hidden");
  }

  if (accountBtn) accountBtn.addEventListener("click", openMenu);
  if (closeMenu) closeMenu.addEventListener("click", closeAccountMenu);
  if (backdrop) backdrop.addEventListener("click", closeAccountMenu);
});


// Search page Sample data
// Sample data
const foodData = [
  { id: 1, name: "Rice", category: "Food item", offer: "2 bag of rice", Donor: "Food/Aid", location: "Lagos - 400m", date: "Today", message: "Donating 2 bags of rice, give good reasons and please in few sentences", verified: true },
  { id: 2, name: "Tractor", category: "Equipment", offer: "Old tractor 1998 Model", Donor: "Micro Farms", location: "Lagos - 1.2km", date: "Today", message: "I can trade more onion for more rice but minimum 8 cups of rice please", verified: false },
  { id: 3, name: "Fertilizer", category: "Fertilizers", offer: "poultry fertilizers", Donor: "Zinco Food stucks", location: "Lagos - 800m", date: "Yesterday", message: "Looking for beans only. Prefer organic if available", verified: true },
  { id: 4, name: "Beans", category: "grains", offer: "4 cups of Beans", want: "1 Tubers of Yam", location: "Lagos - 2km", date: "This Week", message: "Flexible swap, reach out if interested", verified: false }
];

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const suggestions = document.getElementById("suggestions");
const results = document.getElementById("results");
const noResults = document.getElementById("noResults");
const filters = document.getElementById("filters");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");

// Render results
function renderResults(data) {
  results.innerHTML = "";
  if (data.length === 0) {
    results.classList.add("hidden");
    noResults.classList.remove("hidden");
    return;
  }
  noResults.classList.add("hidden");
  results.classList.remove("hidden");

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "dark:bg-gray-800 dark:text-white rounded-lg p-3 mb-3 transition shadow-deep dark:shadow-none";

    card.innerHTML = `
      <div class="flex gap-3 dark:text-white py-4 px-4">
        <img 
    src="../img/rice/bags-of-rice.jpg" 
    alt="Food Item" 
    class="w-24 h-24 object-cover rounded-lg mb-3"
  />
        <div class="flex-grow">
          <p><span class="font-bold mt-2 text-blue-500 font-bold">${item.offer} </span> 
            ${item.verified ? '<span class="text-green-600 text-xs ml-2 dark:text-green-700">✔</span>' : ""}
          </p>
          <p class="mt-2"><span class="font-bold mt-2 text-green-700">Donor:</span> ${item.Donor}</p>
          <p class="text-xs text-blue-500 opacity-70 mt-2">📍 ${item.location} · 🗓️ ${item.date}</p>
          
        </div>
      </div>
<p class="font-Kodchasan text-xl dark:text-white mt-2"><span class="font-bold mt-2 text-blue-500">Message:</span> ${item.message}</p>

      <div class="flex justify-between mt-3">

        <button class="cancelBtn hidden border border-gray-300 text-red-300 px-3 py-1 rounded text-sm font-light">Cancel</button>
        <button class="sendBtn bg-green-600 text-white px-3 py-1 rounded text-sm ml-auto">Send Request</button>
      </div>
    `;

    const sendBtn = card.querySelector(".sendBtn");
    const cancelBtn = card.querySelector(".cancelBtn");

    sendBtn.addEventListener("click", () => {
      card.classList.add("bg-green-50", "dark:bg-green-900");
      sendBtn.textContent = "Sent";
      sendBtn.disabled = true;
      cancelBtn.classList.remove("hidden");
    });

    cancelBtn.addEventListener("click", () => {
      card.classList.remove("bg-green-50", "dark:bg-green-900");
      sendBtn.textContent = "Send Request";
      sendBtn.disabled = false;
      cancelBtn.classList.add("hidden");
    });

    results.appendChild(card);
  });
}

// Search function
function searchFood(query) {
  const filtered = foodData.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );
  renderResults(filtered);
  filters.classList.remove("hidden");
}

// Update filters
function updateFilters() {
  let filtered = [...foodData];
  const category = categoryFilter.value;
  const sort = sortFilter.value;

  if (category) filtered = filtered.filter(item => item.category === category);

  if (sort === "recent") filtered = filtered.reverse();
  if (sort === "verified") filtered = filtered.filter(item => item.verified);

  renderResults(filtered);
}

// Event listeners
searchBtn.addEventListener("click", () => {
  if (searchInput.value.trim() === "") return;
  searchFood(searchInput.value.trim());
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && searchInput.value.trim() !== "") {
    searchFood(searchInput.value.trim());
  }
});

// Suggestions
searchInput.addEventListener("input", () => {
  const value = searchInput.value.trim().toLowerCase();
  if (!value) {
    suggestions.classList.add("hidden");
    return;
  }
  const matches = foodData.filter(item => item.name.toLowerCase().includes(value));
  suggestions.innerHTML = "";
  matches.forEach(item => {
    const li = document.createElement("li");
    li.className = "px-3 py-2 hover:bg-green-100 cursor-pointer";
    li.textContent = item.name;
    li.addEventListener("click", () => {
      searchInput.value = item.name;
      suggestions.classList.add("hidden");
      searchFood(item.name);
    });
    suggestions.appendChild(li);
  });
  suggestions.classList.remove("hidden");
});

categoryFilter.addEventListener("change", updateFilters);
sortFilter.addEventListener("change", updateFilters);


