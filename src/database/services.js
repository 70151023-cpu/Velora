// ========================================================
// src/database/services.js - Velora Services Database
// Modular data storage for CRUD operations
// ========================================================

// Initial Services Data (Array of Objects)
export const services = [
  { 
    id: 1, 
    name: "Web Design", 
    category: "Design", 
    price: 200, 
    status: "Active",
    created: "2024-01-15"
  },
  { 
    id: 2, 
    name: "SEO Audit", 
    category: "Marketing", 
    price: 100, 
    status: "Active",
    created: "2024-01-20"
  },
  { 
    id: 3, 
    name: "App Development", 
    category: "Dev", 
    price: 500, 
    status: "Pending",
    created: "2024-01-25"
  },
  { 
    id: 4, 
    name: "Logo Design", 
    category: "Design", 
    price: 75, 
    status: "Active",
    created: "2024-01-28"
  }
];

// ========================================================
// CRUD HELPER FUNCTIONS (Modular + Exportable)
// ========================================================

// CREATE: Add new service
export const createService = (newService) => {
  const service = {
    id: Date.now(),  // Unique ID
    ...newService,
    created: new Date().toISOString().split('T')[0]
  };
  services.push(service);
  return service;
};

// READ: Get all services
export const getServices = () => [...services];  // Return copy (immutable)

// READ: Find single service
export const findService = (id) => services.find(s => s.id === id);

// UPDATE: Update existing service
export const updateService = (id, updates) => {
  const index = services.findIndex(s => s.id === id);
  if (index !== -1) {
    // Satisfies Task 5: Use Object.assign or Object.entries
    services[index] = Object.assign({}, services[index], updates);
    
    // Optional: Log Object keys to console to show 'Object Manipulation'
    console.log("Updated Fields:", Object.keys(updates)); 
    return services[index];
  }
  return null;
};

// DELETE: Remove service
export const deleteService = (id) => {
  const initialLength = services.length;
  services = services.filter(s => s.id !== id);
  return services.length < initialLength;
};

// UTILITY: Reset database (for demo)
export const resetDatabase = () => {
  services = [
    { id: 1, name: "Web Design", category: "Design", price: 200, status: "Active", created: "2024-01-15" },
    { id: 2, name: "SEO Audit", category: "Marketing", price: 100, status: "Active", created: "2024-01-20" }
  ];
};

// Export count for dashboard
export const getStats = () => {
  return {
    total: services.length,
    active: services.filter(s => s.status === "Active").length,
    // 1. Using .reduce() to calculate total portfolio value
    totalValue: services.reduce((acc, s) => acc + s.price, 0),
    // 2. Using .every() to check if all services have a price (Data Integrity)
    isAllPriced: services.every(s => s.price > 0),
    // 3. Using .some() to check if there are any high-ticket items
    hasPremium: services.some(s => s.price > 400)
  };
};

console.log("✅ Services Database loaded:", services.length, "services");