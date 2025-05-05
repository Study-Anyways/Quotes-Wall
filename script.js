// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD-yHwfZxWM1mOJOC6OlMYJiv4qSFEQ3rM",
  authDomain: "quotes-wall-5913f.firebaseapp.com",
  projectId: "quotes-wall-5913f",
  storageBucket: "quotes-wall-5913f.firebasestorage.app",
  messagingSenderId: "981725743103",
  appId: "1:981725743103:web:012c1f5dfd5fcf81ad89ca",
  measurementId: "G-C8M26ZD2EW"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Anonymous Login
auth.signInAnonymously()
  .then(() => {
    console.log("✅ Logged in anonymously");
  })
  .catch(error => {
    console.error("❌ Login failed", error);
  });

// Load and display quotes from Firestore
db.collection("quotes").orderBy("createdAt", "desc").onSnapshot(snapshot => {
  const container = document.getElementById("scrolling-text");
  container.innerHTML = ""; // Clear existing

  snapshot.forEach(doc => {
    const div = document.createElement("div");
    div.className = "quote-line";
    div.textContent = doc.data().text;
    container.appendChild(div);
  });
});