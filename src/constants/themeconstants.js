// themeConstants.js - Works on ALL Pages Instantly
(function() {
  // Run immediately
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  // Load theme immediately
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    themeToggle.textContent = '☀️';
  }
  
  // Add click listener
  themeToggle.addEventListener('click', function() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
  });
  
  // Listen for storage changes (sync across tabs)
  window.addEventListener('storage', function(e) {
    if (e.key === 'theme') {
      const isDark = e.newValue === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
      themeToggle.textContent = isDark ? '☀️' : '🌙';
    }
  });
})();