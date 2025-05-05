// Firebase 配置（你的 quotes-wall 项目）
const firebaseConfig = {
  apiKey: "AIzaSyD-yHwfZxWM1mOJOC6OlMYJiv4qSFEQ3rM",
  authDomain: "quotes-wall-5913f.firebaseapp.com",
  projectId: "quotes-wall-5913f",
  storageBucket: "quotes-wall-5913f.firebasestorage.app",
  messagingSenderId: "981725743103",
  appId: "1:981725743103:web:012c1f5dfd5fcf81ad89ca",
  measurementId: "G-C8M26ZD2EW"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// 匿名登录


const auth = firebase.auth();

auth.signInAnonymously()
  .then(() => {
    console.log("✅ 匿名登录成功");
  })
  .catch(error => {
    console.error("❌ 匿名登录失败:", error);
  });


// 🔽 可添加：实时监听 quotes 数据并插入页面
db.collection("quotes").onSnapshot(snapshot => {
  const container = document.getElementById("scrolling-text");
  container.innerHTML = ""; // 清空旧内容
  snapshot.forEach(doc => {
    const div = document.createElement("div");
    div.className = "quote-line";
    div.textContent = doc.data().text;
    container.appendChild(div);
  });
});

// 🔽 可添加：提交 quote 的逻辑（你可以把这段连接按钮点击事件）
function submitQuote(text) {
  db.collection("quotes").add({
    text: text,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    console.log("Quote added!");
  }).catch(error => {
    console.error("Error adding quote:", error);
  });
}