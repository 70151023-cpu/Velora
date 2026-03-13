// ============================================================
// script.js — MyWebsite Project JavaScript
// Lab 03: Variables, DOM, Arrow Functions & Click Events
// ============================================================


// ── STEP 1: Declare JavaScript Variables & Data Types ───────

const projectName   = "MyWebsite";                        // String
const totalPages    = 5;                                   // Number
const isLive        = true;                                // Boolean
const pages         = ["Home", "About", "Contact",        // Array
                        "Sign In", "Sign Up"];
const developer     = {                                    // Object
  name: "Alex Johnson",
  role: "Frontend Developer",
  course: "Web Engineering",
  year: 2
};


// ── STEP 2: Display Variables Using DOM ─────────────────────

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


// ── STEP 3: Arrow Function for Project Summary ──────────────

const showProjectSummary = () => {
  const totalLinks    = pages.length;
  const statusMessage = isLive ? "🟢 Website is LIVE" : "🔴 Website is OFFLINE";
  const summary       = `
    <p><strong>Project:</strong> ${projectName}</p>
    <p><strong>Developer:</strong> ${developer.name} (${developer.role})</p>
    <p><strong>Course:</strong> ${developer.course}</p>
    <p><strong>Status:</strong> ${statusMessage}</p>
    <p><strong>Total Pages:</strong> ${totalLinks}</p>
    <p><strong>Pages List:</strong> ${pages.join(" → ")}</p>
    <p><strong>Calculated:</strong> Average ${(totalPages / 2).toFixed(1)} pages per section</p>
  `;
  return summary;
};


// ── STEP 4 & 5: Click Event — Update DOM Dynamically ────────

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


// ── Active nav link highlighting ─────────────────────────────

document.querySelectorAll("nav a").forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("underline", "font-bold");
  }
});


// ── Contact form handler ─────────────────────────────────────

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = document.getElementById("formMessage");
    if (msg) {
      msg.textContent = "✅ Thank you! Your message has been sent.";
      msg.classList.remove("hidden");
    }
    contactForm.reset();
  });
}


// ── Sign In form validation ──────────────────────────────────

const signinForm = document.getElementById("signinForm");
if (signinForm) {
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signinEmail").value;
    const pass  = document.getElementById("signinPass").value;
    const msg   = document.getElementById("signinMessage");
    if (!email || !pass) {
      msg.textContent = "⚠️ Please fill in all fields.";
      msg.classList.remove("hidden");
    } else {
      msg.textContent = `✅ Welcome back, ${email}!`;
      msg.classList.remove("hidden");
    }
  });
}


// ── Sign Up password match check ─────────────────────────────

const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const pass1 = document.getElementById("signupPass").value;
    const pass2 = document.getElementById("signupPass2").value;
    const msg   = document.getElementById("signupMessage");
    if (pass1 !== pass2) {
      msg.textContent = "⚠️ Passwords do not match.";
      msg.classList.remove("hidden");
    } else {
      msg.textContent = "✅ Account created successfully!";
      msg.classList.remove("hidden");
      signupForm.reset();
    }
  });
}