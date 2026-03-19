// ============================================================
// script.js — Velora Project JavaScript
// ============================================================

// ── STEP 1: Variables ────────────────────────────────────────

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

// ── STEP 2: Display Variables ────────────────────────────────

const variableDisplay = document.getElementById("variableDisplay");
if (variableDisplay) {
  variableDisplay.innerHTML = `
    <p><strong>Project Name:</strong> ${projectName}</p>
    <p><strong>Total Pages:</strong> ${totalPages}</p>
    <p><strong>Is Live:</strong> ${isLive}</p>
    <p><strong>Pages:</strong> ${pages.join(", ")}</p>
    <p><strong>Developer:</strong> ${developer.name} — ${developer.role}</p>
    <p><strong>Course:</strong> ${developer.course}, Year ${developer.year}</p>
  `;
}

// ── STEP 3: Arrow Function ───────────────────────────────────

const showProjectSummary = () => {
  const statusMessage = isLive ? "🟢 Website is LIVE" : "🔴 Website is OFFLINE";
  return `
    <p><strong>Project:</strong> ${projectName}</p>
    <p><strong>Developer:</strong> ${developer.name} (${developer.role})</p>
    <p><strong>Course:</strong> ${developer.course}</p>
    <p><strong>Status:</strong> ${statusMessage}</p>
    <p><strong>Total Pages:</strong> ${totalPages}</p>
    <p><strong>Pages List:</strong> ${pages.join(" → ")}</p>
    <p><strong>Calculated:</strong> Average ${(totalPages / 2).toFixed(1)} pages per section</p>
  `;
};

// ── STEP 4 & 5: Button Click ─────────────────────────────────

const summaryBtn = document.getElementById("summaryBtn");
if (summaryBtn) {
  summaryBtn.addEventListener("click", () => {
    const result = document.getElementById("summaryResult");
    if (result) {
      result.innerHTML = showProjectSummary();
      result.style.display = "block";
    }
  });
}

// ── Active nav link ──────────────────────────────────────────

document.querySelectorAll("nav a").forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("underline", "font-bold");
  }
});

// ── Contact form ─────────────────────────────────────────────

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = document.getElementById("formMessage");
    if (msg) {
      msg.textContent = "Thank you! Your message has been sent.";
      msg.classList.remove("hidden");
    }
    contactForm.reset();
  });
}

// ── Sign In ──────────────────────────────────────────────────

const signinForm = document.getElementById("signinForm");
if (signinForm) {
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email       = document.getElementById("signinEmail").value.trim();
    const pass        = document.getElementById("signinPass").value.trim();
    const msg         = document.getElementById("signinMessage");
    const formSection = document.getElementById("formSection");
    const successSection = document.getElementById("successSection");
    const successEmail   = document.getElementById("successEmail");


    msg.classList.add("hidden");
    msg.textContent = "";

    if (!email || !pass) {
      msg.textContent = "Please fill in all fields.";
      msg.classList.remove("hidden");
      return;
    }
  });
}

// ── Sign Up password match ───────────────────────────────────

const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const pass1 = document.getElementById("signupPass").value;
    const pass2 = document.getElementById("signupPass2").value;
    const msg   = document.getElementById("signupMessage");
    if (pass1 !== pass2) {
      msg.textContent = "Passwords do not match.";
      msg.classList.remove("hidden");
    } else {
      msg.textContent = "Account created successfully!";
      msg.classList.remove("hidden");
      signupForm.reset();
    }
  });
}