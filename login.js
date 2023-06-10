
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGX_67__mb00VlB4ufIo4tH-Gvh4K__Wk",
  authDomain: "webprogramming-47b16.firebaseapp.com",
  projectId: "webprogramming-47b16",
  storageBucket: "webprogramming-47b16.appspot.com",
  messagingSenderId: "905325745645",
  appId: "1:905325745645:web:8156354b1a2bc4d4d6c3e4",
  measurementId: "G-EL8E3NQ32C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

var email = document.getElementById("email");
var password = document.getElementById("password");
var login_button = document.getElementById("login_button");

login_button.onclick = function() {
    login_button.disabled = true;
    login_button.textContent = "Checking if user exists";
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
        // Signed in 
        // Declare user Variable
        const user = userCredential.user;
        console.log(user.uid);
        var docRef = db.collection("users").doc(user.uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
            console.log("Document data:", doc.data());
            var mani = doc.data().full_name;
            var mani2 = doc.data().last_login;
            mani2 = new firebase.firestore.Timestamp(mani2.seconds, mani2.nanoseconds).toDate();
            console.log(mani); 
            console.log(typeof mani); 
            console.log(mani2); 
            console.log(typeof mani2); 
        } else {
             // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
        // ...
        })
    .catch((error) => {
        console.log(error.code);
        console.log(error.message);
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        login_button.disabled = false;
        login_button.textContent = "LOGIN";
        alert("Invalid credentials. The user doesn't exist. Please verify your email and password or create a new account.");

    });
}

function show() {
    // ========== Checking type of password ===========
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  }