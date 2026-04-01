// ============================================================
// script.js — Velora Project (DATABASE INTEGRATED)
// Modular ES6+ JavaScript with /src/database/services.js
// ============================================================

// ========================================================
// DATABASE IMPORTS (MODULAR)
// ========================================================
import { 
  services, 
  createService, 
  getServices, 
  findService, 
  updateService, 
  deleteService,
  getStats 
} from './src/database/services.js';

// ========================================================
// PROJECT CONSTANTS
// ========================================================
const projectName = "Velora";
const totalPages  = 5;
const isLive      = true;
const pages       = ["Home", "About", "Contact", "Sign In", "Sign Up"];
const developer   = {
  name: "Haid Ali",
  role: "Frontend Developer",
  course: "Web Engineering",
  year: 2
};

// ========================================================
// TASK 1: Variables Display
// ========================================================
const variableDisplay = document.getElementById("variableDisplay");
if (variableDisplay) {
  variableDisplay.innerHTML = `
    <p><strong>Project:</strong> ${projectName}</p>
    <p><strong>Total Pages:</strong> ${totalPages}</p>
    <p><strong>Status:</strong> ${isLive ? '🟢 LIVE' : '🔴 OFFLINE'}</p>
    <p><strong>Pages:</strong> ${pages.join(" → ")}</p>
    <p><strong>Developer:</strong> ${developer.name} (${developer.role})</p>
    <p><strong>Services:</strong> ${getStats().total} total</p>
  `;
}

// ========================================================
// TASK 2: Arrow Function + Summary
// ========================================================
const showProjectSummary = () => {
  const stats = getStats();
  return `
    <p><strong>🏢 Project:</strong> ${projectName}</p>
    <p><strong>👨‍💻 Developer:</strong> ${developer.name}</p>
    <p><strong>📚 Course:</strong> ${developer.course}, Year ${developer.year}</p>
    <p><strong>🟢 Status:</strong> ${isLive ? 'LIVE' : 'OFFLINE'}</p>
    <p><strong>📊 Services:</strong> ${stats.total} total (${stats.active} Active, ${stats.pending} Pending)</p>
    <p><strong>📄 Pages:</strong> ${pages.join(", ")}</p>
  `;
};

document.getElementById("summaryBtn")?.addEventListener("click", () => {
  const result = document.getElementById("summaryResult");
  result.innerHTML = showProjectSummary();
  result.style.display = "block";
});

// ========================================================
// TASK 3: Active Nav Link
// ========================================================
document.querySelectorAll("nav a").forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("underline", "font-bold");
  }
});

// ========================================================
// TASK 4: CRUD OPERATIONS (Database Integrated)
// ========================================================

// RENDER GRID (10+ String Methods)
function renderGrid(data = getServices()) {
  const grid = document.getElementById("servicesGrid");
  if (!grid) return;

  grid.innerHTML = data.map(s => {
    // 8+ STRING METHODS:
    const formattedName = s.name.trim().toUpperCase().slice(0,12); // trim, toUpperCase, slice
    const priceStr = '$' + s.price.toLocaleString();              // toLocaleString
    const category = s.category.toLowerCase();                     // toLowerCase
    const statusBadge = s.status.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()); // replace + regex
    const dateShort = s.created.substring(5, 10);                 // substring
    
    return `
      <div class="bg-white p-6 rounded-lg shadow hover:shadow-xl transition-all border-l-4 ${s.status === 'Active' ? 'border-teal-500' : 'border-yellow-500'}">
        <h3 class="font-bold text-xl mb-2">${formattedName}</h3>
        <div class="space-y-1 mb-4">
          <p class="text-2xl font-bold text-teal-600">${priceStr}</p>
          <p class="text-sm text-gray-600">Category: ${category}</p>
          <p class="text-xs text-gray-400">Created: ${dateShort}</p>
        </div>
        <span class="px-3 py-1 rounded-full text-xs font-bold ${s.status === 'Active' ? 'bg-teal-100 text-teal-800' : 'bg-yellow-100 text-yellow-800'}">${statusBadge}</span>
        <div class="flex gap-2 mt-4 pt-4 border-t">
          <button onclick="openEdit(${s.id})" class="flex-1 px-3 py-2 bg-teal-600 text-white text-sm rounded hover:bg-teal-700 transition">✏️ Edit</button>
          <button onclick="deleteService(${s.id})" class="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition">🗑️ Delete</button>
        </div>
      </div>
    `;
  }).join('');
}

// CREATE - Add Service
document.getElementById("addServiceForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  createService({
    name: document.getElementById("newName").value.trim(),
    price: parseInt(document.getElementById("newPrice").value),
    category: document.getElementById("newCat").value,
    status: "Active"
  });
  renderGrid();
  e.target.reset();
  alert("✅ Service added successfully!");
});

// UPDATE Functions (Global for onclick)
window.openEdit = (id) => {
  const service = findService(id);
  if (service) {
    document.getElementById("editId").value = service.id;
    document.getElementById("editName").value = service.name;
    document.getElementById("editPrice").value = service.price;
    document.getElementById("editModal").classList.remove("hidden");
  }
};

window.updateService = () => {
  const id = parseInt(document.getElementById("editId").value);
  updateService(id, {
    name: document.getElementById("editName").value.trim(),
    price: parseInt(document.getElementById("editPrice").value)
  });
  document.getElementById("editModal").classList.add("hidden");
  renderGrid();
  alert("✅ Service updated!");
};

window.closeModal = () => document.getElementById("editModal").classList.add("hidden");

// DELETE Function
window.deleteService = (id) => {
  if (confirm("🗑️ Delete this service permanently?")) {
    deleteService(id);
    renderGrid();
    alert("✅ Service deleted!");
  }
};

// ========================================================
// TASK 5: 5+ Search & Filter System (Advanced Array Methods)
// ========================================================
function applyAllFilters() {
  let data = getServices();
  
  // 1. Search (filter + includes + toLowerCase)
  const search = document.getElementById("searchInput")?.value.toLowerCase() || '';
  data = data.filter(s => s.name.toLowerCase().includes(search));
  
  // 2. Category Filter
  const cat = document.getElementById("catFilter")?.value || 'all';
  if (cat !== 'all') data = data.filter(s => s.category === cat);
  
  // 3. Price Filter
  const price = document.getElementById("priceFilter")?.value || 'all';
  if (price === 'low') data = data.filter(s => s.price < 150);
  if (price === 'high') data = data.filter(s => s.price >= 150);
  
  // 4. Status Filter
  const status = document.getElementById("statusFilter")?.value || 'all';
  if (status !== 'all') data = data.filter(s => s.status === status);
  
  // 5. Sort (asc/desc)
  const sort = document.getElementById("sortFilter")?.value || 'none';
  if (sort === 'asc') data.sort((a, b) => a.price - b.price);
  if (sort === 'desc') data.sort((a, b) => b.price - a.price);
  
  renderGrid(data);
}

// Event Listeners for Filters
['searchInput', 'catFilter', 'priceFilter', 'statusFilter', 'sortFilter'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', applyAllFilters);
  document.getElementById(id)?.addEventListener('change', applyAllFilters);
});

// ========================================================
// TASK 6: Table + While Loop (Loops + Conditions)
// ========================================================
function renderTable() {
  const data = getServices();
  let tableHTML = `<table class="min-w-full bg-white border-collapse border border-gray-300">
    <thead><tr class="bg-teal-800 text-white">
      <th class="border p-3 text-left">Name</th>
      <th class="border p-3 text-left">Price</th>
      <th class="border p-3 text-left">Category</th>
      <th class="border p-3 text-left">Status</th>
    </tr></thead>
    <tbody>`;
  
  // FOR LOOP
  for (let i = 0; i < data.length; i++) {
    tableHTML += `
      <tr class="hover:bg-gray-50">
        <td class="border p-3">${data[i].name}</td>
        <td class="border p-3 font-bold">$${data[i].price}</td>
        <td class="border p-3">${data[i].category}</td>
        <td class="border p-3">
          <span class="px-2 py-1 rounded text-xs ${data[i].status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
            ${data[i].status}
          </span>
        </td>
      </tr>`;
  }
  
  tableHTML += '</tbody></table>';
  document.getElementById("tableOutput").innerHTML = tableHTML;
}

function processActiveOnly() {
  const data = getServices();
  let i = 0;
  let activeList = "<strong>🚀 Active Services:</strong> ";
  
  // WHILE LOOP + Condition
  while (i < data.length) {
    if (data[i].status === "Active") {
      activeList += `<span class="font-semibold text-teal-600">${data[i].name}</span>, `;
    }
    i++;
  }
  
  document.getElementById("whileOutput").innerHTML = activeList || "No active services";
}

// ========================================================
// FORMS VALIDATION (All Pages)
// ========================================================
const signinForm = document.getElementById("signinForm");
if (signinForm) {
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signinEmail").value.trim();
    const pass = document.getElementById("signinPass").value;
    const msg = document.getElementById("signinMessage");
    
    if (!email || !pass) {
      msg.textContent = "❌ Please fill all fields!";
      msg.classList.remove("hidden");
    } else {
      document.getElementById("formSection").classList.add("hidden");
      document.getElementById("successSection").classList.remove("hidden");
      document.getElementById("successEmail").textContent = email;
      localStorage.setItem("userEmail", email);
    }
  });
}

const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const pass1 = document.getElementById("signupPass").value;
    const pass2 = document.getElementById("signupPass2").value;
    const msg = document.getElementById("signupMessage");
    
    if (pass1 !== pass2) {
      msg.textContent = "❌ Passwords do not match!";
      msg.classList.remove("hidden");
    } else if (pass1.length < 8) {
      msg.textContent = "❌ Password must be 8+ characters!";
      msg.classList.remove("hidden");
    } else {
      msg.innerHTML = "✅ Account created! <a href='../signin/signin.html'>Sign In →</a>";
      msg.classList.remove("hidden");
      signupForm.reset();
    }
  });
}

// ========================================================
// INITIALIZATION
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
  renderGrid();
  renderTable();
  processActiveOnly();
  console.log("✅ Velora Dashboard Loaded -", getStats().total, "services");
});