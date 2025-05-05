// ========= script.js =========
// All Firebase SDK scripts are already loaded in the HTML.
// This file handles anonymous auth and streaming quotes from Firestore.

// ---------------- Firebase config ----------------
const firebaseConfig = {
  apiKey: "AIzaSyD-yHwfZxWM1mOJOC6OlMYJiv4qSFEQ3rM",
  authDomain: "quotes-wall-5913f.firebaseapp.com",
  projectId: "quotes-wall-5913f",
  storageBucket: "quotes-wall-5913f.appspot.com", // fixed suffix
  messagingSenderId: "981725743103",
  appId: "1:981725743103:web:012c1f5dfd5fcf81ad89ca",
  measurementId: "G-C8M26ZD2EW"
};

// ---------------- Initialise Firebase ----------------
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// ---------------- Anonymous login ----------------
auth.signInAnonymously()
  .then(() => console.log("✅ Logged in anonymously"))
  .catch(err => console.error("❌ Login failed", err));

// ---------------- Quote rendering helpers ----------------
const container = document.getElementById("scrolling-text");

/**
 * Appends a single quote line.
 * @param {string} text – Quote text to display.
 */
function addQuote(text) {
  const div = document.createElement("div");
  div.className = "quote-line";
  div.textContent = text;
  container.appendChild(div);
}

// Count the static lines shipped in the HTML – we keep them until Firestore gives us data.
let hasReplacedStatic = false;

// ---------------- Live stream from Firestore ----------------
db.collection("quotes")
  .orderBy("createdAt", "desc")
  .onSnapshot(snapshot => {
    if (snapshot.empty) {
      // No dynamic quotes yet – leave the baked‑in ones.
      return;
    }

    // First non‑empty snapshot: wipe static lines once.
    if (!hasReplacedStatic) {
      container.innerHTML = "";
      hasReplacedStatic = true;
    }

    // Render quotes – latest first.
    container.innerHTML = ""; // clear existing dynamic list before re‑rendering
    snapshot.forEach(doc => addQuote(doc.data().text));
  });

// ---------------- (Optional) Auth button handling ----------------
const authBtn = document.getElementById("auth-btn");
if (authBtn) {
  authBtn.textContent = "Anonymous";
  authBtn.disabled = true;
}

// ---------------- Theme toggle removed in HTML ----------------
// The theme‑toggle button has been hidden; no JS needed for it anymore.
